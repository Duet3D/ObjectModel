import ModelObject from "../ModelObject";
export declare class HeaterModelPID extends ModelObject {
    d: number;
    i: number;
    overridden: boolean;
    p: number;
    used: boolean;
}
export default class HeaterModel extends ModelObject {
    coolingExp: number;
    coolingRate: number;
    deadTime: number;
    enabled: boolean;
    fanCoolingRate: number;
    heatingRate: number;
    inverted: boolean;
    maxPwm: number;
    readonly pid: HeaterModelPID;
    standardVoltage: number | null;
}
