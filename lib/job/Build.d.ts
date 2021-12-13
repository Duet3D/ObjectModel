import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
export declare class BuildObject extends ModelObject {
    cancelled: boolean;
    name: string | null;
    x: Array<number | null>;
    y: Array<number | null>;
}
export default class Build extends ModelObject {
    currentObject: number;
    m486names: boolean;
    m486numbers: boolean;
    objects: ModelCollection<BuildObject>;
}
