import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import RestorePoint from "../state/RestorePoint";
import { MoveRotation } from ".";

export class MotionSystemCurrentMove extends ModelObject {
    acceleration: number = 0;
    deceleration: number = 0;
    distance: number = 0;
    duration: number = 0;
    extrusionRate: number = 0;
    filePosition: number | null = null;
    requestedSpeed: number = 0;
    topSpeed: number = 0;
}

export class MotionSystem extends ModelObject {
    readonly currentMove: MotionSystemCurrentMove = new MotionSystemCurrentMove();
    currentObject: number | null = null;
    currentTool: number = -1;
    nextTool: number = -1;
    previousTool: number = -1;
    printingAcceleration: number = 10000;
    readonly restorePoints: ModelCollection<RestorePoint> = new ModelCollection(RestorePoint);
    readonly rotation: MoveRotation = new MoveRotation();
    speedFactor: number = 1;
    travelAcceleration: number = 10000;
    userPosition: Array<number> = [];
    virtualEPos: number = 0;
    workplaceNumber: number = 0;
}

export default MotionSystem
