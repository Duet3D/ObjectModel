"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelObject_1 = require("../ModelObject");
class DriverId extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.board = 0;
        this.driver = 0;
    }
    update(jsonElement) {
        if (typeof jsonElement === "string") {
            const matches = /(\d+)\.(\d+)/.exec(jsonElement);
            if (matches !== null) {
                this.board = Number(matches[1]);
                this.driver = Number(matches[2]);
            }
            else {
                this.board = 0;
                this.driver = Number(jsonElement);
            }
            return this;
        }
        return null;
    }
}
exports.default = DriverId;
