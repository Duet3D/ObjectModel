import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import Axis from "./Axis";
import MoveCalibration from "./MoveCalibration";
import MoveCompensation from "./MoveCompensation";
import Extruder from "./Extruder";
import InputShaping from "./InputShaping";
import Kinematics from "./kinematics";

export class CurrentMove extends ModelObject {
    acceleration: number = 0;
    deceleration: number = 0;
    laserPwm: number | null = null;
    requestedSpeed: number = 0;
    topSpeed: number = 0;
}

export class MotorsIdleControl extends ModelObject {
    factor: number = 0.3;
    timeout: number = 30;
}

export class MoveQueueItem extends ModelObject {
    gracePeriod: number = 0;
    length: number = 0;
}

export class MoveRotation extends ModelObject {
    angle: number = 0;
    centre: Array<number> = [0, 0];
}

export default class Move extends ModelObject {
    readonly axes: ModelCollection<Axis> = new ModelCollection(Axis);
    readonly calibration: MoveCalibration = new MoveCalibration();
    readonly compensation: MoveCompensation = new MoveCompensation();
    readonly currentMove: CurrentMove = new CurrentMove();
    readonly extruders: ModelCollection<Extruder> = new ModelCollection(Extruder);
    readonly idle: MotorsIdleControl = new MotorsIdleControl();
    kinematics: Kinematics = new Kinematics();
    limitAxes: boolean = true;
    noMovesBeforeHoming: boolean = true;
    printingAcceleration: number = 10000;
    readonly queue: ModelCollection<MoveQueueItem> = new ModelCollection(MoveQueueItem);
    readonly rotation: MoveRotation = new MoveRotation();
    readonly shaping: InputShaping = new InputShaping();
    speedFactor: number = 1;
    travelAcceleration: number = 10000;
    virtualEPos: number = 0;
    workplaceNumber: number = 0;
}