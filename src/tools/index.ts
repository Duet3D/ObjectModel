import ModelObject from "../ModelObject";

export enum ToolState {
    off = "off",
    active = "active",
    standby = "standby"
}

export default class Tool extends ModelObject {
    active: Array<number> = [];
    axes: Array<Array<number>> = [];
    extruders: Array<number> = [];
    fans: Array<number> = [];
    feedForward: Array<number> = [];
    filamentExtruder: number = -1;
    heaters: Array<number> = [];
    isRetracted: boolean = false;
    mix: Array<number> = [];
    name: string = "";
    number: number = 0;
    offsets: Array<number> = [];
    offsetsProbed: boolean = false;
    spindle: number = -1;
    spindleRpm: number = 0;
    standby: Array<number> = [];
    state: ToolState = ToolState.off;
}
