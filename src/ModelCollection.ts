import { isModelObject } from "./ModelObject";
import type { IModelObject } from "./ModelObject";

/**
 * Internal interface for the model collection class
 */
interface IModelCollection<T> {
    $itemConstructor: { new(): T };
    $itemFactory: ItemFactory<T> | null;
}

/**
 * Factory creating the item for a given index
 */
export type ItemFactory<T> = (index: number) => T;

/**
 * Create the item for a given index. This is deliberately not a method of the collection because
 * a non-public member would make the class nominally typed, which breaks assignability of the
 * reactive proxies consumers wrap the object model in
 * @param collection Collection the item is created for
 * @param index Index the new item is going to be stored at
 * @returns New item
 */
function createItem<T>(collection: IModelCollection<T>, index: number): T {
    return (collection.$itemFactory !== null) ? collection.$itemFactory(index) : new collection.$itemConstructor();
}

/**
 * Class for storing model object items in an array
 */
export class ModelCollection<T extends IModelObject | null> extends Array<T> implements IModelObject {
    /**
     * Derived arrays from filter, map, slice etc. would otherwise be constructed as
     * new ModelCollection(length), leaving $itemConstructor set to a number
     */
    static override get [Symbol.species](): ArrayConstructor {
        return Array;
    }

    /**
     * Constructor of this class
     * @param itemConstructor Item constructor type that items must derive from
     * @param itemFactory Factory to use for collections whose item class depends on the position, e.g. boards
     */
    constructor(itemConstructor: { new(): T }, itemFactory: ItemFactory<T> | null = null) {
        super();
        Object.setPrototypeOf(this, ModelCollection.prototype);

        Object.defineProperty(this, "$itemConstructor", { enumerable: false, value: itemConstructor });
        Object.defineProperty(this, "$itemFactory", { enumerable: false, value: itemFactory });
    }

    // Unfortunately it isn't possible to override index operators in JS/TS

    /**
     * Overridden push method to perform better type checks
     * @param items Items to add
     */
    override push(...items: T[]): number {
        const that = this as any as IModelCollection<T>;

        for (const item of items) {
            if (item === null || item instanceof that.$itemConstructor) {
                super.push(item);
            } else {
                const newItem = createItem(that, this.length);
                super.push(newItem!.update(item) as T);
            }
        }
        return this.length;
    }

    /**
     * Update this instance from the given data
     * @param jsonElement JSON data to upgrade this instance from
     * @param authoritative Whether the given data is a complete snapshot of the items and everything below them
     * @returns Updated instance
     */
    update(jsonElement: any, authoritative: boolean = false): IModelObject | null {
        if (jsonElement === null) {
            return null;
        }
        if (!(jsonElement instanceof Array)) {
            throw new Error(`Invalid JSON element type for model collection ${typeof jsonElement}`);
        }
        const that = this as any as IModelCollection<T>;

        // Remove deleted items
        this.splice(jsonElement.length);

        // Update existing items
        for (let i = 0; i < Math.min(jsonElement.length, this.length); i++) {
            const currentItem = this[i];
            if (currentItem === null) {
                const newItem = jsonElement[i];
                if (newItem instanceof that.$itemConstructor) {
                    this[i] = jsonElement[i];
                } else {
                    const refItem = createItem(that, i);
                    this[i] = refItem!.update(newItem, authoritative) as T;
                }
            } else if (isModelObject(currentItem)) {
                const newItem = currentItem.update(jsonElement[i], authoritative);
                if (currentItem !== newItem) {
                    this[i] = newItem as T;
                }
            } else {
                const newItem = jsonElement[i];
                if (currentItem !== newItem) {
                    this[i] = newItem;
                }
            }
        }

        // Add new items
        for (let i = this.length; i < jsonElement.length; i++) {
			const itemToAdd = jsonElement[i];
			if (itemToAdd === null) {
				super.push(itemToAdd);
			} else {
				const newItem = createItem(that, i);
				super.push(newItem!.update(itemToAdd, authoritative) as T);
			}
        }
        return this;
    }
}

export default ModelCollection

/**
 * Initialize a model collection from the given data
 * @param itemType Item type to create
 * @param data Data to assign
 * @returns Initialized model collection
 */
export function initCollection<T extends IModelObject>(itemType: { new(): T }, data: Array<{ [Property in keyof T]?: T[Property]; }>): ModelCollection<T> {
	const result = new ModelCollection(itemType);
	for (let presetItem of data) {
		const item = new itemType();
		result.push(item.update(presetItem) as any);
	}
	return result;
}
