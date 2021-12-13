import ModelObject from "../ModelObject";

export enum SbcPermission {
    none = "none",
    commandExecution = "commandExecution",
    codeInterceptionRead = "codeInterceptionRead",
    codeInterceptionReadWrite = "codeInterceptionReadWrite",
    managePlugins = "managePlugins",
    servicePlugins = "servicePlugins",
    manageUserSessions = "manageUserSessions",
    objectModelRead = "objectModelRead",
    objectModelReadWrite = "objectModelReadWrite",
    registerHttpEndpoints = "registerHttpEndpoints",
    readFilaments = "readFilaments",
    writeFilaments = "writeFilaments",
    readFirmware = "readFirmware",
    writeFirmware = "writeFilaments",
    readGCodes = "readGCodes",
    writeGCodes = "writeGCodes",
    readMacros = "readMacros",
    writeMacros = "writeMacros",
    readMenu = "readMenu",
    writeMenu = "writeMenu",
    readSystem = "readSystem",
    writeSystem = "writeSystem",
    readWeb = "readWeb",
    writeWeb = "writeWeb",
    fileSystemAccess = "fileSystemAccess",
    launchProcesses = "launchProcesses",
    networkAccess = "networkAccess",
    webcamAccess = "webcamAccess",
    superUser = "superUser"
}

export default class PluginManifest extends ModelObject {
    #id: string = "";
    get id() { return this.#id; }
    set id(value) {
        if (!value || value.length > 32) {
            throw new Error("Invalid plugin identifier");
        }
        for (const c in value.split("")) {
            if (!/\w/.test(c)) {
                throw new Error("Illegal plugin identifier");
            }
        }
        this.#id = value;
    }
    #name: string = "";
    get name() { return this.#name; }
    set name(value) {
        if (!value || value.length > 64) {
            throw new Error("Invalid plugin name");
        }
        for (const c in value.split("")) {
            if (!/[\w -_]/.test(c)) {
                throw new Error("Illegal plugin name");
            }
        }
        this.#name = value;
    }
    author: string = "";
    version: string = "1.0.0";
    license: string = "LGPL-3.0-or-later"
    homepage: string | null = null;
    dwcVersion: string | null = null;
    dwcDependencies: Array<string> = [];
    sbcRequired: boolean = false;
    sbcDsfVersion: string | null = null;
    sbcExecutable: string | null = null;
    sbcExecutableArguments: string | null = null;
    sbcExtraExecutables: Array<string> = [];
    sbcOutputRedirected: boolean = true;
    sbcPermissions: Set<SbcPermission> = new Set<SbcPermission>();
    sbcPackageDependencies: Array<string> = [];
    sbcPluginDependencies: Array<string> = [];
    rrfVersion: string | null = null;
    data: Map<string, any> = new Map<string, any>();

    static checkVersion(actual: string, required: string): boolean {
        if (required) {
            const actualItems = actual.split(/[.\-+]/);
            const requiredItems = required.split(/[.\-+]/);
            for (let i = 0; i < Math.min(actualItems.length, requiredItems.length); i++) {
                if (actualItems[i] !== requiredItems[i]) {
                    return false;
                }
            }
        }
        return true;
    }
}