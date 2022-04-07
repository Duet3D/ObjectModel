import ModelObject from "../ModelObject";

export class FanThermostaticControl extends ModelObject {
    heaters: Array<number> = new Array<number>();
    highTemperature: number | null = null;
    lowTemperature: number | null = null;
}

export class Fan extends ModelObject {
    actualValue: number = 0;
    blip: number = 0.1;
    frequency: number = 250;
    max: number = 1;
    min: number = 0;
    name: string = "";
    requestedValue: number = 0;
    rpm: number = -1;
    readonly thermostatic: FanThermostaticControl = new FanThermostaticControl();
}

export default Fan
