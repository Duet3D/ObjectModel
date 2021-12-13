import ModelObject from "../../ModelObject";
import FilamentMonitorBase from "./FilamentMonitorBase";
export declare class RotatingMagnetFilamentMonitorCalibrated extends ModelObject {
    mmPerPulse: number;
    percentMax: number;
    percentMin: number;
    totalDistance: number;
}
export declare class RotatingMagnetFilamentMonitorConfigured extends ModelObject {
    allMoves: boolean;
    mmPerRev: number;
    percentMax: number;
    percentMin: number;
    sampleDistance: number;
}
export default class RotatingMagnetFilamentMonitor extends FilamentMonitorBase {
    calibrated: RotatingMagnetFilamentMonitorCalibrated | null;
    readonly configured: RotatingMagnetFilamentMonitorConfigured;
    constructor();
}
