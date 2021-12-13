import ModelObject from "../../ModelObject";
import FilamentMonitorBase, { FilamentMonitorType } from "./FilamentMonitorBase";

export class RotatingMagnetFilamentMonitorCalibrated extends ModelObject {
    mmPerPulse: number = 0;
    percentMax: number = 0;
    percentMin: number = 0;
    totalDistance: number = 0;
}

export class RotatingMagnetFilamentMonitorConfigured extends ModelObject {
    allMoves: boolean = false;
    mmPerRev: number = 0;
    percentMax: number = 0;
    percentMin: number = 0;
    sampleDistance: number = 0;
}

export default class RotatingMagnetFilamentMonitor extends FilamentMonitorBase {
    calibrated: RotatingMagnetFilamentMonitorCalibrated | null = new RotatingMagnetFilamentMonitorCalibrated();
    readonly configured: RotatingMagnetFilamentMonitorConfigured = new RotatingMagnetFilamentMonitorConfigured();

    constructor() {
        super(FilamentMonitorType.rotatingMagnet);
    }
}