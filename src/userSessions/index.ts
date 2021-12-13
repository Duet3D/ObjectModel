import ModelObject from "../ModelObject";

export enum AccessLevel {
    readOnly = "readOnly",
    readWrite = "readWrite"
}

export enum SessionType {
    local = "local",
    http = "http",
    telnet = "telnet",
}

export default class UserSession extends ModelObject {
    accessLevel: AccessLevel = AccessLevel.readOnly;
    id: number = 0;
    origin: string | null = null;
    originId: number = -1;
    sessionType: SessionType = SessionType.local;
}
