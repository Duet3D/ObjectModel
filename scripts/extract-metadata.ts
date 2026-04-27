/**
 * Walk the ObjectModel class graph from its root (`ObjectModel`), follow ModelObject-class properties (and the
 * element types of arrays / ModelCollection / ModelDictionary / Map wrappers), and emit two JSON sidecars
 * into dist/:
 *   - deprecations.json: full dotted paths (with `[]` placeholders for collection items) -> deprecation message
 *   - enums.json:        full dotted paths -> list of enum / string-literal-union values
 *
 * Example output:
 *   deprecations.json: "move.extruders[].pressureAdvance": "use pressAdv instead"
 *   enums.json:        "state.status": ["disconnected", "starting", ...]
 *
 * MonacoTokens loads these at runtime to mark deprecated paths and to offer the known valid values when the
 * user types `<path> == ` or `<path> != ` in an expression.
 */
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

type Deprecations = Record<string, string>;
type EnumValues = Record<string, string[]>;

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
 * If `type` is an enum or a union of string/numeric literals, return the list of literal values (as strings).
 * Returns null otherwise.
 */
function enumValuesOf(type: ts.Type, checker: ts.TypeChecker): string[] | null
{
	const naked = unwrapNullable(type);

	// Real `enum` declarations: collect their members' initializer values
	if (naked.flags & ts.TypeFlags.EnumLike)
	{
		const sym = naked.symbol || naked.aliasSymbol;
		if (sym)
		{
			const decl = (sym.declarations || []).find(ts.isEnumDeclaration);
			if (decl)
			{
				const values: string[] = [];
				for (const member of decl.members)
				{
					const v = checker.getConstantValue(member);
					// Empty string is a sentinel in several enums (e.g. `AxisLetter.none = ''`) - dropping it
					// keeps the value list purely to real choices the user would want to compare against.
					if ((typeof v === "string" || typeof v === "number") && String(v).length > 0)
					{
						values.push(String(v));
					}
				}
				return values.length > 0 ? values : null;
			}
		}
	}

	// Union of string/numeric literals (either a named `type Foo = "a" | "b"` or inline on a property)
	if (naked.isUnion())
	{
		const values: string[] = [];
		for (const member of naked.types)
		{
			if (member.isStringLiteral() || member.isNumberLiteral())
			{
				const v = String(member.value);
				if (v.length > 0)
				{
					values.push(v);
				}
			}
			else
			{
				return null;
			}
		}
		return values.length > 0 ? values : null;
	}

	return null;
}

/**
 * Walk the class graph rooted at the given class symbol, recording deprecated paths and enum value lists.
 */
function walkClass(
	classSymbol: ts.Symbol,
	prefix: string,
	deprecations: Deprecations,
	enumValues: EnumValues,
	visited: Set<ts.Symbol>,
	checker: ts.TypeChecker
): void
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
			const baseType = checker.getTypeAtLocation(typeNode.expression);
			const baseSymbol = baseType.symbol;
			if (baseSymbol)
			{
				walkClass(baseSymbol, prefix, deprecations, enumValues, visited, checker);
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
			deprecations[fullPath] = deprecation;
		}

		const memberType = checker.getTypeOfSymbolAtLocation(checker.getSymbolAtLocation(member.name)!, member);
		const naked = unwrapNullable(memberType);

		// Record enum / literal-union values for this field
		const values = enumValuesOf(memberType, checker);
		if (values !== null)
		{
			enumValues[fullPath] = values;
		}

		// Recurse into navigable types so nested deprecations/enum values are captured too. Container types
		// (ModelCollection<T>, Map<K, V>, Array<T>, ...) must be detected before the bare class lookup so we
		// follow the element type rather than walking into the collection wrapper's own implementation fields.
		const elem = elementType(naked, checker);
		if (elem)
		{
			const elemClass = classSymbolOf(unwrapNullable(elem));
			if (elemClass)
			{
				walkClass(elemClass, `${fullPath}[]`, deprecations, enumValues, new Set(visited), checker);
			}
			continue;
		}
		const child = classSymbolOf(naked);
		if (child)
		{
			walkClass(child, fullPath, deprecations, enumValues, new Set(visited), checker);
		}
	}
}

function extractAll(srcDir: string): { deprecations: Deprecations, enumValues: EnumValues }
{
	const files = findTsFiles(srcDir);
	const program = ts.createProgram(files, {
		target: ts.ScriptTarget.ES2015,
		module: ts.ModuleKind.CommonJS,
		strict: true,
		esModuleInterop: true
	});
	const checker = program.getTypeChecker();
	const deprecations: Deprecations = {};
	const enumValues: EnumValues = {};

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

	walkClass(rootSymbol, "", deprecations, enumValues, new Set(), checker);
	return { deprecations, enumValues };
}

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
	const { deprecations, enumValues } = extractAll(srcDir);
	const deprecationsPath = path.join(distDir, "deprecations.json");
	const enumValuesPath = path.join(distDir, "enums.json");
	writeSorted(deprecationsPath, deprecations);
	writeSorted(enumValuesPath, enumValues);
	console.log(`extract-metadata: wrote ${Object.keys(deprecations).length} deprecations to ${path.relative(repoRoot, deprecationsPath)}`);
	console.log(`extract-metadata: wrote ${Object.keys(enumValues).length} enum paths to ${path.relative(repoRoot, enumValuesPath)}`);
}

main();
