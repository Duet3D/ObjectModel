import ModelObject from "../../ModelObject";
import FilamentMonitorBase, { FilamentMonitorType } from "./FilamentMonitorBase";

export class LaserFilamentMonitorCalibrated extends ModelObject {
    calibrationFactor: number = 0;
    percentMax: number = 0;
    percentMin: number = 0;
    sensivity: number = 0;
    totalDistance: number = 0;
}

export class LaserFilamentMonitorConfigured extends ModelObject {
    allMoves: boolean = false;
    percentMax: number = 0;
    percentMin: number = 0;
    sampleDistance: number = 0;
}

export default class LaserFilamentMonitor extends FilamentMonitorBase {
    calibrated: LaserFilamentMonitorCalibrated | null = new LaserFilamentMonitorCalibrated();
    readonly configured: LaserFilamentMonitorConfigured = new LaserFilamentMonitorConfigured();

    constructor() {
        super(FilamentMonitorType.laser);
    }
}