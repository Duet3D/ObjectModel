import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import DriverId from "./DriverId";
import Microstepping from "./Microstepping";
export declare enum AxisLetter {
    X = "X",
    Y = "Y",
    Z = "Z",
    U = "U",
    V = "V",
    W = "W",
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    a = "a",
    b = "b",
    c = "c",
    d = "d",
    e = "e",
    f = "f",
    g = "g",
    h = "h",
    i = "i",
    j = "j",
    k = "k",
    l = "l",
    none = ""
}
export default class Axis extends ModelObject {
    acceleration: number;
    babystep: number;
    current: number;
    readonly drivers: ModelCollection<DriverId>;
    homed: boolean;
    jerk: number;
    letter: AxisLetter;
    machinePosition: number | null;
    max: number;
    maxProbed: boolean;
    readonly microstepping: Microstepping;
    min: number;
    minProbed: boolean;
    percentCurrent: number;
    percentStstCurrent: number | null;
    speed: number;
    stepsPerMm: number;
    userPosition: number | null;
    visible: boolean;
    workplaceOffsets: Array<number>;
}
