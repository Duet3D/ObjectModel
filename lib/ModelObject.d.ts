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
export declare function isModelObject(value: any): value is IModelObject;
/**
 * Base class for object model classes
 */
export default abstract class ModelObject implements IModelObject {
    /**
     * Update this instance from the given data
     * @param jsonElement JSON data to upgrade this instance from
     * @returns Updated instance (may not equal the original instance)
     */
    update(jsonElement: any): IModelObject | null;
    /**
     * Wrap a nullable model object property so that type checks can be performed
     * @param key Property key of the derived class
     * @param constructor Constructor for creating new elements
     */
    wrapModelProperty<K extends keyof this, T extends IModelObject>(key: K, constructor: {
        new (): T;
    }): void;
}
