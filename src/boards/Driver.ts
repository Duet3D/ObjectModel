import { ModelObject } from "..";

export class BoardClosedLoopCurrentFraction extends ModelObject {
    avg: number = 0;
    max: number = 0;
}

export class BoardClosedLoopPositionError extends ModelObject {
    max: number = 0;
    rms: number = 0;
}

export class DriverClosedLoop extends ModelObject {
    readonly currentFraction: BoardClosedLoopCurrentFraction = new BoardClosedLoopCurrentFraction();
    readonly positionError: BoardClosedLoopPositionError = new BoardClosedLoopPositionError();
}

export enum DriverMode {
    constantOffTime = 0,
    randomOffTime = 1,
    spreadCycle = 2,
    stealthChop = 3,
    direct = 4,
    unknown = 5
}

export class DriverConfig extends ModelObject {
    direction: boolean = true;
    mode: DriverMode = DriverMode.spreadCycle;
}

export default class Driver extends ModelObject {
    constructor() {
        super();
        ModelObject.wrapModelProperty(this, "closedLoop", DriverClosedLoop);
        ModelObject.wrapModelProperty(this, "config", DriverConfig);
    }

    closedLoop: DriverClosedLoop | null = null;
    config: DriverConfig | null = null;
    status: number = 0;
}
