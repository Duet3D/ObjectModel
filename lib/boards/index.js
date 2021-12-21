"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectDisplay = exports.MinMaxCurrent = exports.BoardState = exports.Accelerometer = void 0;
const ModelObject_1 = require("../ModelObject");
class Accelerometer extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.points = 0;
        this.runs = 0;
    }
}
exports.Accelerometer = Accelerometer;
var BoardState;
(function (BoardState) {
    BoardState["unknown"] = "unknown";
    BoardState["flashing"] = "flashing";
    BoardState["flashFailed"] = "flashFailed";
    BoardState["resetting"] = "resetting";
    BoardState["running"] = "running";
})(BoardState = exports.BoardState || (exports.BoardState = {}));
class MinMaxCurrent extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.current = 0;
        this.min = 0;
        this.max = 0;
    }
}
exports.MinMaxCurrent = MinMaxCurrent;
class DirectDisplay extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.pulsesPerClick = 0;
        this.spiFreq = 0;
        this.typeName = "";
    }
}
exports.DirectDisplay = DirectDisplay;
class Board extends ModelObject_1.default {
    constructor() {
        super();
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
        this.state = BoardState.unknown;
        this.supportsDirectDisplay = false;
        this.uniqueId = null;
        this.v12 = null;
        this.vIn = null;
        this.wrapModelProperty("accelerometer", Accelerometer);
        this.wrapModelProperty("directDisplay", DirectDisplay);
        this.wrapModelProperty("mcuTemp", MinMaxCurrent);
        this.wrapModelProperty("v12", MinMaxCurrent);
        this.wrapModelProperty("vIn", MinMaxCurrent);
    }
}
exports.default = Board;
