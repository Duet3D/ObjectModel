"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelDictionary = void 0;
const ModelObject_1 = require("./ModelObject");
/**
 * Dictionary class to map object model data
 */
class ModelDictionary extends Map {
    /**
     * Constructor of this class
     * @param nullDeletesKeys Whether setting null to items effectively deletes them
     * @param itemConstructor Item constructor type to use for type-checking
     */
    constructor(nullDeletesKeys, itemConstructor = null) {
        super();
        this.itemConstructor = itemConstructor;
        this.nullDeletesKeys = nullDeletesKeys;
        Object.setPrototypeOf(this, ModelDictionary.prototype);
    }
    /**
     * Overridden set method to perform type-checks and update
     * @param key Key to set
     * @param value Value to set
     */
    set(key, value) {
        if (value === null) {
            if (this.nullDeletesKeys) {
                this.delete(key);
                return this;
            }
            return super.set(key, value);
        }
        const currentItem = this.get(key);
        if (currentItem == null) {
            if (this.itemConstructor !== null && !(value instanceof this.itemConstructor)) {
                const newItem = new this.itemConstructor();
                if ((0, ModelObject_1.isModelObject)(newItem)) {
                    const updatedItem = newItem.update(value);
                    return super.set(key, updatedItem);
                }
            }
        }
        else if ((0, ModelObject_1.isModelObject)(currentItem)) {
            const newItem = currentItem.update(value);
            if (currentItem !== newItem) {
                return super.set(key, value);
            }
        }
        return super.set(key, value);
    }
    /**
     * Update this instance from the given data
     * @param jsonElement JSON data to upgrade this instance from
     * @returns Updated instance
     */
    update(jsonElement) {
        if (jsonElement === null) {
            this.clear();
        }
        else {
            for (const [key, value] of Object.entries(jsonElement)) {
                this.set(key, value);
            }
        }
        return this;
    }
}
exports.ModelDictionary = ModelDictionary;
