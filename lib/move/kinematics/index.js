"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKinematics = void 0;
const KinematicsBase_1 = require("./KinematicsBase");
const CoreKinematics_1 = require("./CoreKinematics");
const DeltaKinematics_1 = require("./DeltaKinematics");
const HangprinterKinematics_1 = require("./HangprinterKinematics");
const ScaraKinematics_1 = require("./ScaraKinematics");
const PolarKinematics_1 = require("./PolarKinematics");
class Kinematics extends KinematicsBase_1.default {
    constructor() {
        super(KinematicsBase_1.KinematicsName.unknown);
    }
    update(jsonElement) {
        if (jsonElement === null) {
            throw new Error("Kinematics must not be null");
        }
        if (typeof jsonElement.name === "string" && this.name !== jsonElement.name) {
            return getKinematics(jsonElement.name).update(jsonElement);
        }
        return super.update(jsonElement);
    }
}
exports.default = Kinematics;
function getKinematics(name) {
    switch (name) {
        case KinematicsBase_1.KinematicsName.cartesian:
        case KinematicsBase_1.KinematicsName.coreXY:
        case KinematicsBase_1.KinematicsName.coreXYU:
        case KinematicsBase_1.KinematicsName.coreXYUV:
        case KinematicsBase_1.KinematicsName.coreXZ:
        case KinematicsBase_1.KinematicsName.markForged:
            return new CoreKinematics_1.default(name);
        case KinematicsBase_1.KinematicsName.delta:
        case KinematicsBase_1.KinematicsName.rotaryDelta:
            return new DeltaKinematics_1.default(name);
        case KinematicsBase_1.KinematicsName.hangprinter:
            return new HangprinterKinematics_1.default();
        case KinematicsBase_1.KinematicsName.fiveBarScara:
        case KinematicsBase_1.KinematicsName.scara:
            return new ScaraKinematics_1.default(name);
        case KinematicsBase_1.KinematicsName.polar:
            return new PolarKinematics_1.default();
    }
    return name;
}
exports.getKinematics = getKinematics;
