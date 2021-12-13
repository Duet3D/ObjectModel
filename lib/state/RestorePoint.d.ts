import ModelObject from "../ModelObject";
export default class RestorePoint extends ModelObject {
    coords: Array<number>;
    extruderPos: number;
    fanPwm: number;
    feedRate: number;
    ioBits: number | null;
    laserPwm: number | null;
    spindleSpeeds: Array<number>;
    toolNumber: number;
}
