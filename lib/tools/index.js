"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolState = void 0;
const ModelObject_1 = require("../ModelObject");
var ToolState;
(function (ToolState) {
    ToolState["off"] = "off";
    ToolState["active"] = "active";
    ToolState["standby"] = "standby";
})(ToolState = exports.ToolState || (exports.ToolState = {}));
class Tool extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.active = [];
        this.axes = [];
        this.extruders = [];
        this.fans = [];
        this.feedForward = [];
        this.filamentExtruder = -1;
        this.heaters = [];
        this.isRetracted = false;
        this.mix = [];
        this.name = "";
        this.number = 0;
        this.offsets = [];
        this.offsetsProbed = false;
        this.spindle = -1;
        this.spindleRpm = 0;
        this.standby = [];
        this.state = ToolState.off;
    }
}
exports.default = Tool;
