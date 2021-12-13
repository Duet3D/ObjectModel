"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalogSensorType = void 0;
const ModelObject_1 = require("../ModelObject");
var AnalogSensorType;
(function (AnalogSensorType) {
    AnalogSensorType["thermistor"] = "thermistor";
    AnalogSensorType["pt1000"] = "pt1000";
    AnalogSensorType["max31865"] = "rtdmax31865";
    AnalogSensorType["max31855"] = "thermocouplemax31855";
    AnalogSensorType["max31856"] = "thermocouplemax31856";
    AnalogSensorType["linearAnalog"] = "linearanalog";
    AnalogSensorType["dht11"] = "dht11";
    AnalogSensorType["dht21"] = "dht21";
    AnalogSensorType["dht22"] = "dht22";
    AnalogSensorType["dhtHumidity"] = "dhthumidity";
    AnalogSensorType["currentLoop"] = "currentloooppyro";
    AnalogSensorType["mcuTemp"] = "mcutemp";
    AnalogSensorType["drivers"] = "drivers";
    AnalogSensorType["driversDuex"] = "driversduex";
    AnalogSensorType["unknown"] = "unknown";
})(AnalogSensorType = exports.AnalogSensorType || (exports.AnalogSensorType = {}));
class AnalogSensor extends ModelObject_1.default {
    constructor() {
        super(...arguments);
        this.lastReading = null;
        this.name = null;
        this.type = AnalogSensorType.unknown;
    }
}
exports.default = AnalogSensor;
