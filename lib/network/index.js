"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPassword = exports.DefaultHostname = exports.DefaultName = void 0;
const ModelObject_1 = require("../ModelObject");
const ModelCollection_1 = require("../ModelCollection");
const NetworkInterface_1 = require("./NetworkInterface");
exports.DefaultName = "My Duet";
exports.DefaultHostname = "duet";
exports.DefaultPassword = "reprap";
class Network extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.corsSite = null;
        this.hostname = exports.DefaultHostname;
        this.interfaces = new ModelCollection_1.default(NetworkInterface_1.default);
        this.name = exports.DefaultName;
    }
}
exports.default = Network;
