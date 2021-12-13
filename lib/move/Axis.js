"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxisLetter = void 0;
const ModelObject_1 = require("../ModelObject");
const Microstepping_1 = require("./Microstepping");
var AxisLetter;
(function (AxisLetter) {
    AxisLetter["X"] = "X";
    AxisLetter["Y"] = "Y";
    AxisLetter["Z"] = "Z";
    AxisLetter["U"] = "U";
    AxisLetter["V"] = "V";
    AxisLetter["W"] = "W";
    AxisLetter["A"] = "A";
    AxisLetter["B"] = "B";
    AxisLetter["C"] = "C";
    AxisLetter["D"] = "D";
    AxisLetter["a"] = "a";
    AxisLetter["b"] = "b";
    AxisLetter["c"] = "c";
    AxisLetter["d"] = "d";
    AxisLetter["e"] = "e";
    AxisLetter["f"] = "f";
    AxisLetter["g"] = "g";
    AxisLetter["h"] = "h";
    AxisLetter["i"] = "i";
    AxisLetter["j"] = "j";
    AxisLetter["k"] = "k";
    AxisLetter["l"] = "l";
    AxisLetter["none"] = "";
})(AxisLetter = exports.AxisLetter || (exports.AxisLetter = {}));
class Axis extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.acceleration = 0;
        this.babystep = 0;
        this.current = 0;
        this.drivers = new Array();
        this.homed = false;
        this.jerk = 15;
        this.letter = AxisLetter.none;
        this.machinePosition = null;
        this.max = 200;
        this.maxProbed = false;
        this.microstepping = new Microstepping_1.default();
        this.min = 0;
        this.minProbed = false;
        this.percentCurrent = 100;
        this.percentStstCurrent = null;
        this.speed = 100;
        this.stepsPerMm = 80;
        this.userPosition = null;
        this.visible = true;
        this.workplaceOffsets = new Array();
    }
}
exports.default = Axis;
