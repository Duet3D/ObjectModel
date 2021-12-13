"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelCollection extends Array {
    constructor(C) {
        super();
        this.itemConstructor = C;
        Object.setPrototypeOf(this, ModelCollection.prototype);
    }
    push(...items) {
        for (const item of items) {
            if (item === null || item instanceof this.itemConstructor) {
                super.push(item);
            }
            else {
                const newItem = new this.itemConstructor();
                newItem.update(item);
                super.push(newItem);
            }
        }
        return this.length;
    }
}
exports.default = ModelCollection;
