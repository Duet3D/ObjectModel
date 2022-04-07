import ModelObject from "../ModelObject";

export enum MessageBoxMode {
    noButtons,
    closeOnly,
    okOnly,
    okCancel
}

export class MessageBox extends ModelObject {
    axisControls: number = 0;
    message: string = "";
    mode: MessageBoxMode = MessageBoxMode.okOnly;
    seq: number = -1;
    timeout: number = 0;
    title: string = "";
}

export default MessageBox
