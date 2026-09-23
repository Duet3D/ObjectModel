import ModelObject from "../ModelObject";

export class Accelerometer extends ModelObject {
    board: number = 0;
    orientation: number = 20;
    points: number = 0;
    resolution: number = 0;
    runs: number = 0;
    samplingRate: number = 0;
}

export default Accelerometer
