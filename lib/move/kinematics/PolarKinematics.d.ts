import { IModelObject } from "../../ModelObject";
import KinematicsBase from "./KinematicsBase";
export default class PolarKinematics extends KinematicsBase {
    constructor();
    update(jsonElement: any): IModelObject | null;
}
