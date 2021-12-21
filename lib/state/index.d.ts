import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import MessageBox from "./MessageBox";
import RestorePoint from "./RestorePoint";
import { MachineStatus } from "./MachineStatus";
export declare class BeepRequest extends ModelObject {
    duration: number;
    frequency: number;
}
export declare class GpOutputPort extends ModelObject {
    pwm: number;
}
export declare enum LogLevel {
    debug = "debug",
    info = "info",
    warn = "warn",
    off = "off"
}
export declare enum MachineMode {
    fff = "FFF",
    cnc = "CNC",
    laser = "Laser"
}
export default class State extends ModelObject {
    constructor();
    atxPower: boolean | null;
    atxPowerPort: string | null;
    beep: BeepRequest | null;
    currentTool: number;
    displayMessage: string;
    dsfVersion: string | null;
    dsfPluginSupport: boolean;
    dsfRootPluginSupport: boolean;
    readonly gpOut: ModelCollection<GpOutputPort>;
    laserPwm: number | null;
    logFile: string | null;
    logLevel: LogLevel;
    messageBox: MessageBox | null;
    machineMode: MachineMode;
    macroRestarted: boolean;
    msUpTime: number;
    nextTool: number;
    pluginsStarted: boolean;
    powerFailScript: string;
    previousTool: number;
    readonly restorePoints: ModelCollection<RestorePoint>;
    status: MachineStatus;
    time: string | null;
    upTime: number;
}
