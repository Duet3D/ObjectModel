import ModelCollection from "../ModelCollection";
import ModelObject from "../ModelObject";
import ThumbnailInfo from "./ThumbnailInfo";

export class GCodeFileInfo extends ModelObject {
    filament: Array<number> = new Array<number>();
    fileName: string = "";
    generatedBy: string = "";
    height: number = 0;
    lastModified: string | null = null;
    layerHeight: number = 0;
    numLayers: number = 0;
    printTime: bigint | null = null;
    simulatedTime: bigint | null = null;
    size: bigint = 0n;
    readonly thumbnails: ModelCollection<ThumbnailInfo> = new ModelCollection(ThumbnailInfo);
}

export default GCodeFileInfo
