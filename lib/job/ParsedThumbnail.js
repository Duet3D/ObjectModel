"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class ParsedThumbnail extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.encodedImage = "";
        this.height = 0;
        this.width = 0;
    }
}
exports.default = ParsedThumbnail;
