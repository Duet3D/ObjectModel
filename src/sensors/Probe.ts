import ModelObject from "../ModelObject";

export enum ProbeType {
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

export class Probe extends ModelObject {
    calibrationTemperature: number = 0;
    deployedByUser: boolean = false;
    disablesHeaters: boolean = false;
    diveHeight: number = 0;
    lastStopHeight: number = 0;
    maxProbeCount: number = -1;
    offsets: Array<number> = [0, 0];
    recoveryTime: number = 0;
    speeds: Array<number> = [2, 2];
    temperatureCoefficients: Array<number> = [0, 0];
    threshold: number = 500;
    tolerance: number = 0.03;
    travelSpeed: number = 100;
    triggerHeight: number = 0.7;
    type: ProbeType = ProbeType.none;
    value: Array<number> = [];
}

export default Probe
