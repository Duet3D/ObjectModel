import ModelObject from "../ModelObject";
export declare enum InputShapingType {
    none = "none",
    mzv = "mzv",
    zvd = "zvd",
    zvdd = "zvddd",
    zvddd = "zvddd",
    ei2 = "ei2",
    ei3 = "ei3"
}
export default class InputShaping extends ModelObject {
    amplitudes: Array<number>;
    damping: number;
    durations: Array<number>;
    frequency: number;
    minAcceleration: number;
    type: InputShapingType;
}
