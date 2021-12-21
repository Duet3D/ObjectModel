import PluginManifest from "./PluginManifest";

export default class Plugin extends PluginManifest {
    dsfFiles: Array<string> = [];
    dwcFiles: Array<string> = [];
    sdFiles: Array<string> = [];
    pid: number = -1;
}
