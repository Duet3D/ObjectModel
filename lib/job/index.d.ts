import Build from "./Build";
import ModelCollection from "../ModelCollection";
import ModelObject from "../ModelObject";
import ParsedFileInfo from "./ParsedFileInfo";
export declare class Layer extends ModelObject {
    duration: number;
    filament: Array<number>;
    fractionPrinted: number;
    height: number;
    temperatures: Array<number>;
}
export declare class TimesLeft extends ModelObject {
    filament: number | null;
    file: number | null;
    layer: number | null;
    slicer: number | null;
}
export default class Job extends ModelObject {
    constructor();
    build: Build;
    duration: number | null;
    file: ParsedFileInfo | null;
    filePosition: bigint | null;
    lastDuration: number | null;
    lastFileName: string | null;
    lastFileAborted: boolean;
    lastFileCancelled: boolean;
    lastFileSimulated: boolean;
    layer: number | null;
    readonly layers: ModelCollection<Layer>;
    layerTime: number | null;
    pauseDuration: number | null;
    rawExtrusion: number | null;
    readonly timesLeft: TimesLeft;
    warmUpDuration: number | null;
}
