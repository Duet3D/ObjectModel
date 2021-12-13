import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import ParsedThumbnail from "./ParsedThumbnail";
export default class ParsedFileInfo extends ModelObject {
    filament: Array<number>;
    fileName: string;
    firstLayerHeight: number;
    generatedBy: string;
    height: number;
    lastModified: string | null;
    layerHeight: number;
    numLayers: number;
    printTime: bigint | null;
    simulatedTime: bigint | null;
    size: bigint;
    readonly thumbnails: ModelCollection<ParsedThumbnail>;
}
