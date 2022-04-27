import ModelObject, { IModelObject } from "../ModelObject";

export function isDriverId(value: any): value is DriverId {
	return (value instanceof Object) && (typeof value.board === "number") && (typeof value.driver === "number");
}

export class DriverId extends ModelObject {
    board: number = 0;
    driver: number = 0;

	equals(value?: DriverId | null) {
		return isDriverId(value) && value.board === this.board && value.driver === this.driver;
	}

    override update(jsonElement: any): IModelObject | null {
		if (isDriverId(jsonElement)) {
			this.board = jsonElement.board;
			this.driver = jsonElement.driver;
		}

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
