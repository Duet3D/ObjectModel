"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildObject = void 0;
const ModelObject_1 = require("../ModelObject");
const ModelCollection_1 = require("../ModelCollection");
class BuildObject extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.cancelled = false;
        this.name = null;
        this.x = new Array();
        this.y = new Array();
    }
}
exports.BuildObject = BuildObject;
class Build extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.currentObject = -1;
        this.m486names = false;
        this.m486numbers = false;
        this.objects = new ModelCollection_1.default(BuildObject);
    }
}
exports.default = Build;
