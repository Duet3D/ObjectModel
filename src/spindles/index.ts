import ModelObject from "../ModelObject";

export enum SpindleState {
    unconfigured = "unconfigured",
    stopped = "stopped",
    forward = "forward",
    reverse = "reverse"
}

export class Spindle extends ModelObject {
    active: number = 0;
    canReverse: boolean = false;
    current: number = 0;
    frequency: number = 0;
    idlePwm: number = 0;
    min: number = 60;
    minPwm: number = 0;
    max: number = 10000;
    maxPwm: number = 1;
    state: SpindleState = SpindleState.unconfigured;
}

export default Spindle
