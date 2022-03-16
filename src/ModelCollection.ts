import { IModelObject, isModelObject } from "./ModelObject";
import { setArrayItem } from "./index";

/**
 * Class for storing model object items in an array
 */
export default class ModelCollection<T extends IModelObject> extends Array<T> implements IModelObject {
    private readonly itemConstructor: { new(): T };

    /**
     * Constructor of this class
     * @param itemConstructor Item constructor type that items must derive from
     */
    constructor(itemConstructor: { new(): T }) {
        super();
        this.itemConstructor = itemConstructor;

        Object.setPrototypeOf(this, ModelCollection.prototype);
    }

    // Unfortunately it isn't possible to override index operators in JS/TS

    /**
     * Overridden push method to perform better type checks
     * @param items Items to add
     */
    override push(...items: T[]): number {
        for (const item of items) {
            if (item === null || item instanceof this.itemConstructor) {
                super.push(item);
            } else {
                const newItem: T = new this.itemConstructor();
                super.push(newItem.update(item) as T);
            }
        }
        return this.length;
    }

    /**
     * Update this instance from the given data
     * @param jsonElement JSON data to upgrade this instance from
     * @returns Updated instance
     */
    update(jsonElement: any): IModelObject | null {
        if (!(jsonElement instanceof Array)) {
            throw new Error(`Invalid JSON element type for model collection ${typeof jsonElement}`);
        }

        // Remove deleted items
        this.splice(jsonElement.length);

        // Update existing items
        for (let i = 0; i < Math.min(jsonElement.length, this.length); i++) {
            const currentItem = this[i];
            if (currentItem === null) {
                const newItem = jsonElement[i];
                if (newItem instanceof this.itemConstructor) {
                    setArrayItem(this, i, jsonElement[i]);
                } else {
                    const refItem = new this.itemConstructor();
                    setArrayItem(this, i, refItem.update(newItem));
                }
            } else if (isModelObject(currentItem)) {
                const newItem = currentItem.update(jsonElement[i]);
                if (currentItem !== newItem) {
                    setArrayItem(this, i, newItem);
                }
            } else {
                const newItem = jsonElement[i];
                if (currentItem !== newItem) {
                    setArrayItem(this, i, newItem);
                }
            }
        }

        // Add new items
        for (let i = this.length; i < jsonElement.length; i++) {
            this.push(jsonElement[i]);
        }
        return this;
    }
}