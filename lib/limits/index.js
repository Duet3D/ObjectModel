"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class Limits extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.axes = null;
        this.axesPlusExtruders = null;
        this.bedHeaters = null;
        this.boards = null;
        this.chamberHeaters = null;
        this.drivers = null;
        this.driversPerAxis = null;
        this.extruders = null;
        this.extrudersPerTool = null;
        this.fans = null;
        this.gpInPorts = null;
        this.gpOutPorts = null;
        this.heaters = null;
        this.heatersPerTool = null;
        this.monitorsPerHeater = null;
        this.restorePoints = null;
        this.sensors = null;
        this.spindles = null;
        this.tools = null;
        this.trackedObjects = null;
        this.triggers = null;
        this.volumes = null;
        this.workplaces = null;
        this.zProbeProgramBytes = null;
        this.zProbes = null;
    }
}
exports.default = Limits;
