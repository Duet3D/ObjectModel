import ModelObject from "../ModelObject";
export declare enum HeaterMonitorAction {
    generateFault = 0,
    permanentSwitchOff = 1,
    temporarySwitchOff = 2,
    shutDown = 3
}
export declare enum HeaterMonitorCondition {
    disabled = "disabled",
    tooHigh = "tooHigh",
    tooLow = "tooLow"
}
export default class HeaterMonitor extends ModelObject {
    action: HeaterMonitorAction;
    condition: HeaterMonitorCondition;
    limit: number;
}
