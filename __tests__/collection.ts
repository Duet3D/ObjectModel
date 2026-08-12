import { ModelCollection } from "../src";
import type { IModelObject } from "../src";

class Item implements IModelObject {
    value: number = 0;
    update(jsonElement: any): IModelObject | null {
        this.value = jsonElement?.value ?? 0;
        return this;
    }
}

test("array methods derived from a ModelCollection return plain arrays", () => {
    const collection = new ModelCollection(Item);
    collection.push(new Item().update({ value: 1 }) as Item, new Item().update({ value: 2 }) as Item);

    const filtered = collection.filter(() => true);
    expect(filtered).not.toBeInstanceOf(ModelCollection);

    const mapped = collection.map((item) => item);
    expect(mapped).not.toBeInstanceOf(ModelCollection);

    // Used to throw because $itemConstructor had been corrupted to the array length
    expect(() => filtered.push(new Item().update({ value: 3 }) as Item)).not.toThrow();
    expect(filtered.length).toBe(3);
});
