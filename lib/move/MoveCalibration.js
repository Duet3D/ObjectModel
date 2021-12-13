"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveDeviations = void 0;
const ModelObject_1 = require("../ModelObject");
class MoveDeviations extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.deviation = 0;
        this.mean = 0;
    }
}
exports.MoveDeviations = MoveDeviations;
class MoveCalibration extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.final = new MoveDeviations();
        this.initial = new MoveDeviations();
        this.numFactors = 0;
    }
}
exports.default = MoveCalibration;
