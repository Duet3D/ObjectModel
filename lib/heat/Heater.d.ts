import ModelCollection from "../ModelCollection";
import HeaterModel from "./HeaterModel";
import ModelObject from "../ModelObject";
import HeaterMonitor from "./HeaterMonitor";
export declare enum HeaterState {
    off = "off",
    standby = "standby",
    active = "active",
    fault = "fault",
    tuning = "tuning",
    offline = "offline"
}
export default class Heater extends ModelObject {
    active: number;
    avgPwm: number;
    current: number;
    max: number;
    min: number;
    readonly model: HeaterModel;
    readonly monitors: ModelCollection<HeaterMonitor>;
    sensor: number;
    standby: number;
    state: HeaterState;
}
