import ModelObject, { type IModelObject } from "../../ModelObject";
import { getKinematics } from "./index";

// Values are the spellings DSF reports, which are inconsistently capitalized
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

/**
 * Convert a kinematics name as reported by RepRapFirmware or DSF to the corresponding enum value.
 * RRF 3.7 reports normalized names (linearDelta, scara) whereas DSF and older firmware report
 * capitalized ones (delta, Scara), so both spellings must be accepted
 * @param name Reported kinematics name
 */
export function parseKinematicsName(name: string): KinematicsName {
    switch (name.toLowerCase()) {
        case "cartesian": return KinematicsName.cartesian;
        case "corexy": return KinematicsName.coreXY;
        case "corexyu": return KinematicsName.coreXYU;
        case "corexyuv": return KinematicsName.coreXYUV;
        case "corexz": return KinematicsName.coreXZ;
        case "markforged": return KinematicsName.markForged;
        case "fivebarscara": return KinematicsName.fiveBarScara;
        case "hangprinter": return KinematicsName.hangprinter;
        case "delta": case "lineardelta": return KinematicsName.linearDelta;
        case "polar": return KinematicsName.polar;
        case "rotary delta": case "rotarydelta": return KinematicsName.rotaryDelta;
        case "scara": return KinematicsName.scara;
        default: return KinematicsName.unknown;
    }
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

    override update(jsonElement: any, authoritative: boolean = false): IModelObject | null {
        if (jsonElement === null) {
            throw new Error("Kinematics must not be null");
        }

        if (typeof jsonElement.name === "string") {
            const name = parseKinematicsName(jsonElement.name);
            if (this.name !== name) {
                return getKinematics(name).update(jsonElement, authoritative);
            }

            // The generic update assigns strings verbatim, so the reported spelling must be normalized first
            jsonElement = { ...jsonElement, name };
        }
        return super.update(jsonElement, authoritative);
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
