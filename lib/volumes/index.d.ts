import ModelObject from "../ModelObject";
export default class Volume extends ModelObject {
    capacity: bigint | null;
    freeSpace: bigint | null;
    mounted: boolean;
    name: string | null;
    openFiles: number | null;
    path: string | null;
    speed: number | null;
}
