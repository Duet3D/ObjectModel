import ModelObject from "../ModelObject";

export class Accelerometer extends ModelObject {
    orientation: number = 20;
    points: number = 0;
    port: string = "";
    resolution: number = 0;
    runs: number = 0;
    samplingRate: number = 0;
}

export default Accelerometer
