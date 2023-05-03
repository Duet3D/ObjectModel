import packageInfo from "../../../package.json";

import ModelCollection from "../../ModelCollection";
import ModelObject from "../../ModelObject";

import HttpEndpoint from "./HttpEndpoint";

export class SBC extends ModelObject {
    readonly httpEndpoints: ModelCollection<HttpEndpoint> = new ModelCollection(HttpEndpoint);
    pluginSupport: boolean = false;
    rootPluginSupport: boolean = false;
    version: string = packageInfo.version;
}

export default SBC;

export * from "./HttpEndpoint";
