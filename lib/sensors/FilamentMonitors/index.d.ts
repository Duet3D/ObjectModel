import { IModelObject } from "../../ModelObject";
import FilamentMonitorBase, { FilamentMonitorType } from "./FilamentMonitorBase";
export default class FilamentMonitor extends FilamentMonitorBase {
    update(jsonElement: any): IModelObject | null;
}
export declare function getFilamentMonitor(type: FilamentMonitorType): FilamentMonitorBase;
