import ModelObject from "../ModelObject";

export enum HeaterMonitorAction {
    generateFault = 0,
    permanentSwitchOff = 1,
    temporarySwitchOff = 2,
    shutDown = 3
}

export enum HeaterMonitorCondition {
    disabled = "disabled",
    tooHigh = "tooHigh",
    tooLow = "tooLow"
}

export default class HeaterMonitor extends ModelObject {
    action: HeaterMonitorAction = HeaterMonitorAction.generateFault;
    condition: HeaterMonitorCondition = HeaterMonitorCondition.disabled;
    limit: number = 2000;
}
