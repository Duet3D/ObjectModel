import ModelObject from "../ModelObject";

export default class RestorePoint extends ModelObject {
    coords: Array<number> = [];
    extruderPos: number = 0;
    fanPwm: number = 0;
    feedRate: number = 0;
    ioBits: number | null = null;
    laserPwm: number | null = null;
    spindleSpeeds: Array<number> = [];
    toolNumber: number = -1;
}