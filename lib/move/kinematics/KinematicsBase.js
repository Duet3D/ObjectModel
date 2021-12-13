"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZLeadscrewKinematics = exports.TiltCorrection = exports.MoveSegmentation = exports.KinematicsName = void 0;
const ModelObject_1 = require("../../ModelObject");
var KinematicsName;
(function (KinematicsName) {
    KinematicsName["cartesian"] = "cartesian";
    KinematicsName["coreXY"] = "corexy";
    KinematicsName["coreXYU"] = "corexyu";
    KinematicsName["coreXYUV"] = "corexyuv";
    KinematicsName["coreXZ"] = "corexz";
    KinematicsName["markForged"] = "markforged";
    KinematicsName["fiveBarScara"] = "fivebarscara";
    KinematicsName["hangprinter"] = "hangprinter";
    KinematicsName["delta"] = "delta";
    KinematicsName["polar"] = "polar";
    KinematicsName["rotaryDelta"] = "rotary delta";
    KinematicsName["scara"] = "scara";
    KinematicsName["unknown"] = "unknown";
})(KinematicsName = exports.KinematicsName || (exports.KinematicsName = {}));
class MoveSegmentation extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.segmentsPerSec = 0;
        this.minSegmentLength = 0;
    }
}
exports.MoveSegmentation = MoveSegmentation;
class KinematicsBase extends ModelObject_1.default {
    constructor(name) {
        super();
        this.segmentation = new MoveSegmentation();
        this.name = name;
    }
}
exports.default = KinematicsBase;
class TiltCorrection extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.correctionFactor = 0;
        this.lastCorrections = [];
        this.maxCorrection = 0;
        this.screwPitch = 0;
        this.screwX = [];
        this.screwY = [];
    }
}
exports.TiltCorrection = TiltCorrection;
class ZLeadscrewKinematics extends KinematicsBase {
    constructor() {
        super(...arguments);
        this.tiltCorrection = new TiltCorrection();
    }
}
exports.ZLeadscrewKinematics = ZLeadscrewKinematics;
