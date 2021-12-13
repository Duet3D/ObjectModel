"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScannerStatus = void 0;
const ModelObject_1 = require("../ModelObject");
var ScannerStatus;
(function (ScannerStatus) {
    ScannerStatus["disconnected"] = "D";
    ScannerStatus["idle"] = "I";
    ScannerStatus["scanning"] = "S";
    ScannerStatus["postProcessing"] = "P";
    ScannerStatus["calibrating"] = "C";
    ScannerStatus["uploading"] = "U";
})(ScannerStatus = exports.ScannerStatus || (exports.ScannerStatus = {}));
class Scanner extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.progress = 0;
        this.status = ScannerStatus.disconnected;
    }
}
exports.default = Scanner;
