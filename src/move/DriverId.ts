import ModelObject, { IModelObject } from "../ModelObject";

export class DriverId extends ModelObject {
    board: number = 0;
    driver: number = 0;

    override update(jsonElement: any): IModelObject | null {
        if (typeof jsonElement === "string") {
            const matches = /(\d+)\.(\d+)/.exec(jsonElement);
            if (matches !== null) {
                this.board = Number(matches[1]);
                this.driver = Number(matches[2]);
            } else {
                this.board = 0;
                this.driver = Number(jsonElement);
            }
            return this;
        }
        return null;
    }

    override toString() {
        return `${this.board}.${this.driver}`;
    }
}

export default DriverId
