"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class ModelObject {
    // Update this element from an arbitrary JSON object
    update(jsonElement) {
        if (jsonElement === null) {
            return null;
        }
        for (const [key, value] of Object.entries(jsonElement)) {
            if (key in this) {
                const ownKey = key;
                const prop = this[ownKey];
                if (prop instanceof ModelObject) {
                    // Update model objects
                    const updatedObject = prop.update(value);
                    if (prop !== updatedObject) {
                        const propDescriptor = Object.getOwnPropertyDescriptor(this, key);
                        if (propDescriptor !== undefined && propDescriptor.set !== undefined) {
                            this[ownKey] = updatedObject;
                        }
                        else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Model object ${key} changed but it could not be set due to missing setter`);
                        }
                    }
                }
                else if (prop instanceof Array) {
                    if (value instanceof Array) {
                        // Remove deleted items
                        prop.splice(value.length);
                        // Update existing items
                        for (let i = 0; i < Math.min(prop.length, value.length); i++) {
                            const propItem = prop[i];
                            if (propItem === null) {
                                (0, index_1.setArrayItem)(prop, i, value[i]);
                            }
                            else if (propItem instanceof ModelObject) {
                                const newItem = propItem.update(value[i]);
                                if (propItem !== newItem) {
                                    (0, index_1.setArrayItem)(prop, i, newItem);
                                }
                            }
                            else {
                                const newItem = value[i];
                                if (propItem !== newItem) {
                                    (0, index_1.setArrayItem)(prop, i, newItem);
                                }
                            }
                        }
                        // Add new items
                        for (let i = prop.length; i < value.length; i++) {
                            prop.push(value[i]);
                        }
                    }
                    else if (process.env.NODE_ENV !== "production") {
                        console.warn(`Model object ${key} changed but it could not be set due to missing setter`);
                    }
                }
                else if (prop === null) {
                    // Unfortunately we cannot do type checks during runtime without excessive extra work and possibly
                    // third-party libraries, so skip them for null values until there is a better solution.
                    // FWIW, we would just need "typeof prop" but TS does not seem to be capable of providing this.
                    this[ownKey] = value;
                }
                else {
                    const propType = typeof prop;
                    if (propType === "boolean") {
                        if (typeof value === "boolean") {
                            this[ownKey] = value;
                        }
                        else if (typeof value === "number") {
                            // RRF used to report booleans as integers so convert them if necessary
                            this[ownKey] = Boolean(value);
                        }
                        else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible bool target type ${typeof value} for property ${key}`);
                        }
                    }
                    else if (propType === "number") {
                        if (typeof value === "number") {
                            this[ownKey] = value;
                        }
                        else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible number target type ${typeof value} for property ${key}`);
                        }
                    }
                    else if (propType === "bigint") {
                        if (typeof value === "number" || typeof value === "bigint") {
                            this[ownKey] = value;
                        }
                        else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible bigint target type ${typeof value} for property ${key}`);
                        }
                    }
                    else if (propType === "string") {
                        if (typeof value === "string") {
                            this[ownKey] = value;
                        }
                        else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible string target type ${typeof value} for property ${key}`);
                        }
                    }
                    else if (process.env.NODE_ENV !== "production") {
                        console.warn(`Incompatible type ${propType} to for property {key} (${typeof value})`);
                    }
                }
            }
        }
        return this;
    }
}
exports.default = ModelObject;
