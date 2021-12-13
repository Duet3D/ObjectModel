import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import ParsedThumbnail from "./ParsedThumbnail";

export default class ParsedFileInfo extends ModelObject {
    filament: Array<number> = new Array<number>();
    fileName: string = "";
    firstLayerHeight: number = 0;
    generatedBy: string = "";
    height: number = 0;
    lastModified: string | null = null;
    layerHeight: number = 0;
    numLayers: number = 0;
    printTime: bigint | null = null;
    simulatedTime: bigint | null = null;
    size: bigint = 0n;
    readonly thumbnails: ModelCollection<ParsedThumbnail> = new ModelCollection(ParsedThumbnail);
}
