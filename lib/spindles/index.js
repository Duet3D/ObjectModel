"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpindleState = void 0;
const ModelObject_1 = require("../ModelObject");
var SpindleState;
(function (SpindleState) {
    SpindleState["unconfigured"] = "unconfigured";
    SpindleState["stopped"] = "stopped";
    SpindleState["forward"] = "forward";
    SpindleState["reverse"] = "reverse";
})(SpindleState = exports.SpindleState || (exports.SpindleState = {}));
class Spindle extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.active = 0;
        this.canReverse = false;
        this.current = 0;
        this.frequency = 0;
        this.min = 60;
        this.max = 10000;
        this.state = SpindleState.unconfigured;
    }
}
exports.default = Spindle;
