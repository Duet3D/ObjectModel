/**
 * Walk the ObjectModel class graph from its root (`ObjectModel`), follow ModelObject-class properties (and the
 * element types of arrays / ModelCollection / ModelDictionary / Map wrappers), and emit three JSON sidecars
 * into dist/:
 *   - deprecations.json:  full dotted paths (with `[]` placeholders for collection items) -> deprecation message
 *   - enums.json:         full dotted paths -> list of enum / string-literal-union values
 *   - documentation.json: full dotted paths -> documentation pulled from DuetAPI.xml. Summary-only paths collapse
 *                         to a bare summary string; paths that also carry remarks and/or enum values become a
 *                         { summary, remarks, values } object
 *
 * Example output:
 *   deprecations.json:  "move.extruders[].pressureAdvance": "use pressAdv instead"
 *   enums.json:         "state.status": ["disconnected", "starting", ...]
 *   documentation.json: "move.axes[].homed": "Whether or not the axis is homed"
 *                       "state.status": { "summary": "...", "values": { "starting": "Processing config.g" } }
 *
 * The documentation join is deterministic: because the walk knows the TS class that declares each property, it
 * builds the C# member name (`P:DuetAPI.ObjectModel.<Type>.<Property>`) directly and matches it case-insensitively
 * against the DuetAPI.xml `<member>` entries - no path-to-member heuristics. Enum *values* always come from the TS
 * library (the only source of the real serialised strings); the XML only supplies the human-readable descriptions,
 * joined to the enum members by name. If DuetAPI.xml cannot be found, a warning is printed and documentation.json
 * is still written with enum values but no descriptions.
 *
 * MonacoTokens loads these at runtime to mark deprecated paths, offer the known valid values when the user types
 * `<path> == ` or `<path> != ` in an expression, and show documentation tooltips.
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Deprecations = Record<string, string>;
type EnumValues = Record<string, string[]>;

interface DocEntry
{
	summary?: string;
	remarks?: string;
	/** Serialised enum/literal value -> description (null when the value has no documented description). */
	values?: Record<string, string | null>;
}

type Documentation = Record<string, string | DocEntry>;

/** Parsed documentation for a single DuetAPI.xml `<member>` entry. */
interface XmlMember
{
	summary: string | null;
	remarks: string | null;
	inheritCref: string | null;
}

/** Member name (enum identifier) paired with its serialised value (they're identical for literal unions). */
interface EnumPair
{
	name: string;
	value: string;
}

/** Enum / literal-union details for a field: the backing enum type name (null for inline unions) and its members. */
interface EnumDetails
{
	typeName: string | null;
	pairs: EnumPair[];
}

interface WalkContext
{
	checker: ts.TypeChecker;
	deprecations: Deprecations;
	enumValues: EnumValues;
	documentation: Documentation;
	xmlMembers: Map<string, XmlMember>;
}

/**
 * Path prefixes that should be excluded from the generated sidecars entirely. They don't correspond to
 * persistent object-model fields exposed to RRF expressions - typically virtual/internal surfaces DWC/DSF
 * synthesises on top of the wire model.
 */
const SKIP_PATH_PREFIXES: string[] = [
	"messages"
];

function isSkipped(path: string): boolean
{
	for (const prefix of SKIP_PATH_PREFIXES)
	{
		if (path === prefix || path.startsWith(prefix + ".") || path.startsWith(prefix + "["))
		{
			return true;
		}
	}
	return false;
}

function findTsFiles(dir: string, out: string[] = []): string[]
{
	for (const entry of fs.readdirSync(dir, { withFileTypes: true }))
	{
		const full = path.join(dir, entry.name);
		if (entry.isDirectory())
		{
			if (entry.name !== "__tests__")
			{
				findTsFiles(full, out);
			}
		}
		else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts"))
		{
			out.push(full);
		}
	}
	return out;
}

// #region DuetAPI.xml parsing

/**
 * Parse DuetAPI.xml into a map keyed by the lowercased `name` attribute of each `<member>` (generic backtick
 * suffixes like `` `1 `` stripped, mirroring how the property keys are built). The C# doc compiler emits one flat
 * `<member>` per documented symbol, so a regex pass over the well-formed generated file is enough - no XML DOM
 * dependency required. Returns an empty map when the file is absent; the caller warns in that case.
 */
function loadXmlMembers(xmlPath: string): Map<string, XmlMember>
{
	const members = new Map<string, XmlMember>();
	if (!fs.existsSync(xmlPath))
	{
		return members;
	}
	const xml = fs.readFileSync(xmlPath, "utf8");
	const memberRegex = /<member name="([^"]+)">([\s\S]*?)<\/member>/g;
	let match: RegExpExecArray | null;
	while ((match = memberRegex.exec(xml)) !== null)
	{
		const key = match[1].toLowerCase().replace(/`\d+/g, "");
		const body = match[2];
		const inherit = body.match(/<inheritdoc\s+cref="([^"]+)"\s*\/>/);
		members.set(key, {
			summary: extractXmlTag(body, "summary"),
			remarks: extractXmlTag(body, "remarks"),
			inheritCref: inherit ? inherit[1] : null
		});
	}
	return members;
}

function extractXmlTag(body: string, tag: string): string | null
{
	const match = body.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
	return match ? cleanDocText(match[1]) : null;
}

/**
 * Normalise a raw XML doc fragment into single-line plain text: flatten `<see cref="...">` references to the bare
 * member path, drop any other inline tags, decode XML entities, and collapse whitespace runs (including the doc
 * compiler's hard newlines) into single spaces.
 */
function cleanDocText(raw: string): string
{
	const flattened = raw
		.replace(/<see\s+cref="(?:[A-Za-z]:)?(?:DuetAPI\.ObjectModel\.)?([^"]+)"\s*\/>/g, "$1")
		.replace(/<[^>]+>/g, " ");
	return decodeEntities(flattened).replace(/\s+/g, " ").trim();
}

function decodeEntities(s: string): string
{
	return s
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, "\"")
		.replace(/&apos;/g, "'")
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, "&");
}

/**
 * Resolve the documentation for a member key, following a single `<inheritdoc cref="..."/>` chain when the member
 * carries no own summary/remarks. Bare `<inheritdoc/>` without a cref can't be resolved (the XML doesn't encode the
 * base hierarchy), so those fall through to null.
 */
function resolveMember(members: Map<string, XmlMember>, key: string): XmlMember | null
{
	const visited = new Set<string>();
	let current = members.get(key);
	while (current)
	{
		if (current.summary !== null || current.remarks !== null)
		{
			return current;
		}
		if (current.inheritCref === null)
		{
			return null;
		}
		const next = current.inheritCref.toLowerCase().replace(/`\d+/g, "");
		if (visited.has(next))
		{
			return null;
		}
		visited.add(next);
		current = members.get(next);
	}
	return null;
}

/**
 * Look up the documentation for an object-model property. `typeCandidates` lists the type names to try in order:
 * the concrete (leaf) type the path navigates to first, then the declaring type - this covers the cases where TS
 * uses a `...Base` class that the C# model folds into the concrete type (e.g. FilamentMonitorBase -> FilamentMonitor).
 */
function lookupMemberDoc(members: Map<string, XmlMember>, typeCandidates: string[], property: string): XmlMember | null
{
	const seen = new Set<string>();
	for (const type of typeCandidates)
	{
		if (!type || seen.has(type))
		{
			continue;
		}
		seen.add(type);
		const doc = resolveMember(members, `p:duetapi.objectmodel.${type.toLowerCase()}.${property.toLowerCase()}`);
		if (doc !== null)
		{
			return doc;
		}
	}
	return null;
}

/**
 * Build the value -> description map for an enum/literal-union field. The serialised values come from the TS
 * library; for real enums each value's description is joined to its DuetAPI.xml `F:` member by enum member name.
 * Values without a documented description map to null so the map still lists every valid value.
 */
function buildValueDocs(members: Map<string, XmlMember>, details: EnumDetails): Record<string, string | null>
{
	const out: Record<string, string | null> = {};
	for (const pair of details.pairs)
	{
		let description: string | null = null;
		if (details.typeName !== null)
		{
			const doc = resolveMember(members, `f:duetapi.objectmodel.${details.typeName.toLowerCase()}.${pair.name.toLowerCase()}`);
			if (doc && doc.summary)
			{
				description = doc.summary;
			}
		}
		// AxisLetter members aren't documented individually in the XML; a generated label beats a null
		if (description === null && details.typeName === "AxisLetter")
		{
			description = `${pair.value} axis`;
		}
		out[pair.value] = description;
	}
	return out;
}

// #endregion

// #region ObjectModel class-graph walk

/** Read the @deprecated JSDoc tag (if any) from a property/accessor declaration. */
function readDeprecation(node: ts.PropertyDeclaration | ts.GetAccessorDeclaration): string | null
{
	const jsDoc: any[] = (node as any).jsDoc || [];
	for (const doc of jsDoc)
	{
		for (const tag of doc.tags || [])
		{
			if (tag.tagName && tag.tagName.text === "deprecated")
			{
				const raw = tag.comment;
				if (typeof raw === "string")
				{
					return raw.trim();
				}
				if (Array.isArray(raw))
				{
					return raw.map((c: any) => (c && typeof c.text === "string" ? c.text : "")).join("").trim();
				}
				return "";
			}
		}
	}
	return null;
}

/** Resolve a TS Type to either a class symbol that we should descend into, or null if it isn't navigable. */
function classSymbolOf(type: ts.Type): ts.Symbol | null
{
	if (!type.symbol)
	{
		return null;
	}
	const decls = type.symbol.declarations || [];
	for (const decl of decls)
	{
		if (ts.isClassDeclaration(decl))
		{
			return type.symbol;
		}
	}
	return null;
}

/** If `type` is a ModelCollection<T>, ModelDictionary<T>, Array<T>, Map<K, V>, or `T | null`, return T (or V). */
function elementType(type: ts.Type, checker: ts.TypeChecker): ts.Type | null
{
	// Strip nullability
	if (type.isUnion())
	{
		const nonNullable = type.types.filter(t => (t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) === 0);
		if (nonNullable.length === 1)
		{
			type = nonNullable[0];
		}
		else if (nonNullable.length > 1)
		{
			return null;
		}
	}
	const sym = type.symbol || type.aliasSymbol;
	const name = sym ? sym.name : "";
	const typeArgs = (type as ts.TypeReference).typeArguments || [];
	if (name === "ModelCollection" || name === "Array" || name === "ReadonlyArray" || name === "ModelSet" || name === "ReadonlySet" || name === "Set")
	{
		return typeArgs[0] || null;
	}
	if (name === "ModelDictionary" || name === "Map" || name === "ReadonlyMap")
	{
		return typeArgs[name === "ModelDictionary" ? 0 : 1] || null;
	}
	void checker;
	return null;
}

function unwrapNullable(type: ts.Type): ts.Type
{
	if (!type.isUnion())
	{
		return type;
	}
	const nonNullable = type.types.filter(t => (t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) === 0);
	return nonNullable.length === 1 ? nonNullable[0] : type;
}

/**
 * If `type` is an enum or a union of string/numeric literals, return its member name/value pairs along with the
 * backing enum type name (null for an inline literal union). Returns null otherwise.
 */
function enumDetailsOf(type: ts.Type, checker: ts.TypeChecker): EnumDetails | null
{
	const naked = unwrapNullable(type);

	// Real `enum` declarations: collect their members' names and initializer values
	if (naked.flags & ts.TypeFlags.EnumLike)
	{
		const sym = naked.symbol || naked.aliasSymbol;
		if (sym)
		{
			const decl = (sym.declarations || []).find(ts.isEnumDeclaration);
			if (decl)
			{
				const pairs: EnumPair[] = [];
				for (const member of decl.members)
				{
					const value = checker.getConstantValue(member);
					// Empty string is a sentinel in several enums (e.g. `AxisLetter.none = ''`) - dropping it
					// keeps the value list purely to real choices the user would want to compare against.
					if ((typeof value === "string" || typeof value === "number") && String(value).length > 0)
					{
						const name = (ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)) ? member.name.text : member.name.getText();
						pairs.push({ name, value: String(value) });
					}
				}
				return pairs.length > 0 ? { typeName: sym.name, pairs } : null;
			}
		}
	}

	// Union of string/numeric literals (either a named `type Foo = "a" | "b"` or inline on a property)
	if (naked.isUnion())
	{
		const pairs: EnumPair[] = [];
		for (const member of naked.types)
		{
			if (member.isStringLiteral() || member.isNumberLiteral())
			{
				const value = String(member.value);
				if (value.length > 0)
				{
					pairs.push({ name: value, value });
				}
			}
			else
			{
				return null;
			}
		}
		return pairs.length > 0 ? { typeName: null, pairs } : null;
	}

	return null;
}

function recordDocumentation(ctx: WalkContext, fullPath: string, doc: XmlMember | null, values: Record<string, string | null> | null): void
{
	const summary = doc && doc.summary ? doc.summary : null;
	const remarks = doc && doc.remarks ? doc.remarks : null;
	const hasValues = values !== null && Object.keys(values).length > 0;

	// Collapse the common summary-only case to a bare string; only fall back to the full object when there's
	// more than a summary to carry
	if (summary !== null && remarks === null && !hasValues)
	{
		ctx.documentation[fullPath] = summary;
		return;
	}

	const entry: DocEntry = {};
	if (summary !== null)
	{
		entry.summary = summary;
	}
	if (remarks !== null)
	{
		entry.remarks = remarks;
	}
	if (hasValues)
	{
		entry.values = values!;
	}
	if (entry.summary !== undefined || entry.remarks !== undefined || entry.values !== undefined)
	{
		ctx.documentation[fullPath] = entry;
	}
}

/**
 * Walk the class graph rooted at the given class symbol, recording deprecated paths, enum value lists and
 * documentation. `containerType` is the concrete type the current path navigates to; it's preserved across
 * `extends` recursion so inherited members can still resolve their docs against the leaf type.
 */
function walkClass(classSymbol: ts.Symbol, prefix: string, containerType: string, visited: Set<ts.Symbol>, ctx: WalkContext): void
{
	if (visited.has(classSymbol))
	{
		return;
	}
	visited.add(classSymbol);
	const decl = (classSymbol.declarations || []).find(ts.isClassDeclaration);
	if (!decl)
	{
		return;
	}
	// Follow `extends` so inherited fields (e.g. FilamentMonitor extending FilamentMonitorBase) are also walked
	for (const heritage of decl.heritageClauses || [])
	{
		if (heritage.token !== ts.SyntaxKind.ExtendsKeyword)
		{
			continue;
		}
		for (const typeNode of heritage.types)
		{
			const baseType = ctx.checker.getTypeAtLocation(typeNode.expression);
			const baseSymbol = baseType.symbol;
			if (baseSymbol)
			{
				walkClass(baseSymbol, prefix, containerType, visited, ctx);
			}
		}
	}
	for (const member of decl.members)
	{
		if (!ts.isPropertyDeclaration(member) && !ts.isGetAccessorDeclaration(member))
		{
			continue;
		}
		if (!member.name || !ts.isIdentifier(member.name))
		{
			continue;
		}
		const fieldName = member.name.text;
		const fullPath = prefix ? `${prefix}.${fieldName}` : fieldName;

		if (isSkipped(fullPath))
		{
			// Skip recording AND recursing into excluded subtrees
			continue;
		}

		const deprecation = readDeprecation(member);
		if (deprecation !== null)
		{
			ctx.deprecations[fullPath] = deprecation;
		}

		const memberType = ctx.checker.getTypeOfSymbolAtLocation(ctx.checker.getSymbolAtLocation(member.name)!, member);
		const naked = unwrapNullable(memberType);

		// Record enum / literal-union values for this field
		const details = enumDetailsOf(memberType, ctx.checker);
		if (details !== null)
		{
			ctx.enumValues[fullPath] = details.pairs.map(pair => pair.value);
		}

		// Record documentation: resolve the C# member deterministically from the declaring/leaf type names, and
		// attach the per-value descriptions for enum fields
		const doc = lookupMemberDoc(ctx.xmlMembers, [containerType, classSymbol.name], fieldName);
		const values = details !== null ? buildValueDocs(ctx.xmlMembers, details) : null;
		recordDocumentation(ctx, fullPath, doc, values);

		// Recurse into navigable types so nested deprecations/enum values are captured too. Container types
		// (ModelCollection<T>, Map<K, V>, Array<T>, ...) must be detected before the bare class lookup so we
		// follow the element type rather than walking into the collection wrapper's own implementation fields.
		const elem = elementType(naked, ctx.checker);
		if (elem)
		{
			const elemClass = classSymbolOf(unwrapNullable(elem));
			if (elemClass)
			{
				walkClass(elemClass, `${fullPath}[]`, elemClass.name, new Set(visited), ctx);
			}
			continue;
		}
		const child = classSymbolOf(naked);
		if (child)
		{
			walkClass(child, fullPath, child.name, new Set(visited), ctx);
		}
	}
}

function extractAll(srcDir: string, xmlMembers: Map<string, XmlMember>): { deprecations: Deprecations, enumValues: EnumValues, documentation: Documentation }
{
	const files = findTsFiles(srcDir);
	const program = ts.createProgram(files, {
		target: ts.ScriptTarget.ES2015,
		module: ts.ModuleKind.CommonJS,
		strict: true,
		esModuleInterop: true
	});
	const checker = program.getTypeChecker();
	const ctx: WalkContext = { checker, deprecations: {}, enumValues: {}, documentation: {}, xmlMembers };

	let rootSymbol: ts.Symbol | null = null;
	for (const sourceFile of program.getSourceFiles())
	{
		if (sourceFile.isDeclarationFile || !sourceFile.fileName.startsWith(srcDir))
		{
			continue;
		}
		ts.forEachChild(sourceFile, function visit(node)
		{
			if (rootSymbol)
			{
				return;
			}
			if (ts.isClassDeclaration(node) && node.name && node.name.text === "ObjectModel")
			{
				const sym = checker.getSymbolAtLocation(node.name);
				if (sym)
				{
					rootSymbol = sym;
				}
			}
			ts.forEachChild(node, visit);
		});
	}
	if (!rootSymbol)
	{
		throw new Error("Could not locate ObjectModel root class");
	}

	walkClass(rootSymbol, "", (rootSymbol as ts.Symbol).name, new Set(), ctx);
	return { deprecations: ctx.deprecations, enumValues: ctx.enumValues, documentation: ctx.documentation };
}

// #endregion

function writeSorted(outPath: string, data: Record<string, unknown>): void
{
	const sorted: Record<string, unknown> = {};
	for (const key of Object.keys(data).sort())
	{
		sorted[key] = data[key];
	}
	fs.writeFileSync(outPath, JSON.stringify(sorted, null, "\t") + "\n");
}

function main(): void
{
	const repoRoot = path.resolve(__dirname, "..");
	const srcDir = path.join(repoRoot, "src");
	const distDir = path.join(repoRoot, "dist");
	if (!fs.existsSync(distDir))
	{
		fs.mkdirSync(distDir, { recursive: true });
	}

	const xmlPath = process.env.DUETAPI_XML || path.resolve(repoRoot, "..", "DuetSoftwareFramework", "src", "DuetAPI", "DuetAPI.xml");
	const xmlExists = fs.existsSync(xmlPath);
	const xmlMembers = loadXmlMembers(xmlPath);
	if (!xmlExists)
	{
		console.warn(`extract-metadata: WARNING - ${path.relative(repoRoot, xmlPath)} not found; documentation.json will contain enum values only (no descriptions). Set DUETAPI_XML to override the path.`);
	}

	const { deprecations, enumValues, documentation } = extractAll(srcDir, xmlMembers);
	const deprecationsPath = path.join(distDir, "deprecations.json");
	const enumValuesPath = path.join(distDir, "enums.json");
	const documentationPath = path.join(distDir, "documentation.json");
	writeSorted(deprecationsPath, deprecations);
	writeSorted(enumValuesPath, enumValues);
	writeSorted(documentationPath, documentation);
	console.log(`extract-metadata: wrote ${Object.keys(deprecations).length} deprecations to ${path.relative(repoRoot, deprecationsPath)}`);
	console.log(`extract-metadata: wrote ${Object.keys(enumValues).length} enum paths to ${path.relative(repoRoot, enumValuesPath)}`);
	console.log(`extract-metadata: wrote ${Object.keys(documentation).length} documented paths to ${path.relative(repoRoot, documentationPath)}`);
}

main();
