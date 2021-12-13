import ModelObject from "../ModelObject";
export default class Limits extends ModelObject {
    axes: number | null;
    axesPlusExtruders: number | null;
    bedHeaters: number | null;
    boards: number | null;
    chamberHeaters: number | null;
    drivers: number | null;
    driversPerAxis: number | null;
    extruders: number | null;
    extrudersPerTool: number | null;
    fans: number | null;
    gpInPorts: number | null;
    gpOutPorts: number | null;
    heaters: number | null;
    heatersPerTool: number | null;
    monitorsPerHeater: number | null;
    restorePoints: number | null;
    sensors: number | null;
    spindles: number | null;
    tools: number | null;
    trackedObjects: number | null;
    triggers: number | null;
    volumes: number | null;
    workplaces: number | null;
    zProbeProgramBytes: number | null;
    zProbes: number | null;
}
