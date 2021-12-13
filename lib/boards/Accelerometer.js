"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class Accelerometer extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.points = 0;
        this.runs = 0;
    }
}
exports.default = Accelerometer;
