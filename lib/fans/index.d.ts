import ModelObject from "../ModelObject";
export declare class FanThermostaticControl extends ModelObject {
    heaters: Array<number>;
    highTemperature: number | null;
    lowTemperature: number | null;
}
export default class Fan extends ModelObject {
    actualValue: number;
    blip: number;
    frequency: number;
    max: number;
    min: number;
    name: string;
    requestedValue: number;
    rpm: number;
    readonly thermostatic: FanThermostaticControl;
}
