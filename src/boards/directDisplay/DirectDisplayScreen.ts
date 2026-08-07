import type { IModelObject } from "../../ModelObject";

import { getDirectDisplayScreen } from ".";
import DirectDisplayScreenBase from "./DirectDisplayScreenBase";

export class DirectDisplayScreen extends DirectDisplayScreenBase {
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

export default DirectDisplayScreen
