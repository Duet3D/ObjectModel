import ModelObject from "../../ModelObject";
import { KinematicsName, ZLeadscrewKinematics } from "./KinematicsBase";
export default class CoreKinematics extends ZLeadscrewKinematics {
    forwardMatrix: Array<Array<number>>;
    inverseMatrix: Array<Array<number>>;
    constructor(name: KinematicsName);
    update(jsonElement: any): ModelObject | null;
}
