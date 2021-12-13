"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class Volume extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.capacity = null;
        this.freeSpace = null;
        this.mounted = false;
        this.name = null;
        this.openFiles = null;
        this.path = null;
        this.speed = null;
    }
}
exports.default = Volume;
