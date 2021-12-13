import ModelObject from "../../ModelObject";
import KinematicsBase, { KinematicsName } from "./KinematicsBase";
export default class Kinematics extends KinematicsBase {
    constructor();
    update(jsonElement: any): ModelObject | null;
}
export declare function getKinematics(name: KinematicsName): KinematicsBase;
