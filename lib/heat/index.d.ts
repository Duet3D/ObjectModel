import ModelCollection from "../ModelCollection";
import Heater from "./Heater";
import ModelObject from "../ModelObject";
export default class Heat extends ModelObject {
    bedHeaters: Array<number>;
    chamberHeaters: Array<number>;
    coldExtrudeTemperature: number;
    coldRetractTemperature: number;
    readonly heaters: ModelCollection<Heater>;
}
