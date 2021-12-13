import ModelObject from "../ModelObject";
export declare enum NetworkProtocol {
    HTTP = "http",
    HTTPS = "https",
    FTP = "ftp",
    SFTP = "sftp",
    Telnet = "telnet",
    SSH = "ssh"
}
export declare enum NetworkInterfaceType {
    lan = "lan",
    wifi = "wifi"
}
export default class NetworkInterface extends ModelObject {
    activeProtocols: Set<NetworkProtocol>;
    actualIP: string | null;
    configuredIP: string | null;
    dnsServer: string | null;
    firmwareVersion: string | null;
    gateway: string | null;
    mac: string | null;
    numReconnects: number | null;
    signal: number | null;
    speed: number | null;
    subnet: string | null;
    type: NetworkInterfaceType;
}
