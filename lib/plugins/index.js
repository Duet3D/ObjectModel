"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PluginManifest_1 = require("./PluginManifest");
class Plugin extends PluginManifest_1.default {
    constructor() {
        super(...arguments);
        this.dsfFiles = [];
        this.dwcFiles = [];
        this.sdFiles = [];
        this.pid = -1;
    }
}
exports.default = Plugin;
