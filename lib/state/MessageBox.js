"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBoxMode = void 0;
const ModelObject_1 = require("../ModelObject");
var MessageBoxMode;
(function (MessageBoxMode) {
    MessageBoxMode[MessageBoxMode["noButtons"] = 0] = "noButtons";
    MessageBoxMode[MessageBoxMode["closeOnly"] = 1] = "closeOnly";
    MessageBoxMode[MessageBoxMode["okOnly"] = 2] = "okOnly";
    MessageBoxMode[MessageBoxMode["okCancel"] = 3] = "okCancel";
})(MessageBoxMode = exports.MessageBoxMode || (exports.MessageBoxMode = {}));
class MessageBox extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.axisControls = 0;
        this.message = "";
        this.mode = MessageBoxMode.okOnly;
        this.seq = -1;
        this.timeout = 0;
        this.title = "";
    }
}
exports.default = MessageBox;
