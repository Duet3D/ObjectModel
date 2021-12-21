import ModelObject from "../ModelObject";

export enum ScannerStatus {
    disconnected = 'D',
    idle = 'I',
    scanning = 'S',
    postProcessing = 'P',
    calibrating = 'C',
    uploading = 'U'
}

export default class Scanner extends ModelObject {
    progress: number = 0;
    status: ScannerStatus = ScannerStatus.disconnected;
}
