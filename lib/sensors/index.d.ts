import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import AnalogSensor from "./AnalogSensor";
import Endstop from "./Endstop";
import FilamentMonitor from "./FilamentMonitors";
import Probe from "./Probe";
export declare class GpInputPort extends ModelObject {
    value: number;
}
export default class Sensors extends ModelObject {
    readonly analog: ModelCollection<AnalogSensor>;
    readonly endstops: ModelCollection<Endstop>;
    readonly filamentMonitors: ModelCollection<FilamentMonitor>;
    readonly gpIn: ModelCollection<GpInputPort>;
    readonly probes: ModelCollection<Probe>;
}
