import KinematicsBase, { KinematicsName } from "./KinematicsBase";

export class PolarKinematics extends KinematicsBase {
    constructor() {
        super(KinematicsName.polar);
    }

    radiusHomed: number = 0;
    radiusMax: number = 0;
    radiusMin: number = 0;
    ttAccMax: number = 0;
    ttSpeedMax: number = 0;
}

export default PolarKinematics
