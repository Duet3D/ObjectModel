import ModelCollection from "../ModelCollection";
import ModelObject from "../ModelObject";

import DirectDisplay from "./directDisplay";
import Driver from "./Driver";

export class Accelerometer extends ModelObject {
    orientation: number = 20;
    points: number = 0;
    resolution: number = 0;
    runs: number = 0;
    samplingRate: number = 0;
}

export class BoardClosedLoop extends ModelObject {
    points: number = 0;
    runs: number = 0;
}

export enum BoardState {
    unknown = "unknown",
    flashing = "flashing",
    flashFailed = "flashFailed",
    resetting = "resetting",
    running = "running",
    timedOut = "timedOut"
}

export class InductiveSensor extends ModelObject {
    // still empty
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
        ModelObject.wrapModelCollectionProperty(this, "drivers", Driver);
        ModelObject.wrapModelProperty(this, "mcuTemp", MinMaxCurrent);
        ModelObject.wrapModelProperty(this, "v12", MinMaxCurrent);
        ModelObject.wrapModelProperty(this, "vIn", MinMaxCurrent);
    }

    accelerometer: Accelerometer | null = null;
    canAddress: number | null = null;
    drivers: ModelCollection<Driver> | null = null;
    firmwareDate: string = "";
    firmwareFileName: string = "";
    firmwareVersion: string = "";
    freeRam: number | null = null;
    maxMotors: number = 0;
    mcuTemp: MinMaxCurrent | null = null;
    name: string = "";
    shortName: string = "";
    uniqueId: string | null = null;
    v12: MinMaxCurrent | null = null;
    vIn: MinMaxCurrent | null = null;
}

export class MainBoard extends Board {
    constructor() {
        super();
        ModelObject.wrapModelProperty(this, "directDisplay", DirectDisplay);
    }

    directDisplay: DirectDisplay | null = null;
    firmwareName: string = "";
    iapFileNameSBC: string | null = null;
    iapFileNameSD: string | null = null;
    maxHeaters: number = 0;
    supportsDirectDisplay: boolean = false;
    wifiFirmwareFileName: string | null = null;
}

export class ExpansionBoard extends Board {
    constructor() {
        super();
        ModelObject.wrapModelProperty(this, "closedLoop", BoardClosedLoop);
        ModelObject.wrapModelProperty(this, "inductiveSensor", InductiveSensor);
    }

    closedLoop: BoardClosedLoop | null = null;
    inductiveSensor: InductiveSensor | null = null;
    state: BoardState = BoardState.unknown;
    timeout: number = 10;
}

export default Board

/**
 * Create the board instance for a given index. The first item is always the mainboard,
 * every other item is an expansion board connected over CAN
 * @param index Index in the boards array
 * @returns New board instance
 */
export function getBoard(index: number): Board {
    return (index === 0) ? new MainBoard() : new ExpansionBoard();
}

export * from "./directDisplay"
export * from "./Driver"
