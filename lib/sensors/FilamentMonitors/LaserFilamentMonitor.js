"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaserFilamentMonitorConfigured = exports.LaserFilamentMonitorCalibrated = void 0;
const ModelObject_1 = require("../../ModelObject");
const FilamentMonitorBase_1 = require("./FilamentMonitorBase");
const index_1 = require("./index");
class LaserFilamentMonitorCalibrated extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.calibrationFactor = 0;
        this.percentMax = 0;
        this.percentMin = 0;
        this.sensivity = 0;
        this.totalDistance = 0;
    }
}
exports.LaserFilamentMonitorCalibrated = LaserFilamentMonitorCalibrated;
class LaserFilamentMonitorConfigured extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.allMoves = false;
        this.percentMax = 0;
        this.percentMin = 0;
        this.sampleDistance = 0;
    }
}
exports.LaserFilamentMonitorConfigured = LaserFilamentMonitorConfigured;
class LaserFilamentMonitor extends FilamentMonitorBase_1.default {
    constructor() {
        super(FilamentMonitorBase_1.FilamentMonitorType.laser);
        this.calibrated = new LaserFilamentMonitorCalibrated();
        this.configured = new LaserFilamentMonitorConfigured();
        this.wrapModelProperty("calibrated", LaserFilamentMonitorCalibrated);
    }
    update(jsonElement) {
        if (jsonElement === null) {
            return null;
        }
        if (typeof jsonElement.type === "string" && jsonElement.type !== this.type) {
            return (0, index_1.getFilamentMonitor)(jsonElement.type).update(jsonElement);
        }
        return super.update(jsonElement);
    }
}
exports.default = LaserFilamentMonitor;
