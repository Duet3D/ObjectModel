import ModelCollection from "../ModelCollection";
import Heater from "./Heater";
export default class Heat {
    bedHeaters: Array<number>;
    chamberHeaters: Array<number>;
    coldExtrudeTemperature: number;
    coldRetractTemperature: number;
    readonly heaters: ModelCollection<Heater>;
}
