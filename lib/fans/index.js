"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FanThermostaticControl = void 0;
const ModelObject_1 = require("../ModelObject");
class FanThermostaticControl extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.heaters = new Array();
        this.highTemperature = null;
        this.lowTemperature = null;
    }
}
exports.FanThermostaticControl = FanThermostaticControl;
class Fan extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.actualValue = 0;
        this.blip = 0.1;
        this.frequency = 250;
        this.max = 1;
        this.min = 0;
        this.name = "";
        this.requestedValue = 0;
        this.rpm = -1;
        this.thermostatic = new FanThermostaticControl();
    }
}
exports.default = Fan;
