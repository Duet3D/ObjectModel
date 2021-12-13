"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class Microstepping extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.interpolated = false;
        this.value = 16;
    }
}
exports.default = Microstepping;
