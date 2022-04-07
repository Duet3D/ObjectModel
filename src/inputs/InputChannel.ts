import ModelObject from "../ModelObject";
import Compatibility from "./Compatibility";

export enum DistanceUnit {
    mm ="mm",
    inch = "inch"
}

export enum InputChannelState {
    awaitingAcknowledgement = "awaitingAcknowledgement",
    idle = "idle",
    executing = "executing",
    waiting = "waiting",
    reading = "reading"
}

export class InputChannel extends ModelObject {
    axesRelative: boolean = false;
    compatibility: Compatibility = Compatibility.RepRapFirmware;
    distanceUnit: DistanceUnit = DistanceUnit.mm;
    drivesRelative: boolean = true;
    feedRate: number = 50;
    inMacro: boolean = false;
    macroRestartable: boolean = false;
    name: string = "";
    stackDepth: number = 0;
    state: InputChannelState = InputChannelState.idle;
    lineNumber: bigint = 0n;
    volumetric: boolean = false;
}

export default InputChannel
