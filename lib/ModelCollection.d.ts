import ModelObject from "./ModelObject";
export default class ModelCollection<T extends ModelObject> extends Array<T> {
    private readonly itemConstructor;
    constructor(C: {
        new (): T;
    });
    push(...items: T[]): number;
}
