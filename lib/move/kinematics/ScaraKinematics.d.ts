import ModelObject from "../../ModelObject";
import { ZLeadscrewKinematics } from "./KinematicsBase";
export default class ScaraKinematics extends ZLeadscrewKinematics {
    update(jsonElement: any): ModelObject | null;
}
