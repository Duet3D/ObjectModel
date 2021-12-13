import ModelObject from "../ModelObject";
export declare class MoveDeviations extends ModelObject {
    deviation: number;
    mean: number;
}
export default class MoveCalibration extends ModelObject {
    readonly final: MoveDeviations;
    readonly initial: MoveDeviations;
    numFactors: number;
}
