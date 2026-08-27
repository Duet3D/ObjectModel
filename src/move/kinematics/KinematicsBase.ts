import ModelObject from "../../ModelObject";

// Values are the spellings reported by RepRapFirmware, which are inconsistently capitalized
export enum KinematicsName {
    cartesian = "cartesian",
    coreXY = "coreXY",
    coreXYU = "coreXYU",
    coreXYUV = "coreXYUV",
    coreXZ = "coreXZ",
    markForged = "markForged",
    fiveBarScara = "FiveBarScara",
    hangprinter = "Hangprinter",
    linearDelta = "delta",
    polar = "Polar",
    rotaryDelta = "Rotary delta",
    scara = "Scara",
    unknown = "unknown"
}

export class MoveSegmentation extends ModelObject {
    segmentsPerSec: number = 0;
    minSegLength: number = 0;
}

export abstract class KinematicsBase extends ModelObject {
    readonly name: KinematicsName;
    segmentation: MoveSegmentation | null = null;

    constructor(name: KinematicsName) {
        super();
        this.name = name;
        ModelObject.wrapModelProperty(this, "segmentation", MoveSegmentation);
    }
}

export default KinematicsBase

export class TiltCorrection extends ModelObject {
    correctionFactor: number = 0;
    lastCorrections: Array<number> = [];
    maxCorrection: number = 0;
    screwPitch: number = 0;
    screwX: Array<number> = [];
    screwY: Array<number> = [];
}

export abstract class ZLeadscrewKinematics extends KinematicsBase {
    readonly tiltCorrection: TiltCorrection = new TiltCorrection();
}
