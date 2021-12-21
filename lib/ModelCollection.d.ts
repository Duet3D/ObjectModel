import { IModelObject } from "./ModelObject";
/**
 * Class for storing model object items in an array
 */
export default class ModelCollection<T extends IModelObject> extends Array<T> implements IModelObject {
    private readonly itemConstructor;
    /**
     * Constructor of this class
     * @param itemConstructor Item constructor type that items must derive from
     */
    constructor(itemConstructor: {
        new (): T;
    });
    /**
     * Overridden push method to perform better type checks
     * @param items Items to add
     */
    push(...items: T[]): number;
    /**
     * Update this instance from the given data
     * @param jsonElement JSON data to upgrade this instance from
     * @returns Updated instance
     */
    update(jsonElement: any): IModelObject | null;
}
