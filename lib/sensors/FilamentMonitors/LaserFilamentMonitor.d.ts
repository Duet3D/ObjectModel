import ModelObject from "../../ModelObject";
import FilamentMonitorBase from "./FilamentMonitorBase";
export declare class LaserFilamentMonitorCalibrated extends ModelObject {
    calibrationFactor: number;
    percentMax: number;
    percentMin: number;
    sensivity: number;
    totalDistance: number;
}
export declare class LaserFilamentMonitorConfigured extends ModelObject {
    allMoves: boolean;
    percentMax: number;
    percentMin: number;
    sampleDistance: number;
}
export default class LaserFilamentMonitor extends FilamentMonitorBase {
    calibrated: LaserFilamentMonitorCalibrated | null;
    readonly configured: LaserFilamentMonitorConfigured;
    constructor();
}
