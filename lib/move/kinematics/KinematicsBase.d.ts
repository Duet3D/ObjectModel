import ModelObject from "../../ModelObject";
export declare enum KinematicsName {
    cartesian = "cartesian",
    coreXY = "corexy",
    coreXYU = "corexyu",
    coreXYUV = "corexyuv",
    coreXZ = "corexz",
    markForged = "markforged",
    fiveBarScara = "fivebarscara",
    hangprinter = "hangprinter",
    delta = "delta",
    polar = "polar",
    rotaryDelta = "rotary delta",
    scara = "scara",
    unknown = "unknown"
}
export declare class MoveSegmentation extends ModelObject {
    segmentsPerSec: number;
    minSegmentLength: number;
}
export default abstract class KinematicsBase extends ModelObject {
    readonly name: KinematicsName;
    readonly segmentation: MoveSegmentation;
    constructor(name: KinematicsName);
}
export declare class TiltCorrection extends ModelObject {
    correctionFactor: number;
    lastCorrections: Array<number>;
    maxCorrection: number;
    screwPitch: number;
    screwX: Array<number>;
    screwY: Array<number>;
}
export declare abstract class ZLeadscrewKinematics extends KinematicsBase {
    readonly tiltCorrection: TiltCorrection;
}
