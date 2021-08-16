import { Client } from 'azure-iot-device';
import { Mqtt } from 'azure-iot-device-mqtt';

const deviceConnectionString = '';
export const DeviceClient = Client.fromConnectionString(deviceConnectionString, Mqtt);
