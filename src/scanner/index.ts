import ModelObject from "../ModelObject";

export enum ScannerStatus {
    disconnected = 'D',
    idle = 'I',
    scanning = 'S',
    postProcessing = 'P',
    calibrating = 'C',
    uploading = 'U'
}

export class Scanner extends ModelObject {
    progress: number = 0;
    status: ScannerStatus = ScannerStatus.disconnected;
}

export default Scanner
