"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndstopType = void 0;
const ModelObject_1 = require("../ModelObject");
var EndstopType;
(function (EndstopType) {
    EndstopType["InputPin"] = "inputPin";
    EndstopType["ZProbeAsEndstop"] = "zProbeAsEndstop";
    EndstopType["motorStallAny"] = "motorStallAny";
    EndstopType["motorStallIndividual"] = "motorStallIndividual";
    EndstopType["unknown"] = "unknown";
})(EndstopType = exports.EndstopType || (exports.EndstopType = {}));
class Endstop extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.highEnd = false;
        this.triggered = false;
        this.type = EndstopType.unknown;
    }
}
exports.default = Endstop;
