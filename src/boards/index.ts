import ModelObject from "../ModelObject";

import DirectDisplay from "./directDisplay";

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


export class Board extends ModelObject {
    constructor() {
        super();
        ModelObject.wrapModelProperty(this, "accelerometer", Accelerometer);
        ModelObject.wrapModelProperty(this, "closedLoop", ClosedLoop);
        ModelObject.wrapModelProperty(this, "directDisplay", DirectDisplay);
        ModelObject.wrapModelProperty(this, "mcuTemp", MinMaxCurrent);
        ModelObject.wrapModelProperty(this, "v12", MinMaxCurrent);
        ModelObject.wrapModelProperty(this, "vIn", MinMaxCurrent);
    }

    accelerometer: Accelerometer | null = null;
    bootloaderFileName: string | null = null;
    canAddress: number | null = null;
    closedLoop: ClosedLoop | null = null;
    directDisplay: DirectDisplay | null = null;
    firmwareDate: string = "";
    firmwareFileName: string = "";
    firmwareName: string = "";
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
    wifiFirmwareFileName: string | null = null;
}

export default Board

export * from "./directDisplay"
