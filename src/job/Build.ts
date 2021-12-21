import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";

export class BuildObject extends ModelObject {
    cancelled: boolean = false;
    name: string | null = null;
    x: Array<number | null> = new Array<number | null>();
    y: Array<number | null> = new Array<number | null>();
}

export default class Build extends ModelObject {
    currentObject: number = -1;
    m486names: boolean = false;
    m486numbers: boolean = false;
    readonly objects: ModelCollection<BuildObject> = new ModelCollection(BuildObject);
}
