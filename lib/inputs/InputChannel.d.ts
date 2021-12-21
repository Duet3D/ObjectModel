import { Compatibility } from "./Compatibility";
import ModelObject from "../ModelObject";
export declare enum DistanceUnit {
    mm = "mm",
    inch = "inch"
}
export declare enum InputChannelState {
    awaitingAcknowledgement = "awaitingAcknowledgement",
    idle = "idle",
    executing = "executing",
    waiting = "waiting",
    reading = "reading"
}
export default class InputChannel extends ModelObject {
    axesRelative: boolean;
    compatibility: Compatibility;
    distanceUnit: DistanceUnit;
    drivesRelative: boolean;
    feedRate: number;
    inMacro: boolean;
    macroRestartable: boolean;
    name: string;
    stackDepth: number;
    state: InputChannelState;
    lineNumber: bigint;
    volumetric: boolean;
}
