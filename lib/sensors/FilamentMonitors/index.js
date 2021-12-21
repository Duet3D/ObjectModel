"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilamentMonitor = void 0;
const FilamentMonitorBase_1 = require("./FilamentMonitorBase");
const LaserFilamentMonitor_1 = require("./LaserFilamentMonitor");
const PulsedFilamentMonitor_1 = require("./PulsedFilamentMonitor");
const RotatingMagnetFilamentMonitor_1 = require("./RotatingMagnetFilamentMonitor");
class FilamentMonitor extends FilamentMonitorBase_1.default {
    update(jsonElement) {
        if (jsonElement === null) {
            return null;
        }
        if (typeof jsonElement.type === "string" && jsonElement.type !== this.type) {
            return getFilamentMonitor(jsonElement.type).update(jsonElement);
        }
        return super.update(jsonElement);
    }
}
exports.default = FilamentMonitor;
function getFilamentMonitor(type) {
    switch (type) {
        case FilamentMonitorBase_1.FilamentMonitorType.laser:
            return new LaserFilamentMonitor_1.default();
        case FilamentMonitorBase_1.FilamentMonitorType.pulsed:
            return new PulsedFilamentMonitor_1.default();
        case FilamentMonitorBase_1.FilamentMonitorType.rotatingMagnet:
            return new RotatingMagnetFilamentMonitor_1.default();
        default:
            return new FilamentMonitor(type);
    }
}
exports.getFilamentMonitor = getFilamentMonitor;
