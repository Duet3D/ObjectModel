import { IModelObject, isModelObject } from "./ModelObject";

/**
 * Dictionary class to map object model data
 */
export default class ModelDictionary<T> extends Map<string, T | null> implements IModelObject {
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
        } else {
            for (const [key, value] of Object.entries(jsonElement)) {
                this.set(key, value as T | null);
            }
        }
        return this;
    }
}
