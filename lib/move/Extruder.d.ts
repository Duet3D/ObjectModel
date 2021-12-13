import ModelObject from "../ModelObject";
import DriverId from "./DriverId";
import Microstepping from "./Microstepping";
export declare class ExtruderNonlinear extends ModelObject {
    a: number;
    b: number;
    upperLimit: number;
}
export default class Extruder extends ModelObject {
    acceleration: number;
    current: number;
    driver: DriverId | null;
    filament: string;
    factor: number;
    jerk: number;
    readonly microstepping: Microstepping;
    readonly nonlinear: ExtruderNonlinear;
    percentCurrent: number;
    percentStstCurrent: number | null;
    position: number;
    pressureAdvance: number;
    rawPosition: number;
    speed: number;
    stepsPerMm: number;
}
