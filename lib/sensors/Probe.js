"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProbeType = void 0;
const ModelObject_1 = require("../ModelObject");
var ProbeType;
(function (ProbeType) {
    ProbeType[ProbeType["none"] = 0] = "none";
    ProbeType[ProbeType["analog"] = 1] = "analog";
    ProbeType[ProbeType["dumbModulated"] = 2] = "dumbModulated";
    ProbeType[ProbeType["alternateAnalog"] = 3] = "alternateAnalog";
    ProbeType[ProbeType["endstopSwitch_obsolete"] = 4] = "endstopSwitch_obsolete";
    ProbeType[ProbeType["digital"] = 5] = "digital";
    ProbeType[ProbeType["e1Switch_obsolete"] = 6] = "e1Switch_obsolete";
    ProbeType[ProbeType["zSwitch_obsolete"] = 7] = "zSwitch_obsolete";
    ProbeType[ProbeType["unfilteredDigital"] = 8] = "unfilteredDigital";
    ProbeType[ProbeType["blTouch"] = 9] = "blTouch";
    ProbeType[ProbeType["zMotorStall"] = 10] = "zMotorStall";
})(ProbeType = exports.ProbeType || (exports.ProbeType = {}));
class Probe extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.calibrationTemperature = 0;
        this.deployedByUser = false;
        this.disablesHeaters = false;
        this.diveHeight = 0;
        this.lastStopHeight = 0;
        this.maxProbeCount = -1;
        this.offsets = [0, 0];
        this.recoveryTime = 0;
        this.speeds = [2, 2];
        this.temperatureCoefficients = [0, 0];
        this.threshold = 500;
        this.tolerance = 0.03;
        this.travelSpeed = 100;
        this.triggerHeight = 0.7;
        this.type = ProbeType.none;
        this.value = [];
    }
}
exports.default = Probe;
