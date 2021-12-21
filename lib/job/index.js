"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesLeft = exports.Layer = void 0;
const Build_1 = require("./Build");
const ModelCollection_1 = require("../ModelCollection");
const ModelObject_1 = require("../ModelObject");
const ParsedFileInfo_1 = require("./ParsedFileInfo");
class Layer extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.duration = 0;
        this.filament = new Array();
        this.fractionPrinted = 0;
        this.height = 0;
        this.temperatures = new Array();
    }
}
exports.Layer = Layer;
class TimesLeft extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.filament = null;
        this.file = null;
        this.layer = null;
        this.slicer = null;
    }
}
exports.TimesLeft = TimesLeft;
class Job extends ModelObject_1.default {
    constructor() {
        super();
        this.build = new Build_1.default();
        this.duration = null;
        this.file = null;
        this.filePosition = null;
        this.lastDuration = null;
        this.lastFileName = null;
        this.lastFileAborted = false;
        this.lastFileCancelled = false;
        this.lastFileSimulated = false;
        this.layer = null;
        this.layers = new ModelCollection_1.default(Layer);
        this.layerTime = null;
        this.pauseDuration = null;
        this.rawExtrusion = null;
        this.timesLeft = new TimesLeft();
        this.warmUpDuration = null;
        this.wrapModelProperty("build", Build_1.default);
        this.wrapModelProperty("file", ParsedFileInfo_1.default);
    }
}
exports.default = Job;
