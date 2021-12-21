import { IModelObject } from "../../ModelObject";
import KinematicsBase, { KinematicsName } from "./KinematicsBase";
import CoreKinematics from "./CoreKinematics";
import DeltaKinematics from "./DeltaKinematics";
import HangprinterKinematics from "./HangprinterKinematics";
import ScaraKinematics from "./ScaraKinematics";
import PolarKinematics from "./PolarKinematics";

export default class Kinematics extends KinematicsBase {
    constructor() {
        super(KinematicsName.unknown);
    }

    override update(jsonElement: any): IModelObject | null {
        if (jsonElement === null) {
            throw new Error("Kinematics must not be null");
        }

        if (typeof jsonElement.name === "string" && this.name !== jsonElement.name) {
            return getKinematics(jsonElement.name).update(jsonElement);
        }
        return super.update(jsonElement);
    }
}

export function getKinematics(name: KinematicsName): KinematicsBase {
    switch (name as KinematicsName) {
        case KinematicsName.cartesian:
        case KinematicsName.coreXY:
        case KinematicsName.coreXYU:
        case KinematicsName.coreXYUV:
        case KinematicsName.coreXZ:
        case KinematicsName.markForged:
            return new CoreKinematics(name);
        case KinematicsName.delta:
        case KinematicsName.rotaryDelta:
            return new DeltaKinematics(name);
        case KinematicsName.hangprinter:
            return new HangprinterKinematics();
        case KinematicsName.fiveBarScara:
        case KinematicsName.scara:
            return new ScaraKinematics(name);
        case KinematicsName.polar:
            return new PolarKinematics();
        default:
            return name as never;
    }
}
