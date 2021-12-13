import ModelObject from "../ModelObject";
export declare enum HttpEndpointType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    TRACE = "TRACE",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
    WebSocket = "WebSocket"
}
export default class HttpEndpoint extends ModelObject {
    endpointType: HttpEndpointType;
    namespace: string;
    path: string;
    isUploadRequest: boolean;
    unixSocket: string;
}
