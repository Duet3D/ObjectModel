import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import AnalogSensor from "./AnalogSensor";
import Endstop from "./Endstop";
import FilamentMonitor from "./FilamentMonitors";
import Probe from "./Probe";

export class GpInputPort extends ModelObject {
    value: number = 0;
}

export default class Sensors extends  ModelObject {
    readonly analog: ModelCollection<AnalogSensor> = new ModelCollection(AnalogSensor);
    readonly endstops: ModelCollection<Endstop> = new ModelCollection(Endstop);
    readonly filamentMonitors: ModelCollection<FilamentMonitor> = new ModelCollection(FilamentMonitor);
    readonly gpIn: ModelCollection<GpInputPort> = new ModelCollection(GpInputPort);
    readonly probes: ModelCollection<Probe> = new ModelCollection(Probe);
}

export * from "./FilamentMonitors";
export * from "./AnalogSensor";
export * from "./Endstop";
export * from "./Probe";
