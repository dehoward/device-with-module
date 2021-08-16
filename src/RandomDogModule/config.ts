import { Client } from 'azure-iot-device';
import { Mqtt } from 'azure-iot-device-mqtt';

const moduleConnectionString = '';
export const ModuleClient = Client.fromConnectionString(moduleConnectionString, Mqtt);
