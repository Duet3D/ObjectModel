"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class DirectDisplay extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.pulsesPerClick = 0;
        this.spiFreq = 0;
        this.typeName = "";
    }
}
exports.default = DirectDisplay;
