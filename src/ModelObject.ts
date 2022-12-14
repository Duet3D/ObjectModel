import { setArrayItem } from "./index";

/**
 * Interface for updating model objects using JSON data
 */
export interface IModelObject {
    /**
     * Update this instance from the given data
     * @param jsonElement JSON data to upgrade this instance from
     * @returns Updated instance (may not equal the original instance)
     */
    update(jsonElement: any): IModelObject | null;
}

/**
 * Check whether a given value provides model update functionality
 * @param value Value to check
 */
export function isModelObject(value: any): value is IModelObject {
    return (value instanceof Object) && (value as IModelObject).update !== undefined;
}

/**
 * Base class for object model classes
 */
export abstract class ModelObject implements IModelObject {
    /**
     * Update this instance from the given data
     * @param jsonElement JSON data to upgrade this instance from
     * @returns Updated instance (may not equal the original instance)
     */
    public update(jsonElement: any): IModelObject | null {
        if (jsonElement === null) {
            return null;
        }

        for (const [key, value] of Object.entries(jsonElement)) {
            if (key in this) {
                const ownKey = key as keyof this;
                const prop = this[ownKey];

                 if (prop === null || value === null) {
                    // Unfortunately we cannot do type checks during runtime without excessive extra work and possibly
                    // third-party libraries, so skip them for null values until there is a better solution.
                    // FWIW, we would need something like "typeof prop" but TS does not seem to be capable of providing this (yet).
                    this[ownKey] = value as any;
                 } else if (isModelObject(prop)) {
                    // Update model objects
                    const updatedObject = prop.update(value);
                    if (prop !== updatedObject) {
                        const propDescriptor = Object.getOwnPropertyDescriptor(this, key);
                        if (propDescriptor !== undefined) {
                            if (propDescriptor.writable) {
                                this[ownKey] = updatedObject as any;
                            } else if (propDescriptor.set !== undefined) {
                                propDescriptor.set(updatedObject);
                            } else if (process.env.NODE_ENV !== "production") {
                                console.warn(`Model object ${key} changed but it could not be set due to missing setter`);
                            }
						} else if (process.env.NODE_ENV !== "production") {
	                        console.warn(`Model object ${key} changed but it lacks the property descriptor`);
                        }
                    }
                } else if (prop instanceof Array) {
	                 if (value instanceof Array) {
		                 // Remove deleted items
		                 prop.splice(value.length);

		                 // Update existing items
		                 for (let i = 0; i < Math.min(prop.length, value.length); i++) {
			                 const propItem = prop[i];
			                 if (propItem === null) {
				                 setArrayItem(prop, i, value[i]);
			                 } else {
				                 const newItem = value[i];
				                 if (propItem !== newItem) {
					                 setArrayItem(prop, i, newItem);
				                 }
			                 }
		                 }

		                 // Add new items
		                 for (let i = prop.length; i < value.length; i++) {
			                 prop.push(value[i]);
		                 }
	                 } else if (process.env.NODE_ENV !== "production") {
		                 console.warn(`Model array ${key} could not be changed because the target type ${typeof value} is invalid`);
	                 }
                } else if (prop instanceof Set) {
					 if (value instanceof Array || value instanceof Set) {
						 // Remove deleted items
						 for (let item of new Set(prop)) {
							 if (!prop.has(item)) {
								 prop.delete(item);
							 }
						 }

						 // Add new items
						 for (let item of value) {
							 if (!prop.has(item)) {
								 prop.add(item);
							 }
						 }
					 } else if (process.env.NODE_ENV !== "production") {
						 console.warn(`Model set ${key} could not be changed because the target type ${typeof value} is invalid`);
					 }
                } else {
                    const propType = typeof prop;
                    if (propType === "boolean") {
                        if (typeof value === "boolean") {
                            this[ownKey] = value as any;
                        } else if (typeof value === "number" || this.checkDivergingDataType(ownKey, prop, value)) {
                            // RRF used to report booleans as integers so convert them if necessary
                            this[ownKey] = Boolean(value) as any;
                        } else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible bool target type ${typeof value} for property ${key}`);
                        }
                    } else if (propType === "number") {
                        if (typeof value === "number" || typeof value === "bigint" || this.checkDivergingDataType(ownKey, prop, value)) {
                            this[ownKey] = value as any;
                        } else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible number target type ${typeof value} for property ${key}`);
                        }
                    } else if (propType === "bigint") {
                        if (typeof value === "number" || typeof value === "bigint" || this.checkDivergingDataType(ownKey, prop, value)) {
                            this[ownKey] = value as any;
                        } else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible bigint target type ${typeof value} for property ${key}`);
                        }
                    } else if (propType === "string") {
                        if (typeof value === "string" || this.checkDivergingDataType(ownKey, prop, value)) {
                            this[ownKey] = value as any;
                        } else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible string target type ${typeof value} for property ${key}`);
                        }
                    } else if (propType === "function") {
                        if (typeof value === "function" || this.checkDivergingDataType(ownKey, prop, value)) {
                            this[ownKey] = value as any;
                        } else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible function target type ${typeof value} for property ${key}`);
                        }
                    } else if (propType === "object") {
                        if (typeof value === "object" || this.checkDivergingDataType(ownKey, prop, value)) {
                            this[ownKey] = value as any;
                        } else if (process.env.NODE_ENV !== "production") {
                            console.warn(`Incompatible object target type ${typeof value} for property ${key}`);
                        }
                    } else if (process.env.NODE_ENV !== "production") {
                        console.warn(`Incompatible type ${propType} for property ${key} (${typeof value})`);
                    }
                }
            }
        }
        return this;
    }

    /**
     * Called to check if a diverging property type may be set.
     * Note that this is not applicable to null values; null is always legit
     * @param key Property key
     * @param oldValue Old member value
     * @param newValue New member value
     * @returns True if the value can be set by the update call
     */
    protected checkDivergingDataType<K extends keyof this>(key: K, oldValue: typeof this[K], newValue: any): boolean {
        return false;
    }

    /**
     * Wrap a nullable model object property so that type checks can be performed
     * @param key Property key of the derived class
     * @param constructor Constructor for creating new elements
     */
    protected wrapModelProperty<K extends keyof this, T extends IModelObject>(key: K, constructor: { new(): T }): void {
        let propertyValue: any = this[key];
        Object.defineProperty(this, key, {
            get() { return propertyValue; },
            set(newValue) {
                if (newValue === null) {
                    propertyValue = null;
                } else if (propertyValue !== null) {
                    const newModel = propertyValue.update(newValue);
                    if (propertyValue !== newModel) {
                        propertyValue = newModel;
                    }
                } else {
                    const newModel = new constructor();
                    propertyValue = newModel.update(newValue);
                }
            },
            configurable: true,
            enumerable: true
        });
    }
}

export default ModelObject

/**
 * Initialize a model object from the given data
 * @param itemType Model type to create
 * @param data Data to assign
 * @returns Initialized model instance
 */
export function initObject<T>(itemType: { new(): T }, data: { [Property in keyof T]?: T[Property]; }): T {
	const result = new itemType();
	for (let key in data) {
		const resultKey = result[key];
		if (isModelObject(resultKey)) {
			const updatedObject = resultKey.update(data[key]);
			if (resultKey !== updatedObject) {
				const propDescriptor = Object.getOwnPropertyDescriptor(result, key);
				if (propDescriptor !== undefined) {
					if (propDescriptor.writable) {
						result[key] = updatedObject as any;
					} else if (propDescriptor.set !== undefined) {
						propDescriptor.set(updatedObject);
					} else if (process.env.NODE_ENV !== "production") {
						console.warn(`Model object ${key} changed but it could not be set due to missing setter`);
					}
				} else if (process.env.NODE_ENV !== "production") {
					console.warn(`Model object ${key} changed but it lacks the property descriptor`);
				}
			}
		} else {
			result[key] = data[key]!;
		}
	}
	return result;
}

