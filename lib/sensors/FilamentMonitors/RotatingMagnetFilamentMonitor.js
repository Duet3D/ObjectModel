"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotatingMagnetFilamentMonitorConfigured = exports.RotatingMagnetFilamentMonitorCalibrated = void 0;
const ModelObject_1 = require("../../ModelObject");
const FilamentMonitorBase_1 = require("./FilamentMonitorBase");
const index_1 = require("./index");
class RotatingMagnetFilamentMonitorCalibrated extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.mmPerPulse = 0;
        this.percentMax = 0;
        this.percentMin = 0;
        this.totalDistance = 0;
    }
}
exports.RotatingMagnetFilamentMonitorCalibrated = RotatingMagnetFilamentMonitorCalibrated;
class RotatingMagnetFilamentMonitorConfigured extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.allMoves = false;
        this.mmPerRev = 0;
        this.percentMax = 0;
        this.percentMin = 0;
        this.sampleDistance = 0;
    }
}
exports.RotatingMagnetFilamentMonitorConfigured = RotatingMagnetFilamentMonitorConfigured;
class RotatingMagnetFilamentMonitor extends FilamentMonitorBase_1.default {
    constructor() {
        super(FilamentMonitorBase_1.FilamentMonitorType.rotatingMagnet);
        this.calibrated = new RotatingMagnetFilamentMonitorCalibrated();
        this.configured = new RotatingMagnetFilamentMonitorConfigured();
        this.wrapModelProperty("calibrated", RotatingMagnetFilamentMonitorCalibrated);
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
exports.default = RotatingMagnetFilamentMonitor;
