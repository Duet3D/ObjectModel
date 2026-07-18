import ModelObject from "../ModelObject";

export class Upgrade extends ModelObject {
    message: string = "";
    progress: number | null = null;
}

export default Upgrade;
