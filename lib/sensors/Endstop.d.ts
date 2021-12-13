import ModelObject from "../ModelObject";
export declare enum EndstopType {
    InputPin = "inputPin",
    ZProbeAsEndstop = "zProbeAsEndstop",
    motorStallAny = "motorStallAny",
    motorStallIndividual = "motorStallIndividual",
    unknown = "unknown"
}
export default class Endstop extends ModelObject {
    highEnd: boolean;
    triggered: boolean;
    type: EndstopType;
}
