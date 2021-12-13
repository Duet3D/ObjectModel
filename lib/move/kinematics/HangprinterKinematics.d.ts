import ModelObject from "../../ModelObject";
import KinematicsBase from "./KinematicsBase";
export default class HangprinterKinematics extends KinematicsBase {
    anchors: Array<Array<number>>;
    printRadius: number;
    constructor();
    update(jsonElement: any): ModelObject | null;
}
