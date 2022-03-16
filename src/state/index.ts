import ModelObject from "../ModelObject";
import ModelCollection from "../ModelCollection";
import MessageBox from "./MessageBox";
import RestorePoint from "./RestorePoint";
import { MachineStatus } from "./MachineStatus";

export class BeepRequest extends ModelObject {
    duration: number = 0;
    frequency: number = 0;
}

export class GpOutputPort extends ModelObject {
    pwm: number = 0;
}

export enum LogLevel {
    debug = "debug",
    info = "info",
    warn = "warn",
    off = "off"
}

export enum MachineMode {
    fff = "FFF",
    cnc = "CNC",
    laser = "Laser"
}

export default class State extends ModelObject {
    constructor() {
        super();
        this.wrapModelProperty("beep", BeepRequest);
        this.wrapModelProperty("messageBox", MessageBox);
    }
    atxPower: boolean | null = null;
    atxPowerPort: string | null = null;
    beep: BeepRequest | null = null;
    currentTool: number = -1;
    deferredPowerDown: boolean | null = null;
    displayMessage: string = "";
    dsfVersion: string | null = null;       // deprecated; will be moved to separate dsf main key in v3.5
    dsfPluginSupport: boolean = false;      // deprecated; will be moved to separate dsf main key in v3.5
    dsfRootPluginSupport: boolean = false;  // deprecated; will be moved to separate dsf main key in v3.5
    readonly gpOut: ModelCollection<GpOutputPort> = new ModelCollection(GpOutputPort);
    laserPwm: number | null = null;
    logFile: string | null = null;
    logLevel: LogLevel = LogLevel.off;
    messageBox: MessageBox | null = null;
    machineMode: MachineMode = MachineMode.fff;
    macroRestarted: boolean = false;
    msUpTime: number = 0;
    nextTool: number = -1;
    pluginsStarted: boolean = false;
    powerFailScript: string = "";
    previousTool: number = -1;
    readonly restorePoints: ModelCollection<RestorePoint> = new ModelCollection(RestorePoint);
    status: MachineStatus = MachineStatus.starting;
    thisInput: number | null = null;
    time: string | null = null;
    upTime: number = 0;
}