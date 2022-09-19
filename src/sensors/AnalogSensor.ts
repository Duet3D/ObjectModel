import ModelObject from "../ModelObject";

export enum AnalogSensorType {
    thermistor = "thermistor",
    pt1000 = "pt1000",
    max31865 = "rtdmax31865",
    max31855 = "thermocouplemax31855",
    max31856 = "thermocouplemax31856",
    linearAnalog = "linearanalog",
    dht21 = "dht21",
    dht22 = "dht22",
    dhtHumidity = "dhthumidity",
    currentLoop = "currentloooppyro",
    mcuTemp = "mcutemp",
    drivers = "drivers",
    driversDuex = "driversduex",
    unknown = "unknown"
}

export class AnalogSensor extends ModelObject {
    lastReading: number | null = null;
    name: string | null = null;
    type: AnalogSensorType = AnalogSensorType.unknown;
}

export default AnalogSensor
