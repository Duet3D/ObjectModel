"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaterMonitorCondition = exports.HeaterMonitorAction = void 0;
const ModelObject_1 = require("../ModelObject");
var HeaterMonitorAction;
(function (HeaterMonitorAction) {
    HeaterMonitorAction[HeaterMonitorAction["generateFault"] = 0] = "generateFault";
    HeaterMonitorAction[HeaterMonitorAction["permanentSwitchOff"] = 1] = "permanentSwitchOff";
    HeaterMonitorAction[HeaterMonitorAction["temporarySwitchOff"] = 2] = "temporarySwitchOff";
    HeaterMonitorAction[HeaterMonitorAction["shutDown"] = 3] = "shutDown";
})(HeaterMonitorAction = exports.HeaterMonitorAction || (exports.HeaterMonitorAction = {}));
var HeaterMonitorCondition;
(function (HeaterMonitorCondition) {
    HeaterMonitorCondition["disabled"] = "disabled";
    HeaterMonitorCondition["tooHigh"] = "tooHigh";
    HeaterMonitorCondition["tooLow"] = "tooLow";
})(HeaterMonitorCondition = exports.HeaterMonitorCondition || (exports.HeaterMonitorCondition = {}));
class HeaterMonitor extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.action = HeaterMonitorAction.generateFault;
        this.condition = HeaterMonitorCondition.disabled;
        this.limit = 2000;
    }
}
exports.default = HeaterMonitor;
