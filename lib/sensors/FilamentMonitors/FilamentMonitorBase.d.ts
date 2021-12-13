import ModelObject from "../../ModelObject";
export declare enum FilamentMonitorStatus {
    noMonitor = "noMonitor",
    ok = "ok",
    noDataReceived = "noDataReceived",
    noFilament = "noFilament",
    tooLittleMovement = "tooLittleMovement",
    tooMuchMovement = "tooMuchMovement",
    sensorError = "sensorError"
}
export declare enum FilamentMonitorType {
    simple = "simple",
    laser = "laser",
    pulsed = "pulsed",
    rotatingMagnet = "rotatingMagnet",
    unknown = "unknown"
}
export default class FilamentMonitorBase extends ModelObject {
    enabled: boolean;
    status: FilamentMonitorStatus;
    type: FilamentMonitorType;
    constructor(type?: FilamentMonitorType);
}
