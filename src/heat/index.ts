import ModelCollection from "../ModelCollection";
import Heater from "./Heater";

export default class Heat {
    bedHeaters: Array<number> = new Array<number>();
    chamberHeaters: Array<number> = new Array<number>();
    coldExtrudeTemperature: number = 160;
    coldRetractTemperature: number = 90;
    readonly heaters: ModelCollection<Heater> = new ModelCollection(Heater);
}