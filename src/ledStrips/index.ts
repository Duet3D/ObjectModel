import ModelObject from "../ModelObject";

export enum LedStripType {
    DotStar = "DotStar",
    NeoPixel_RGB = "NeoPixel_RGB",
    NeoPixel_RGBW = "NeoPixel_RGBW"
}

export enum LedStripColorOrder {
    BGR = 0,
    BRG = 1,
    RGB = 2,
    RBG = 3,
    GBR = 4,
    GRB = 5
}

export class LedStrip extends ModelObject {
    board: number = 0;
    colorOrder: LedStripColorOrder = LedStripColorOrder.GRB;
    maxLeds: number = 0;
    pin: string = "";
    stopMovement: boolean = false;
    type: LedStripType = LedStripType.DotStar;
}

export default LedStrip
