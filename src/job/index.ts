import Build from "./Build";
import ModelCollection from "../ModelCollection";
import ModelObject from "../ModelObject";
import ParsedFileInfo from "./ParsedFileInfo"

export class Layer extends ModelObject {
    duration: number = 0;
    filament: Array<number> = new Array<number>();
    fractionPrinted: number = 0;
    height: number = 0;
    temperatures: Array<number> = new Array<number>();
}

export class TimesLeft extends ModelObject {
    filament: number | null = null;
    file: number | null = null;
    layer: number | null = null;
    slicer: number | null = null;
}

export default class Job extends ModelObject {
    constructor() {
        super();
        this.wrapModelProperty("build", Build);
        this.wrapModelProperty("file", ParsedFileInfo);
    }

    build: Build = new Build();
    duration: number | null = null;
    file: ParsedFileInfo | null = null;
    filePosition: bigint | null = null;
    lastDuration: number | null = null;
    lastFileName: string | null = null;
    lastFileAborted: boolean = false;
    lastFileCancelled: boolean = false;
    lastFileSimulated: boolean = false;
    layer: number | null = null;
    readonly layers: ModelCollection<Layer> = new ModelCollection(Layer);
    layerTime: number | null = null;
    pauseDuration: number | null = null;
    rawExtrusion: number | null = null;
    readonly timesLeft: TimesLeft = new TimesLeft();
    warmUpDuration: number | null = null;
}
