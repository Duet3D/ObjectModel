import ModelObject from "../ModelObject";

export class Memory extends ModelObject {
    available: number | bigint | null = null;
    total: number | bigint | null = null;
}

export default Memory;
