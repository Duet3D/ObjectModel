import ModelObject from "../ModelObject";

export enum LedStripType {
    DotStar = "DotStar",
    NeoPixel_RGB = "NeoPixel_RGB",
    NeoPixel_RGBW = "NeoPixel_RGBW"
}

export class LedStrip extends ModelObject {
    type: LedStripType = LedStripType.DotStar;
}

export default LedStrip
