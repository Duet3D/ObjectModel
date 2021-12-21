import ModelObject, { IModelObject } from "../../ModelObject";
import FilamentMonitorBase, { FilamentMonitorType } from "./FilamentMonitorBase";
import { getFilamentMonitor } from "./index";

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
    constructor() {
        super(FilamentMonitorType.pulsed);
        this.wrapModelProperty("calibrated", PulsedFilamentMonitorCalibrated);
    }

    calibrated: PulsedFilamentMonitorCalibrated | null = new PulsedFilamentMonitorCalibrated();
    readonly configured: PulsedFilamentMonitorConfigured = new PulsedFilamentMonitorConfigured();

    override update(jsonElement: any): IModelObject | null {
        if (jsonElement === null) {
            return null;
        }

        if (typeof jsonElement.type === "string" && jsonElement.type !== this.type) {
            return getFilamentMonitor(jsonElement.type).update(jsonElement);
        }
        return super.update(jsonElement);
    }
}