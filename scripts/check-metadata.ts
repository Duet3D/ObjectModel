/**
 * Verify that the metadata sidecars in dist/ are complete enough to publish.
 *
 * extract-metadata only warns when DuetAPI.xml cannot be found and still writes documentation.json with
 * the enum values it gets from the TS library, so a package built without it looks fine until someone
 * notices that every tooltip is gone. Four releases shipped that way before it was spotted, hence this
 * runs as part of prepublishOnly
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");

function fail(message: string): never {
	console.error(`check-metadata: ${message}`);
	process.exit(1);
}

const documentationFile = path.join(distDir, "documentation.json");
if (!fs.existsSync(documentationFile)) {
	fail(`${path.relative(process.cwd(), documentationFile)} is missing, run npm run build first`);
}

const documentation: Record<string, any> = JSON.parse(fs.readFileSync(documentationFile, "utf8"));
const documented = Object.values(documentation).filter(entry => (typeof entry === "string") || (entry !== null && typeof entry.summary === "string"));
if (documented.length === 0) {
	fail("documentation.json has no descriptions at all, which means DuetAPI.xml was not found during the build. Set DUETAPI_XML to its location");
}

console.log(`check-metadata: ${documented.length} of ${Object.keys(documentation).length} paths carry a description`);
