import ModelObject from "../ModelObject";
export declare enum ToolState {
    off = "off",
    active = "active",
    standby = "standby"
}
export default class Tool extends ModelObject {
    active: Array<number>;
    axes: Array<Array<number>>;
    extruders: Array<number>;
    fans: Array<number>;
    feedForward: Array<number>;
    filamentExtruder: number;
    heaters: Array<number>;
    isRetracted: boolean;
    mix: Array<number>;
    name: string;
    number: number;
    offsets: Array<number>;
    offsetsProbed: boolean;
    spindle: number;
    spindleRpm: number;
    standby: Array<number>;
    state: ToolState;
}
