import { ZLeadscrewKinematics } from "./KinematicsBase";

export class ScaraKinematics extends ZLeadscrewKinematics {
    crosstalk: number[] = [0, 0, 0];
    distalLength: number = 0;
    minRadius: number = 0;
    proximalLength: number = 0;
    psiLimits: number[] = [0, 0];
    thetaLimits: number[] = [0, 0];
    xOffset: number = 0;
    yOffset: number = 0;
}

export default ScaraKinematics
