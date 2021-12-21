import ModelObject from "../ModelObject";
export declare class Accelerometer extends ModelObject {
    points: number;
    runs: number;
}
export declare enum BoardState {
    unknown = "unknown",
    flashing = "flashing",
    flashFailed = "flashFailed",
    resetting = "resetting",
    running = "running"
}
export declare class MinMaxCurrent extends ModelObject {
    current: number;
    min: number;
    max: number;
}
export declare class DirectDisplay extends ModelObject {
    pulsesPerClick: number;
    spiFreq: number;
    typeName: string;
}
export default class Board extends ModelObject {
    constructor();
    accelerometer: Accelerometer | null;
    bootloaderFileName: string | null;
    canAddress: number | null;
    directDisplay: DirectDisplay | null;
    firmwareDate: string;
    firmwareFileName: string;
    firmwareVersion: string;
    iapFileNameSBC: string | null;
    iapFileNameSD: string | null;
    maxHeaters: number;
    maxMotors: number;
    mcuTemp: MinMaxCurrent | null;
    name: string;
    shortName: string;
    state: BoardState;
    supportsDirectDisplay: boolean;
    uniqueId: string | null;
    v12: MinMaxCurrent | null;
    vIn: MinMaxCurrent | null;
}
