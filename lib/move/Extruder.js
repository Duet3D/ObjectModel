"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtruderNonlinear = void 0;
const ModelObject_1 = require("../ModelObject");
const DriverId_1 = require("./DriverId");
const Microstepping_1 = require("./Microstepping");
class ExtruderNonlinear extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.a = 0;
        this.b = 0;
        this.upperLimit = 0.2;
    }
}
exports.ExtruderNonlinear = ExtruderNonlinear;
class Extruder extends ModelObject_1.default {
    constructor() {
        super();
        this.acceleration = 500;
        this.current = 0;
        this.driver = null;
        this.filament = "";
        this.factor = 1;
        this.jerk = 15;
        this.microstepping = new Microstepping_1.default();
        this.nonlinear = new ExtruderNonlinear();
        this.percentCurrent = 100;
        this.percentStstCurrent = null;
        this.position = 0;
        this.pressureAdvance = 0;
        this.rawPosition = 0;
        this.speed = 100;
        this.stepsPerMm = 420;
        this.wrapModelProperty("driver", DriverId_1.default);
    }
}
exports.default = Extruder;
