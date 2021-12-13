import ModelObject from "../ModelObject";
import { MoveDeviations } from "./MoveCalibration";
export declare class ProbeGrid extends ModelObject {
    axes: Array<string>;
    maxs: Array<number>;
    mins: Array<number>;
    radius: number;
    spacings: Array<number>;
}
export declare class Skew extends ModelObject {
    compensateXY: boolean;
    tanXY: number;
    tanXZ: number;
    tanYZ: number;
}
export declare enum MoveCompensationType {
    none = "none",
    mesh = "mesh"
}
export default class MoveCompensation extends ModelObject {
    fadeHeight: number | null;
    file: string | null;
    liveGrid: ProbeGrid | null;
    meshDeviation: MoveDeviations;
    readonly probeGrid: ProbeGrid;
    readonly skew: Skew;
    type: MoveCompensationType;
}
