"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilamentMonitorType = exports.FilamentMonitorStatus = void 0;
const ModelObject_1 = require("../../ModelObject");
var FilamentMonitorStatus;
(function (FilamentMonitorStatus) {
    FilamentMonitorStatus["noMonitor"] = "noMonitor";
    FilamentMonitorStatus["ok"] = "ok";
    FilamentMonitorStatus["noDataReceived"] = "noDataReceived";
    FilamentMonitorStatus["noFilament"] = "noFilament";
    FilamentMonitorStatus["tooLittleMovement"] = "tooLittleMovement";
    FilamentMonitorStatus["tooMuchMovement"] = "tooMuchMovement";
    FilamentMonitorStatus["sensorError"] = "sensorError";
})(FilamentMonitorStatus = exports.FilamentMonitorStatus || (exports.FilamentMonitorStatus = {}));
var FilamentMonitorType;
(function (FilamentMonitorType) {
    FilamentMonitorType["simple"] = "simple";
    FilamentMonitorType["laser"] = "laser";
    FilamentMonitorType["pulsed"] = "pulsed";
    FilamentMonitorType["rotatingMagnet"] = "rotatingMagnet";
    FilamentMonitorType["unknown"] = "unknown";
})(FilamentMonitorType = exports.FilamentMonitorType || (exports.FilamentMonitorType = {}));
class FilamentMonitorBase extends ModelObject_1.default {
    constructor(type = FilamentMonitorType.unknown) {
        super();
        this.enabled = false;
        this.status = FilamentMonitorStatus.noDataReceived;
        this.type = type;
    }
}
exports.default = FilamentMonitorBase;
