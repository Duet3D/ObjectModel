"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpEndpointType = void 0;
const ModelObject_1 = require("../ModelObject");
var HttpEndpointType;
(function (HttpEndpointType) {
    HttpEndpointType["GET"] = "GET";
    HttpEndpointType["POST"] = "POST";
    HttpEndpointType["PUT"] = "PUT";
    HttpEndpointType["PATCH"] = "PATCH";
    HttpEndpointType["TRACE"] = "TRACE";
    HttpEndpointType["DELETE"] = "DELETE";
    HttpEndpointType["OPTIONS"] = "OPTIONS";
    HttpEndpointType["WebSocket"] = "WebSocket";
})(HttpEndpointType = exports.HttpEndpointType || (exports.HttpEndpointType = {}));
class HttpEndpoint extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.endpointType = HttpEndpointType.GET;
        this.namespace = "";
        this.path = "";
        this.isUploadRequest = false;
        this.unixSocket = "";
    }
}
exports.default = HttpEndpoint;
