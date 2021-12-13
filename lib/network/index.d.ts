import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import NetworkInterface from "./NetworkInterface";
export declare const DefaultName = "My Duet";
export declare const DefaultHostname = "duet";
export declare const DefaultPassword = "reprap";
export default class Network extends ModelObject {
    corsSite: string | null;
    hostname: string;
    interfaces: ModelCollection<NetworkInterface>;
    name: string;
}
