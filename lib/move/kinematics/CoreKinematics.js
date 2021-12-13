"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KinematicsBase_1 = require("./KinematicsBase");
const index_1 = require("./index");
class CoreKinematics extends KinematicsBase_1.ZLeadscrewKinematics {
    constructor(name) {
        super(name);
        this.forwardMatrix = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        this.inverseMatrix = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
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
exports.default = CoreKinematics;
