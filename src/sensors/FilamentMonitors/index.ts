import ModelObject from "../../ModelObject";
import FilamentMonitorBase, { FilamentMonitorType } from "./FilamentMonitorBase";
import LaserFilamentMonitor from "./LaserFilamentMonitor";
import PulsedFilamentMonitor from "./PulsedFilamentMonitor";
import RotatingMagnetFilamentMonitor from "./RotatingMagnetFilamentMonitor";

export default class FilamentMonitor extends FilamentMonitorBase {
    override update(jsonElement: any): ModelObject | null {
        if (jsonElement === null) {
            return null;
        }

        if (typeof jsonElement.name === "string" && jsonElement.name !== this.type) {
            return getFilamentMonitor(jsonElement.type).update(jsonElement);
        }
        return super.update(jsonElement);
    }
}

export function getFilamentMonitor(type: FilamentMonitorType): FilamentMonitorBase {
    switch (type) {
        case FilamentMonitorType.laser:
            return new LaserFilamentMonitor();
        case FilamentMonitorType.pulsed:
            return new PulsedFilamentMonitor();
        case FilamentMonitorType.rotatingMagnet:
            return new RotatingMagnetFilamentMonitor();
        default:
            return new FilamentMonitor(type);
    }
}
