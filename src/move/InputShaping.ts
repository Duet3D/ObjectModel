import ModelObject from "../ModelObject";

export enum InputShapingType {
    none = "none",
    mzv = "mzv",
    zvd = "zvd",
    zvdd = "zvddd",
    zvddd = "zvddd",
    ei2 = "ei2",
    ei3 = "ei3"
}

export default class InputShaping extends ModelObject {
    amplitudes: Array<number> = [];
    damping: number = 0.2;
    durations: Array<number> = [];
    frequency: number = 40;
    minAcceleration: number = 10;
    type: InputShapingType = InputShapingType.none;
}