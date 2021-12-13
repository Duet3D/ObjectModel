import ModelObject from "../ModelObject";
export declare enum ProbeType {
    none = 0,
    analog = 1,
    dumbModulated = 2,
    alternateAnalog = 3,
    endstopSwitch_obsolete = 4,
    digital = 5,
    e1Switch_obsolete = 6,
    zSwitch_obsolete = 7,
    unfilteredDigital = 8,
    blTouch = 9,
    zMotorStall = 10
}
export default class Probe extends ModelObject {
    calibrationTemperature: number;
    deployedByUser: boolean;
    disablesHeaters: boolean;
    diveHeight: number;
    lastStopHeight: number;
    maxProbeCount: number;
    offsets: Array<number>;
    recoveryTime: number;
    speeds: Array<number>;
    temperatureCoefficients: Array<number>;
    threshold: number;
    tolerance: number;
    travelSpeed: number;
    triggerHeight: number;
    type: ProbeType;
    value: Array<number>;
}
