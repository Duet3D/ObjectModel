import { IModelObject, isModelObject } from "./ModelObject";

/**
 * Dictionary class to map object model data
 */
export class ModelDictionary<T> extends Map<string, T | null> implements IModelObject {
    private readonly nullDeletesKeys: boolean;
    private readonly itemConstructor: { new(): T } | null;

    /**
     * Constructor of this class
     * @param nullDeletesKeys Whether setting null to items effectively deletes them
     * @param itemConstructor Item constructor type to use for type-checking
     */
    constructor(nullDeletesKeys: boolean, itemConstructor: { new(): T } | null = null) {
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
    override set(key: string, value: T | null): this {
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
                const newItem: T = new this.itemConstructor();
                if (isModelObject(newItem)) {
                    const updatedItem: any = newItem.update(value);
                    return super.set(key, updatedItem as T | null);
                }
            }
        } else if (isModelObject(currentItem)) {
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
    update(jsonElement: any): IModelObject | null {
        if (jsonElement === null) {
            this.clear();
        } else if (jsonElement instanceof Map) {
            for (const [key, value] of jsonElement.entries()) {
                this.set(key, value as T | null);
            }
        } else {
            for (const [key, value] of Object.entries(jsonElement)) {
                this.set(key, value as T | null);
            }
        }
        return this;
    }

    /**
     * Convert this object to JSON
     * @returns JSON object
     */
    toJSON() {
        const json: Record<string, T | null> = {};
        for (const [key, value] of this) {
            json[key] = value;
        }
        return json;
    }
}

export default ModelDictionary

/**
 * Initialize a model dictionary from the given data
 * @param nullDeletesKeys Defines whether setting values to null deletes the corresponding key
 * @param itemConstructor Item constructor
 * @param data Data to assign
 * @returns Initialized model dictionary
 */
export function initDictionary<T>(nullDeletesKeys: boolean, itemConstructor: { new(): T }, data: Record<string, { [Property in keyof T]?: T[Property]; }>): ModelDictionary<T> {
	const result = new ModelDictionary(nullDeletesKeys, itemConstructor);
	for (let key in data) {
		const item = new itemConstructor();
		if (isModelObject(item)) {
			item.update(data[key]);
			result.set(key, item);
		} else {
			result.set(key, data[key] as T);
		}
	}
	return result;
}
