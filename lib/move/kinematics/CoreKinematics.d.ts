import { IModelObject } from "../../ModelObject";
import { KinematicsName, ZLeadscrewKinematics } from "./KinematicsBase";
export default class CoreKinematics extends ZLeadscrewKinematics {
    constructor(name: KinematicsName);
    forwardMatrix: Array<Array<number>>;
    inverseMatrix: Array<Array<number>>;
    update(jsonElement: any): IModelObject | null;
}
