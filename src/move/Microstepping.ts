import ModelObject from "../ModelObject";

export default class Microstepping extends ModelObject {
    interpolated: boolean = false;
    value: number = 16;
}