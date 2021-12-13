"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkInterfaceType = exports.NetworkProtocol = void 0;
const ModelObject_1 = require("../ModelObject");
var NetworkProtocol;
(function (NetworkProtocol) {
    NetworkProtocol["HTTP"] = "http";
    NetworkProtocol["HTTPS"] = "https";
    NetworkProtocol["FTP"] = "ftp";
    NetworkProtocol["SFTP"] = "sftp";
    NetworkProtocol["Telnet"] = "telnet";
    NetworkProtocol["SSH"] = "ssh";
})(NetworkProtocol = exports.NetworkProtocol || (exports.NetworkProtocol = {}));
var NetworkInterfaceType;
(function (NetworkInterfaceType) {
    NetworkInterfaceType["lan"] = "lan";
    NetworkInterfaceType["wifi"] = "wifi";
})(NetworkInterfaceType = exports.NetworkInterfaceType || (exports.NetworkInterfaceType = {}));
class NetworkInterface extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.activeProtocols = new Set();
        this.actualIP = null;
        this.configuredIP = null;
        this.dnsServer = null;
        this.firmwareVersion = null;
        this.gateway = null;
        this.mac = null;
        this.numReconnects = null;
        this.signal = null;
        this.speed = null;
        this.subnet = null;
        this.type = NetworkInterfaceType.wifi;
    }
}
exports.default = NetworkInterface;
