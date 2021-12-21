import ModelObject from "./ModelObject";
import Board from "./boards";
import State from "./state";
import ModelCollection from "./ModelCollection";
import Directories from "./directories";
import Fan from "./fans";
import Heat from "./heat";
import HttpEndpoint from "./httpEndpoints";
import InputChannel from "./inputs/InputChannel";
import Job from "./job";
import Limits from "./limits";
import Message from "./messages";
import Move from "./move";
import Plugin from "./plugins";
import Scanner from "./scanner";
import Sensors from "./sensors";
import Spindle from "./spindles";
import UserSession from "./userSessions";
import Volume from "./volumes";
import { ModelDictionary } from "./ModelDictionary";
export declare function setArrayItem(array: Array<any>, index: number, value: any): void;
/**
 * Refer to the DSF/RRF documentation for descriptions of the object model fields
 */
export default class ObjectModel extends ModelObject {
    readonly boards: ModelCollection<Board>;
    readonly directories: Directories;
    readonly fans: ModelCollection<Fan>;
    readonly global: ModelDictionary<any>;
    readonly heat: Heat;
    readonly httpEndpoints: ModelCollection<HttpEndpoint>;
    readonly inputs: ModelCollection<InputChannel>;
    readonly job: Job;
    readonly limits: Limits;
    readonly messages: ModelCollection<Message>;
    readonly move: Move;
    readonly plugins: ModelDictionary<Plugin>;
    readonly scanner: Scanner;
    readonly sensors: Sensors;
    readonly spindles: ModelCollection<Spindle>;
    readonly state: State;
    readonly userSessions: ModelCollection<UserSession>;
    readonly volumes: ModelCollection<Volume>;
}
