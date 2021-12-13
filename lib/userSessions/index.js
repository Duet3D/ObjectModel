"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionType = exports.AccessLevel = void 0;
const ModelObject_1 = require("../ModelObject");
var AccessLevel;
(function (AccessLevel) {
    AccessLevel["readOnly"] = "readOnly";
    AccessLevel["readWrite"] = "readWrite";
})(AccessLevel = exports.AccessLevel || (exports.AccessLevel = {}));
var SessionType;
(function (SessionType) {
    SessionType["local"] = "local";
    SessionType["http"] = "http";
    SessionType["telnet"] = "telnet";
})(SessionType = exports.SessionType || (exports.SessionType = {}));
class UserSession extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.accessLevel = AccessLevel.readOnly;
        this.id = 0;
        this.origin = null;
        this.originId = -1;
        this.sessionType = SessionType.local;
    }
}
exports.default = UserSession;
