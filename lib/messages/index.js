"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
const ModelObject_1 = require("../ModelObject");
var MessageType;
(function (MessageType) {
    MessageType[MessageType["success"] = 0] = "success";
    MessageType[MessageType["warning"] = 1] = "warning";
    MessageType[MessageType["error"] = 2] = "error";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class Message extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.content = "";
        this.time = new Date();
        this.type = MessageType.success;
    }
    toString() {
        switch (this.type) {
            case MessageType.success: return this.content;
            case MessageType.warning: return "Warning: " + this.content;
            case MessageType.error: return "Error: " + this.content;
        }
    }
}
exports.default = Message;
