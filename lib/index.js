"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setArrayItem = void 0;
const ModelObject_1 = require("./ModelObject");
const boards_1 = require("./boards");
const state_1 = require("./state");
const ModelCollection_1 = require("./ModelCollection");
const directories_1 = require("./directories");
const fans_1 = require("./fans");
const heat_1 = require("./heat");
const httpEndpoints_1 = require("./httpEndpoints");
const InputChannel_1 = require("./inputs/InputChannel");
const job_1 = require("./job");
const limits_1 = require("./limits");
const messages_1 = require("./messages");
const move_1 = require("./move");
const plugins_1 = require("./plugins");
const scanner_1 = require("./scanner");
const sensors_1 = require("./sensors");
const spindles_1 = require("./spindles");
const userSessions_1 = require("./userSessions");
const volumes_1 = require("./volumes");
// Unfortunately we need to define a way to update arrays to remain compatible with Vue 2 (due to IE11).
// This will become obsolete as soon as DWC is upgraded to Vue 3, but that isn't going to happen anytime soon.
// Until then a Vue 2 user would have to call something like this on initialization to work around this limitation:
// globalThis._duetModelSetArray = (array, index, value) => Vue.set(array, index, value);
globalThis._duetModelSetArray = (array, index, value) => array[index] = value;
function setArrayItem(array, index, value) {
    globalThis._duetModelSetArray(array, index, value);
}
exports.setArrayItem = setArrayItem;
class ObjectModel extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.boards = new ModelCollection_1.default(boards_1.default);
        this.directories = new directories_1.default();
        this.fans = new ModelCollection_1.default(fans_1.default);
        this.global = new Map();
        this.heat = new heat_1.default();
        this.httpEndpoints = new ModelCollection_1.default(httpEndpoints_1.default);
        this.inputs = new ModelCollection_1.default(InputChannel_1.default);
        this.job = new job_1.default();
        this.limits = new limits_1.default();
        this.messages = new ModelCollection_1.default(messages_1.default); // must be manually cleared after updates
        this.move = new move_1.default();
        this.plugins = new ModelCollection_1.default(plugins_1.default);
        this.scanner = new scanner_1.default();
        this.sensors = new sensors_1.default();
        this.spindles = new ModelCollection_1.default(spindles_1.default);
        this.state = new state_1.default();
        this.userSessions = new ModelCollection_1.default(userSessions_1.default);
        this.volumes = new ModelCollection_1.default(volumes_1.default);
    }
}
exports.default = ObjectModel;
