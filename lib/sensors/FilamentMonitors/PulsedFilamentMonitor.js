"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulsedFilamentMonitorConfigured = exports.PulsedFilamentMonitorCalibrated = void 0;
const ModelObject_1 = require("../../ModelObject");
const FilamentMonitorBase_1 = require("./FilamentMonitorBase");
class PulsedFilamentMonitorCalibrated extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.mmPerPulse = 0;
        this.percentMax = 0;
        this.percentMin = 0;
        this.totalDistance = 0;
    }
}
exports.PulsedFilamentMonitorCalibrated = PulsedFilamentMonitorCalibrated;
class PulsedFilamentMonitorConfigured extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.mmPerPulse = 0;
        this.percentMax = 0;
        this.percentMin = 0;
        this.sampleDistance = 0;
    }
}
exports.PulsedFilamentMonitorConfigured = PulsedFilamentMonitorConfigured;
class PulsedFilamentMonitor extends FilamentMonitorBase_1.default {
    constructor() {
        super(FilamentMonitorBase_1.FilamentMonitorType.pulsed);
        this.calibrated = new PulsedFilamentMonitorCalibrated();
        this.configured = new PulsedFilamentMonitorConfigured();
    }
}
exports.default = PulsedFilamentMonitor;
