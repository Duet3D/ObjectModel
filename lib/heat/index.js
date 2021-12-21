"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelCollection_1 = require("../ModelCollection");
const Heater_1 = require("./Heater");
const ModelObject_1 = require("../ModelObject");
class Heat extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.bedHeaters = new Array();
        this.chamberHeaters = new Array();
        this.coldExtrudeTemperature = 160;
        this.coldRetractTemperature = 90;
        this.heaters = new ModelCollection_1.default(Heater_1.default);
    }
}
exports.default = Heat;
