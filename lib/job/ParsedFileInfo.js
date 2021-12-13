"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
const ModelCollection_1 = require("../ModelCollection");
const ParsedThumbnail_1 = require("./ParsedThumbnail");
class ParsedFileInfo extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.filament = new Array();
        this.fileName = "";
        this.firstLayerHeight = 0;
        this.generatedBy = "";
        this.height = 0;
        this.lastModified = null;
        this.layerHeight = 0;
        this.numLayers = 0;
        this.printTime = null;
        this.simulatedTime = null;
        this.size = 0n;
        this.thumbnails = new ModelCollection_1.default(ParsedThumbnail_1.default);
    }
}
exports.default = ParsedFileInfo;
