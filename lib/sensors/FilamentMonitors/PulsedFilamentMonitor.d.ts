import ModelObject, { IModelObject } from "../../ModelObject";
import FilamentMonitorBase from "./FilamentMonitorBase";
export declare class PulsedFilamentMonitorCalibrated extends ModelObject {
    mmPerPulse: number;
    percentMax: number;
    percentMin: number;
    totalDistance: number;
}
export declare class PulsedFilamentMonitorConfigured extends ModelObject {
    mmPerPulse: number;
    percentMax: number;
    percentMin: number;
    sampleDistance: number;
}
export default class PulsedFilamentMonitor extends FilamentMonitorBase {
    constructor();
    calibrated: PulsedFilamentMonitorCalibrated | null;
    readonly configured: PulsedFilamentMonitorConfigured;
    update(jsonElement: any): IModelObject | null;
}
