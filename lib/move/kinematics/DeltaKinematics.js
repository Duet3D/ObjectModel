"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaTower = void 0;
const ModelCollection_1 = require("../../ModelCollection");
const ModelObject_1 = require("../../ModelObject");
const KinematicsBase_1 = require("./KinematicsBase");
const index_1 = require("./index");
class DeltaTower extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.angleCorrection = 0;
        this.diagonal = 0;
        this.endstopAdjustment = 0;
        this.xPos = 0;
        this.yPos = 0;
    }
}
exports.DeltaTower = DeltaTower;
class DeltaKinematics extends KinematicsBase_1.default {
    constructor() {
        super(...arguments);
        this.deltaRadius = 0;
        this.homedHeight = 0;
        this.printRadius = 0;
        this.towers = new ModelCollection_1.default(DeltaTower);
        this.xTilt = 0;
        this.yTilt = 0;
    }
    update(jsonElement) {
        if (jsonElement === null) {
            throw new Error("Kinematics must not be null");
        }
        if (typeof jsonElement.name === "string" && this.name !== jsonElement.name) {
            return (0, index_1.getKinematics)(jsonElement.name).update(jsonElement);
        }
        return super.update(jsonElement);
    }
}
exports.default = DeltaKinematics;
