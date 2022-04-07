import { IModelObject } from "../../ModelObject";
import { ZLeadscrewKinematics } from "./KinematicsBase";
import { getKinematics } from "./index";

export class ScaraKinematics extends ZLeadscrewKinematics {
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

export default ScaraKinematics
