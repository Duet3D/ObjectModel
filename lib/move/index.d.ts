import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import Axis from "./Axis";
import MoveCalibration from "./MoveCalibration";
import MoveCompensation from "./MoveCompensation";
import Extruder from "./Extruder";
import InputShaping from "./InputShaping";
import Kinematics from "./kinematics";
export declare class CurrentMove extends ModelObject {
    acceleration: number;
    deceleration: number;
    laserPwm: number | null;
    requestedSpeed: number;
    topSpeed: number;
}
export declare class MotorsIdleControl extends ModelObject {
    factor: number;
    timeout: number;
}
export declare class MoveQueueItem extends ModelObject {
    gracePeriod: number;
    length: number;
}
export declare class MoveRotation extends ModelObject {
    angle: number;
    centre: Array<number>;
}
export default class Move extends ModelObject {
    readonly axes: ModelCollection<Axis>;
    readonly calibration: MoveCalibration;
    readonly compensation: MoveCompensation;
    readonly currentMove: CurrentMove;
    readonly extruders: ModelCollection<Extruder>;
    readonly idle: MotorsIdleControl;
    kinematics: Kinematics;
    printingAcceleration: number;
    readonly queue: ModelCollection<MoveQueueItem>;
    readonly rotation: MoveRotation;
    readonly shaping: InputShaping;
    speedFactor: number;
    travelAcceleration: number;
    virtualEPos: number;
    workplaceNumber: number;
}
