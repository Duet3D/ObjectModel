"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputChannelState = exports.DistanceUnit = void 0;
const Compatibility_1 = require("./Compatibility");
const ModelObject_1 = require("../ModelObject");
var DistanceUnit;
(function (DistanceUnit) {
    DistanceUnit["mm"] = "mm";
    DistanceUnit["inch"] = "inch";
})(DistanceUnit = exports.DistanceUnit || (exports.DistanceUnit = {}));
var InputChannelState;
(function (InputChannelState) {
    InputChannelState["awaitingAcknowledgement"] = "awaitingAcknowledgement";
    InputChannelState["idle"] = "idle";
    InputChannelState["executing"] = "executing";
    InputChannelState["waiting"] = "waiting";
    InputChannelState["reading"] = "reading";
})(InputChannelState = exports.InputChannelState || (exports.InputChannelState = {}));
class InputChannel extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.axesRelative = false;
        this.compatibility = Compatibility_1.Compatibility.RepRapFirmware;
        this.distanceUnit = DistanceUnit.mm;
        this.drivesRelative = true;
        this.feedRate = 50;
        this.inMacro = false;
        this.macroRestartable = false;
        this.name = "";
        this.stackDepth = 0;
        this.state = InputChannelState.idle;
        this.lineNumber = 0n;
        this.volumetric = false;
    }
}
exports.default = InputChannel;
