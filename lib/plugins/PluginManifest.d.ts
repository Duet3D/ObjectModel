import ModelObject from "../ModelObject";
export declare enum SbcPermission {
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
    #private;
    get id(): string;
    set id(value: string);
    get name(): string;
    set name(value: string);
    author: string;
    version: string;
    license: string;
    homepage: string | null;
    dwcVersion: string | null;
    dwcDependencies: Array<string>;
    sbcRequired: boolean;
    sbcDsfVersion: string | null;
    sbcExecutable: string | null;
    sbcExecutableArguments: string | null;
    sbcExtraExecutables: Array<string>;
    sbcOutputRedirected: boolean;
    sbcPermissions: Set<SbcPermission>;
    sbcPackageDependencies: Array<string>;
    sbcPluginDependencies: Array<string>;
    rrfVersion: string | null;
    data: Map<string, any>;
    static checkVersion(actual: string, required: string): boolean;
}
