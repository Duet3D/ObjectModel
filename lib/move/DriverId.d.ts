import ModelObject, { IModelObject } from "../ModelObject";
export default class DriverId extends ModelObject {
    board: number;
    driver: number;
    update(jsonElement: any): IModelObject | null;
    toString(): string;
}
