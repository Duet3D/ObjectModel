import ModelObject from "../ModelObject";
export declare enum AccessLevel {
    readOnly = "readOnly",
    readWrite = "readWrite"
}
export declare enum SessionType {
    local = "local",
    http = "http",
    telnet = "telnet"
}
export default class UserSession extends ModelObject {
    accessLevel: AccessLevel;
    id: number;
    origin: string | null;
    originId: number;
    sessionType: SessionType;
}
