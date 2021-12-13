"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class MinMaxCurrent extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.current = 0;
        this.min = 0;
        this.max = 0;
    }
}
exports.default = MinMaxCurrent;
