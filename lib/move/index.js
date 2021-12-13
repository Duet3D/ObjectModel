"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveRotation = exports.MoveQueueItem = exports.MotorsIdleControl = exports.CurrentMove = void 0;
const ModelObject_1 = require("../ModelObject");
const ModelCollection_1 = require("../ModelCollection");
const Axis_1 = require("./Axis");
const MoveCalibration_1 = require("./MoveCalibration");
const MoveCompensation_1 = require("./MoveCompensation");
const Extruder_1 = require("./Extruder");
const InputShaping_1 = require("./InputShaping");
const kinematics_1 = require("./kinematics");
class CurrentMove extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.acceleration = 0;
        this.deceleration = 0;
        this.laserPwm = null;
        this.requestedSpeed = 0;
        this.topSpeed = 0;
    }
}
exports.CurrentMove = CurrentMove;
class MotorsIdleControl extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.factor = 0.3;
        this.timeout = 30;
    }
}
exports.MotorsIdleControl = MotorsIdleControl;
class MoveQueueItem extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.gracePeriod = 0;
        this.length = 0;
    }
}
exports.MoveQueueItem = MoveQueueItem;
class MoveRotation extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.angle = 0;
        this.centre = [0, 0];
    }
}
exports.MoveRotation = MoveRotation;
class Move extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.axes = new ModelCollection_1.default(Axis_1.default);
        this.calibration = new MoveCalibration_1.default();
        this.compensation = new MoveCompensation_1.default();
        this.currentMove = new CurrentMove();
        this.extruders = new ModelCollection_1.default(Extruder_1.default);
        this.idle = new MotorsIdleControl();
        this.kinematics = new kinematics_1.default();
        this.printingAcceleration = 10000;
        this.queue = new ModelCollection_1.default(MoveQueueItem);
        this.rotation = new MoveRotation();
        this.shaping = new InputShaping_1.default();
        this.speedFactor = 1;
        this.travelAcceleration = 10000;
        this.virtualEPos = 0;
        this.workplaceNumber = 0;
    }
}
exports.default = Move;
