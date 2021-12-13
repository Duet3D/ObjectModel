import ModelObject from "../ModelObject";
import Accelerometer from "./Accelerometer";
import DirectDisplay from "./DirectDisplay";
import MinMaxCurrent from "./MinMaxCurrent";
import { BoardState } from "./BoardState";
export default class Board extends ModelObject {
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
