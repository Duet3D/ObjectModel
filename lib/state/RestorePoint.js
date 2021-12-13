"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class RestorePoint extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.coords = [];
        this.extruderPos = 0;
        this.fanPwm = 0;
        this.feedRate = 0;
        this.ioBits = null;
        this.laserPwm = null;
        this.spindleSpeeds = [];
        this.toolNumber = -1;
    }
}
exports.default = RestorePoint;
