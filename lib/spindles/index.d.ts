import ModelObject from "../ModelObject";
export declare enum SpindleState {
    unconfigured = "unconfigured",
    stopped = "stopped",
    forward = "forward",
    reverse = "reverse"
}
export default class Spindle extends ModelObject {
    active: number;
    canReverse: boolean;
    current: number;
    frequency: number;
    min: number;
    max: number;
    state: SpindleState;
}
