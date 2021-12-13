"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineMode = exports.LogLevel = exports.GpOutputPort = exports.BeepRequest = void 0;
const ModelObject_1 = require("../ModelObject");
const ModelCollection_1 = require("../ModelCollection");
const RestorePoint_1 = require("./RestorePoint");
const MachineStatus_1 = require("./MachineStatus");
class BeepRequest extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.duration = 0;
        this.frequency = 0;
    }
}
exports.BeepRequest = BeepRequest;
class GpOutputPort extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.pwm = 0;
    }
}
exports.GpOutputPort = GpOutputPort;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["debug"] = 0] = "debug";
    LogLevel[LogLevel["info"] = 1] = "info";
    LogLevel[LogLevel["warn"] = 2] = "warn";
    LogLevel[LogLevel["off"] = 3] = "off";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var MachineMode;
(function (MachineMode) {
    MachineMode["fff"] = "FFF";
    MachineMode["cnc"] = "CNC";
    MachineMode["laser"] = "Laser";
})(MachineMode = exports.MachineMode || (exports.MachineMode = {}));
class State extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.atxPower = null;
        this.atxPowerPort = null;
        this.beep = null;
        this.currentTool = -1;
        this.displayMessage = "";
        this.dsfVersion = null; // deprecated; will be moved to separate dsf main key in v3.5
        this.dsfPluginSupport = false; // deprecated; will be moved to separate dsf main key in v3.5
        this.dsfRootPluginSupport = false; // deprecated; will be moved to separate dsf main key in v3.5
        this.gpOut = new ModelCollection_1.default(GpOutputPort);
        this.laserPwm = null;
        this.logFile = null;
        this.logLevel = LogLevel.off;
        this.messageBox = null;
        this.machineMode = MachineMode.fff;
        this.macroRestarted = false;
        this.msUpTime = 0;
        this.nextTool = -1;
        this.pluginsStarted = false;
        this.powerFailScript = "";
        this.previousTool = -1;
        this.restorePoints = new ModelCollection_1.default(RestorePoint_1.default);
        this.status = MachineStatus_1.MachineStatus.starting;
        this.time = null;
        this.upTime = 0;
    }
}
exports.default = State;
