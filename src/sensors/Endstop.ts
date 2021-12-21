import ModelObject from "../ModelObject";

export enum EndstopType {
    InputPin = "inputPin",
    ZProbeAsEndstop = "zProbeAsEndstop",
    motorStallAny = "motorStallAny",
    motorStallIndividual = "motorStallIndividual",
    unknown = "unknown"
}

export default class Endstop extends ModelObject {
    highEnd: boolean = false;
    triggered: boolean = false;
    type: EndstopType = EndstopType.unknown;
}
