import ModelObject from "../ModelObject";
import DriverId from "./DriverId";
import Microstepping from "./Microstepping";

export class ExtruderNonlinear extends ModelObject {
    a: number = 0;
    b: number = 0;
    upperLimit: number = 0.2;
}

export default class Extruder extends ModelObject {
    acceleration: number = 500;
    current: number = 0;
    driver: DriverId | null = null;
    filament: string = "";
    factor: number = 1;
    jerk: number = 15;
    readonly microstepping: Microstepping = new Microstepping();
    readonly nonlinear: ExtruderNonlinear = new ExtruderNonlinear();
    percentCurrent: number = 100;
    percentStstCurrent: number | null = null;
    position: number = 0;
    pressureAdvance: number = 0;
    rawPosition: number = 0;
    speed: number = 100;
    stepsPerMm: number = 420;
}