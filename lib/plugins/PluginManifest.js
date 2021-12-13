"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PluginManifest_id, _PluginManifest_name;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SbcPermission = void 0;
const ModelObject_1 = require("../ModelObject");
var SbcPermission;
(function (SbcPermission) {
    SbcPermission["none"] = "none";
    SbcPermission["commandExecution"] = "commandExecution";
    SbcPermission["codeInterceptionRead"] = "codeInterceptionRead";
    SbcPermission["codeInterceptionReadWrite"] = "codeInterceptionReadWrite";
    SbcPermission["managePlugins"] = "managePlugins";
    SbcPermission["servicePlugins"] = "servicePlugins";
    SbcPermission["manageUserSessions"] = "manageUserSessions";
    SbcPermission["objectModelRead"] = "objectModelRead";
    SbcPermission["objectModelReadWrite"] = "objectModelReadWrite";
    SbcPermission["registerHttpEndpoints"] = "registerHttpEndpoints";
    SbcPermission["readFilaments"] = "readFilaments";
    SbcPermission["writeFilaments"] = "writeFilaments";
    SbcPermission["readFirmware"] = "readFirmware";
    SbcPermission["writeFirmware"] = "writeFilaments";
    SbcPermission["readGCodes"] = "readGCodes";
    SbcPermission["writeGCodes"] = "writeGCodes";
    SbcPermission["readMacros"] = "readMacros";
    SbcPermission["writeMacros"] = "writeMacros";
    SbcPermission["readMenu"] = "readMenu";
    SbcPermission["writeMenu"] = "writeMenu";
    SbcPermission["readSystem"] = "readSystem";
    SbcPermission["writeSystem"] = "writeSystem";
    SbcPermission["readWeb"] = "readWeb";
    SbcPermission["writeWeb"] = "writeWeb";
    SbcPermission["fileSystemAccess"] = "fileSystemAccess";
    SbcPermission["launchProcesses"] = "launchProcesses";
    SbcPermission["networkAccess"] = "networkAccess";
    SbcPermission["webcamAccess"] = "webcamAccess";
    SbcPermission["superUser"] = "superUser";
})(SbcPermission = exports.SbcPermission || (exports.SbcPermission = {}));
class PluginManifest extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        _PluginManifest_id.set(this, "");
        _PluginManifest_name.set(this, "");
        this.author = "";
        this.version = "1.0.0";
        this.license = "LGPL-3.0-or-later";
        this.homepage = null;
        this.dwcVersion = null;
        this.dwcDependencies = [];
        this.sbcRequired = false;
        this.sbcDsfVersion = null;
        this.sbcExecutable = null;
        this.sbcExecutableArguments = null;
        this.sbcExtraExecutables = [];
        this.sbcOutputRedirected = true;
        this.sbcPermissions = new Set();
        this.sbcPackageDependencies = [];
        this.sbcPluginDependencies = [];
        this.rrfVersion = null;
        this.data = new Map();
    }
    get id() { return __classPrivateFieldGet(this, _PluginManifest_id, "f"); }
    set id(value) {
        if (!value || value.length > 32) {
            throw new Error("Invalid plugin identifier");
        }
        for (const c in value.split("")) {
            if (!/\w/.test(c)) {
                throw new Error("Illegal plugin identifier");
            }
        }
        __classPrivateFieldSet(this, _PluginManifest_id, value, "f");
    }
    get name() { return __classPrivateFieldGet(this, _PluginManifest_name, "f"); }
    set name(value) {
        if (!value || value.length > 64) {
            throw new Error("Invalid plugin name");
        }
        for (const c in value.split("")) {
            if (!/[\w -_]/.test(c)) {
                throw new Error("Illegal plugin name");
            }
        }
        __classPrivateFieldSet(this, _PluginManifest_name, value, "f");
    }
    static checkVersion(actual, required) {
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
exports.default = PluginManifest;
_PluginManifest_id = new WeakMap(), _PluginManifest_name = new WeakMap();
