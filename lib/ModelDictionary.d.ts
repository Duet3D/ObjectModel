import { IModelObject } from "./ModelObject";
/**
 * Dictionary class to map object model data
 */
export declare class ModelDictionary<T> extends Map<string, T | null> implements IModelObject {
    private readonly nullDeletesKeys;
    private readonly itemConstructor;
    /**
     * Constructor of this class
     * @param nullDeletesKeys Whether setting null to items effectively deletes them
     * @param itemConstructor Item constructor type to use for type-checking
     */
    constructor(nullDeletesKeys: boolean, itemConstructor?: {
        new (): T;
    } | null);
    /**
     * Overridden set method to perform type-checks and update
     * @param key Key to set
     * @param value Value to set
     */
    set(key: string, value: T | null): this;
    /**
     * Update this instance from the given data
     * @param jsonElement JSON data to upgrade this instance from
     * @returns Updated instance
     */
    update(jsonElement: any): IModelObject | null;
}
