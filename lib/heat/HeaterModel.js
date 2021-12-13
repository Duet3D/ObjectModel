"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaterModelPID = void 0;
const ModelObject_1 = require("../ModelObject");
class HeaterModelPID extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.d = 0;
        this.i = 0;
        this.overridden = false;
        this.p = 0;
        this.used = true;
    }
}
exports.HeaterModelPID = HeaterModelPID;
class HeaterModel extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.coolingExp = 1.35;
        this.coolingRate = 0.56;
        this.deadTime = 5.5;
        this.enabled = false;
        this.fanCoolingRate = 0.56;
        this.heatingRate = 2.43;
        this.inverted = false;
        this.maxPwm = 1;
        this.pid = new HeaterModelPID();
        this.standardVoltage = null;
    }
}
exports.default = HeaterModel;
