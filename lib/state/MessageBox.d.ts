import ModelObject from "../ModelObject";
export declare enum MessageBoxMode {
    noButtons = 0,
    closeOnly = 1,
    okOnly = 2,
    okCancel = 3
}
export default class MessageBox extends ModelObject {
    axisControls: number;
    message: string;
    mode: MessageBoxMode;
    seq: number;
    timeout: number;
    title: string;
}
