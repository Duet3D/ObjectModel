"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
const BoardState_1 = require("./BoardState");
class Board extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.accelerometer = null;
        this.bootloaderFileName = null;
        this.canAddress = 0;
        this.directDisplay = null;
        this.firmwareDate = "";
        this.firmwareFileName = "";
        this.firmwareVersion = "";
        this.iapFileNameSBC = null;
        this.iapFileNameSD = null;
        this.maxHeaters = 0;
        this.maxMotors = 0;
        this.mcuTemp = null;
        this.name = "";
        this.shortName = "";
        this.state = BoardState_1.BoardState.unknown;
        this.supportsDirectDisplay = false;
        this.uniqueId = null;
        this.v12 = null;
        this.vIn = null;
    }
}
exports.default = Board;
