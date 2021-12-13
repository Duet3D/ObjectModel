"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveCompensationType = exports.Skew = exports.ProbeGrid = void 0;
const ModelObject_1 = require("../ModelObject");
const MoveCalibration_1 = require("./MoveCalibration");
class ProbeGrid extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.axes = ['X', 'Y'];
        this.maxs = [-1, -1];
        this.mins = [0, 0];
        this.radius = 0;
        this.spacings = [0, 0];
    }
}
exports.ProbeGrid = ProbeGrid;
class Skew extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.compensateXY = true;
        this.tanXY = 0;
        this.tanXZ = 0;
        this.tanYZ = 0;
    }
}
exports.Skew = Skew;
var MoveCompensationType;
(function (MoveCompensationType) {
    MoveCompensationType["none"] = "none";
    MoveCompensationType["mesh"] = "mesh";
})(MoveCompensationType = exports.MoveCompensationType || (exports.MoveCompensationType = {}));
class MoveCompensation extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.fadeHeight = null;
        this.file = null;
        this.liveGrid = null;
        this.meshDeviation = new MoveCalibration_1.MoveDeviations();
        this.probeGrid = new ProbeGrid();
        this.skew = new Skew();
        this.type = MoveCompensationType.none;
    }
}
exports.default = MoveCompensation;
