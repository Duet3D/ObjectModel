import { IModelObject } from "../../ModelObject";
import KinematicsBase, { KinematicsName } from "./KinematicsBase";
import { getKinematics } from "./index";

export class PolarKinematics extends KinematicsBase {
    constructor() {
        super(KinematicsName.polar);
    }

    override update(jsonElement: any): IModelObject | null {
        if (jsonElement === null) {
            throw new Error("Kinematics must not be null");
        }

        if (typeof jsonElement.name === "string" && this.name !== jsonElement.name) {
            return getKinematics(jsonElement.name).update(jsonElement);
        }
        return super.update(jsonElement);
    }
}

export default PolarKinematics
