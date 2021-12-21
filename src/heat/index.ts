import ModelCollection from "../ModelCollection";
import Heater from "./Heater";
import ModelObject from "../ModelObject";

export default class Heat extends ModelObject {
    bedHeaters: Array<number> = new Array<number>();
    chamberHeaters: Array<number> = new Array<number>();
    coldExtrudeTemperature: number = 160;
    coldRetractTemperature: number = 90;
    readonly heaters: ModelCollection<Heater> = new ModelCollection(Heater);
}
