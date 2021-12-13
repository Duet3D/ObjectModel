import ModelObject from "../../ModelObject";
import FilamentMonitorBase, { FilamentMonitorType } from "./FilamentMonitorBase";

export class PulsedFilamentMonitorCalibrated extends ModelObject {
    mmPerPulse: number = 0;
    percentMax: number = 0;
    percentMin: number = 0;
    totalDistance: number = 0;
}

export class PulsedFilamentMonitorConfigured extends ModelObject {
    mmPerPulse: number = 0;
    percentMax: number = 0;
    percentMin: number = 0;
    sampleDistance: number = 0;
}

export default class PulsedFilamentMonitor extends FilamentMonitorBase {
    calibrated: PulsedFilamentMonitorCalibrated | null = new PulsedFilamentMonitorCalibrated();
    readonly configured: PulsedFilamentMonitorConfigured = new PulsedFilamentMonitorConfigured();

    constructor() {
        super(FilamentMonitorType.pulsed);
    }
}