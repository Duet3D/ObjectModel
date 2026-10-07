import { KinematicsName, ZLeadscrewKinematics } from "./KinematicsBase";

export class CoreKinematics extends ZLeadscrewKinematics {
    constructor(name: KinematicsName) {
        super(name);
    }

    forwardMatrix: Array<Array<number>> = [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ]
    ]
    inverseMatrix: Array<Array<number>> = [
        [ 1, 0, 0 ],
        [ 0, 1, 0 ],
        [ 0, 0, 1 ]
    ]
}

export default CoreKinematics
