import ModelObject from "../ModelObject";

export class Accelerometer extends ModelObject {
    points: number = 0;
    runs: number = 0;
}

export enum BoardState {
    unknown = "unknown",
    flashing = "flashing",
    flashFailed = "flashFailed",
    resetting = "resetting",
    running = "running"
}

export class ClosedLoop extends ModelObject {
    points: number = 0;
    runs: number = 0;
}

export class MinMaxCurrent extends ModelObject {
    current: number = 0;
    min: number = 0;
    max: number = 0;
}

export class DirectDisplay extends ModelObject {
    pulsesPerClick: number = 0;
    spiFreq: number = 0;
    typeName: string = "";
}

export default class Board extends ModelObject {
    constructor() {
        super();
        this.wrapModelProperty("accelerometer", Accelerometer);
        this.wrapModelProperty("closedLoop", ClosedLoop);
        this.wrapModelProperty("directDisplay", DirectDisplay);
        this.wrapModelProperty("mcuTemp", MinMaxCurrent);
        this.wrapModelProperty("v12", MinMaxCurrent);
        this.wrapModelProperty("vIn", MinMaxCurrent);
    }

    accelerometer: Accelerometer | null = null;
    bootloaderFileName: string | null = null;
    canAddress: number | null = 0;
    closedLoop: ClosedLoop | null = null;
    directDisplay: DirectDisplay | null = null;
    firmwareDate: string = "";
    firmwareFileName: string = "";
    firmwareVersion: string = "";
    iapFileNameSBC: string | null = null;
    iapFileNameSD: string | null = null;
    maxHeaters: number = 0;
    maxMotors: number = 0;
    mcuTemp: MinMaxCurrent | null = null;
    name: string = "";
    shortName: string = "";
    state: BoardState = BoardState.unknown;
    supportsDirectDisplay: boolean = false;
    uniqueId: string | null = null;
    v12: MinMaxCurrent | null = null;
    vIn: MinMaxCurrent | null = null;
}
