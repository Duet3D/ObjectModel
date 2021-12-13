import ModelObject from "./ModelObject";

export default class ModelCollection<T extends ModelObject> extends Array<T> {
    private readonly itemConstructor: { new(): T };

    public constructor(C: { new(): T }) {
        super();
        this.itemConstructor = C;

        Object.setPrototypeOf(this, ModelCollection.prototype);
    }

    public push(...items: T[]): number {
        for (const item of items) {
            if (item === null || item instanceof this.itemConstructor) {
                super.push(item);
            } else {
                const newItem: T = new this.itemConstructor();
                newItem.update(item);
                super.push(newItem);
            }
        }
        return this.length;
    }
}