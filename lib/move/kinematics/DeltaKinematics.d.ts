import ModelCollection from "../../ModelCollection";
import ModelObject from "../../ModelObject";
import KinematicsBase from "./KinematicsBase";
export declare class DeltaTower extends ModelObject {
    angleCorrection: number;
    diagonal: number;
    endstopAdjustment: number;
    xPos: number;
    yPos: number;
}
export default class DeltaKinematics extends KinematicsBase {
    deltaRadius: number;
    homedHeight: number;
    printRadius: number;
    readonly towers: ModelCollection<DeltaTower>;
    xTilt: number;
    yTilt: number;
    update(jsonElement: any): ModelObject | null;
}
