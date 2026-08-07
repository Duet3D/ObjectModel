import type { IModelObject } from "../../ModelObject";

import DirectDisplayScreenBase from "./DirectDisplayScreen";
import { DirectDisplayController, getDirectDisplayScreen } from ".";

export class DirectDisplayScreenST7567 extends DirectDisplayScreenBase {
    constructor() {
        super(DirectDisplayController.ST7567);
    }
    contrast: number = 30;
    resistorRatio: number = 6;

    override update(jsonElement: any, authoritative: boolean = false): IModelObject | null {
        if (jsonElement === null) {
            return null;
        }

        if (typeof jsonElement.controller === "string" && jsonElement.controller !== this.controller) {
            return getDirectDisplayScreen(jsonElement.controller).update(jsonElement, authoritative);
        }
        return super.update(jsonElement, authoritative);
    }
}

export default DirectDisplayScreenST7567
