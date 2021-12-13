"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GpInputPort = void 0;
const ModelObject_1 = require("../ModelObject");
const ModelCollection_1 = require("../ModelCollection");
const AnalogSensor_1 = require("./AnalogSensor");
const Endstop_1 = require("./Endstop");
const FilamentMonitors_1 = require("./FilamentMonitors");
const Probe_1 = require("./Probe");
class GpInputPort extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.value = 0;
    }
}
exports.GpInputPort = GpInputPort;
class Sensors extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.analog = new ModelCollection_1.default(AnalogSensor_1.default);
        this.endstops = new ModelCollection_1.default(Endstop_1.default);
        this.filamentMonitors = new ModelCollection_1.default(FilamentMonitors_1.default);
        this.gpIn = new ModelCollection_1.default(GpInputPort);
        this.probes = new ModelCollection_1.default(Probe_1.default);
    }
}
exports.default = Sensors;
