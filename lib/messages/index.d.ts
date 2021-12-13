import ModelObject from "../ModelObject";
export declare enum MessageType {
    success = 0,
    warning = 1,
    error = 2
}
export default class Message extends ModelObject {
    content: string;
    time: Date;
    type: MessageType;
    toString(): string;
}
