"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputShapingType = void 0;
const ModelObject_1 = require("../ModelObject");
var InputShapingType;
(function (InputShapingType) {
    InputShapingType["none"] = "none";
    InputShapingType["mzv"] = "mzv";
    InputShapingType["zvd"] = "zvd";
    InputShapingType["zvdd"] = "zvddd";
    InputShapingType["zvddd"] = "zvddd";
    InputShapingType["ei2"] = "ei2";
    InputShapingType["ei3"] = "ei3";
})(InputShapingType = exports.InputShapingType || (exports.InputShapingType = {}));
class InputShaping extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.amplitudes = [];
        this.damping = 0.2;
        this.durations = [];
        this.frequency = 40;
        this.minAcceleration = 10;
        this.type = InputShapingType.none;
    }
}
exports.default = InputShaping;
