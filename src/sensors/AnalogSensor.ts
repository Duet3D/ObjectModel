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
	bme280 = "bme280",
	bme280pressure = "bme280-pressure",
	bme280humidity = "bme280-humidity",
    currentLoop = "currentloooppyro",
    mcuTemp = "mcutemp",
    drivers = "drivers",
    driversDuex = "driversduex",
    unknown = "unknown"
}

export enum TemperatureError {
	ok = "ok",
	shortCircuit = "shortCircuit",
	shortToVcc = "shortToVcc",
	shortToGround = "shortToGround",
	openCircuit = "openCircuit",
	timeout = "timeout",
	ioError = "ioError",
	hardwareError = "hardwareError",
	notReady = "notReady",
	invalidOutputNumber = "invalidOutputNumber",
	busBusy = "busBusy",
	badResponse = "badResponse",
	unknownPort = "unknownPort",
	notInitialised = "notInitialised",
	unknownSensor = "unknownSensor",
	overOrUnderVoltage = "overOrUnderVoltage",
	badVref = "badVref",
	badVssa = "badVssa",
	unknownError = "unknownError"
}

export class AnalogSensor extends ModelObject {
    lastReading: number | null = null;
    name: string | null = null;
    state: TemperatureError = TemperatureError.ok;
    type: AnalogSensorType = AnalogSensorType.unknown;
}

export default AnalogSensor
