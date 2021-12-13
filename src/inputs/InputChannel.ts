import { Compatibility } from "./Compatibility";
import { CodeChannel } from "./CodeChannel";
import ModelObject from "../ModelObject";

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

export default class InputChannel extends ModelObject {
    axesRelative: boolean = false;
    compatibility: Compatibility = Compatibility.RepRapFirmware;
    distanceUnit: DistanceUnit = DistanceUnit.mm;
    drivesRelative: boolean = true;
    feedRate: number = 50;
    inMacro: boolean = false;
    macroRestartable: boolean = false;
    name: CodeChannel = CodeChannel.unknown;
    stackDepth: number = 0;
    state: InputChannelState = InputChannelState.idle;
    lineNumber: bigint = 0n;
    volumetric: boolean = false;
}