import ModelObject from "../../ModelObject";
import { KinematicsName, ZLeadscrewKinematics } from "./KinematicsBase";
import { getKinematics } from "./index";

export default class CoreKinematics extends ZLeadscrewKinematics {
    forwardMatrix: Array<Array<number>> = [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ]
    ]
    inverseMatrix: Array<Array<number>> = [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ]
    ]

    constructor(name: KinematicsName) {
        super(name);
    }

    override update(jsonElement: any): ModelObject | null {
        if (jsonElement === null) {
            throw new Error("Kinematics must not be null");
        }

        if (typeof jsonElement.name === "string" && this.name !== jsonElement.name) {
            return getKinematics(jsonElement.name).update(jsonElement);
        }
        return super.update(jsonElement);
    }
}