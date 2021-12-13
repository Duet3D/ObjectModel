"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaterState = void 0;
const ModelCollection_1 = require("../ModelCollection");
const HeaterModel_1 = require("./HeaterModel");
const ModelObject_1 = require("../ModelObject");
const HeaterMonitor_1 = require("./HeaterMonitor");
var HeaterState;
(function (HeaterState) {
    HeaterState["off"] = "off";
    HeaterState["standby"] = "standby";
    HeaterState["active"] = "active";
    HeaterState["fault"] = "fault";
    HeaterState["tuning"] = "tuning";
    HeaterState["offline"] = "offline";
})(HeaterState = exports.HeaterState || (exports.HeaterState = {}));
class Heater extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.active = 0;
        this.avgPwm = 0;
        this.current = -273.15;
        this.max = 285;
        this.min = -10;
        this.model = new HeaterModel_1.default();
        this.monitors = new ModelCollection_1.default(HeaterMonitor_1.default);
        this.sensor = -1;
        this.standby = 0;
        this.state = HeaterState.off;
    }
}
exports.default = Heater;
