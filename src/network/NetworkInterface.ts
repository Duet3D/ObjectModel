import ModelObject from "../ModelObject";

export enum NetworkProtocol {
    HTTP = "http",
    HTTPS = "https",
    FTP = "ftp",
    SFTP = "sftp",
    Telnet = "telnet",
    SSH = "ssh"
}

export enum NetworkInterfaceType {
    lan = "lan",
    wifi = "wifi"
}

export default class NetworkInterface extends ModelObject {
    activeProtocols: Set<NetworkProtocol> = new Set<NetworkProtocol>();
    actualIP: string | null = null;
    configuredIP: string | null = null;
    dnsServer: string | null = null;
    firmwareVersion: string | null = null;
    gateway: string | null = null;
    mac: string | null = null;
    numReconnects: number | null = null;
    signal: number | null = null;
    speed: number | null = null;
    subnet: string | null = null;
    type: NetworkInterfaceType = NetworkInterfaceType.wifi;
}