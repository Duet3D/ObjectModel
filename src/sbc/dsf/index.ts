import ModelCollection from "../../ModelCollection";
import ModelObject from "../../ModelObject";

import HttpEndpoint from "./HttpEndpoint";
import UserSession from "./UserSession";

export class SBC extends ModelObject {
    readonly httpEndpoints: ModelCollection<HttpEndpoint> = new ModelCollection(HttpEndpoint);
    pluginSupport: boolean = false;
    rootPluginSupport: boolean = false;
	readonly userSessions: ModelCollection<UserSession> = new ModelCollection(UserSession);
    version: string = "";
}

export default SBC;

export * from "./HttpEndpoint";
