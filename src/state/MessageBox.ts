import ModelObject from "../ModelObject";

export enum MessageBoxMode {
    noButtons,
    closeOnly,
    okOnly,
    okCancel,
    multipleChoice,
	intInput,
	floatInput,
	stringInput
}

export class MessageBox extends ModelObject {
    axisControls: number | null = null;
    cancelButton: boolean = false;
    choices: Array<string> | null = null;
    default: number | string | null = null;
    max: number | null = null;
    message: string = "";
    min: number | null = null;
    mode: MessageBoxMode = MessageBoxMode.okOnly;
    seq: number = -1;
    timeout: number = 0;
    title: string = "";
}

export default MessageBox
