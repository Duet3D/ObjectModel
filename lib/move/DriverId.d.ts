import ModelObject from "../ModelObject";
export default class DriverId extends ModelObject {
    board: number;
    driver: number;
    update(jsonElement: any): ModelObject | null;
}
