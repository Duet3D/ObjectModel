import KinematicsBase, { KinematicsName } from "./KinematicsBase";

export class HangprinterKinematics extends KinematicsBase {
    anchors: Array<Array<number>> = [
        [     0, -2000, -100 ],
        [  2000,  1000, -100 ],
        [ -2000,  1000, -100 ],
        [     0,     0, 3000 ]
    ]
    printRadius: number = 1500;

    constructor() {
        super(KinematicsName.hangprinter);
    }
}

export default HangprinterKinematics