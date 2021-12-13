import ModelObject from "../ModelObject";
import Accelerometer from "./Accelerometer";
import DirectDisplay from "./DirectDisplay";
import MinMaxCurrent from "./MinMaxCurrent";
import { BoardState } from "./BoardState";

export default class Board extends ModelObject {
    accelerometer: Accelerometer | null = null;
    bootloaderFileName: string | null = null;
    canAddress: number | null = 0;
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
