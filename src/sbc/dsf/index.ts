import ModelCollection from "../../ModelCollection";
import ModelObject from "../../ModelObject";

import HttpEndpoint from "./HttpEndpoint";

export class SBC extends ModelObject {
    readonly httpEndpoints: ModelCollection<HttpEndpoint> = new ModelCollection(HttpEndpoint);
    pluginSupport: boolean = false;
    rootPluginSupport: boolean = false;
    version: string = "";
}

export default SBC;

export * from "./HttpEndpoint";
