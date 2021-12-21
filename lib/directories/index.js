"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class Directories extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.filaments = "0:/filaments";
        this.firmware = "0:/firmware";
        this.gCodes = "0:/gcodes";
        this.macros = "0:/macros";
        this.menu = "0:/menu";
        this.scans = "0:/scans";
        this.system = "0:/sys";
        this.web = "0:/www";
    }
}
exports.default = Directories;
