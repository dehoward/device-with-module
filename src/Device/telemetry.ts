import chalk from 'chalk';
import { Message } from 'azure-iot-device';
import { DeviceClient } from './config';

let intervalLoop: NodeJS.Timer | undefined = undefined;

DeviceClient.onDeviceMethod('SetTelemetryInterval', (request, response) => {
    const payload = request.payload;
    const interval = request.payload.interval;
    console.log(chalk.green(`Set telemetry payload received:+\n${payload}`));

    // Check that a numeric value was passed as a parameter
    if (isNaN(interval)) {
        console.log(chalk.red('Invalid interval response received in payload'));
        // Report failure back to your hub.
        response.send(400, 'Invalid direct method parameter: ' + request.payload);

    } else {
        // Reset the interval timer
        clearInterval(intervalLoop as NodeJS.Timer);
        intervalLoop = setInterval(sendMessage, interval * 1000);

        // Report success back to your hub.
        const msg = `Telemetry interval set to ${interval} with ❤️`;
        response.send(200, msg, () => console.log(chalk.greenBright(msg)));
    }
});

// Send a telemetry message to your hub
function sendMessage() {
    // Simulate telemetry.
    var temperature = 20 + (Math.random() * 15);
    var message = new Message(JSON.stringify({
        temperature: temperature,
        humidity: 60 + (Math.random() * 20)
    }));
    console.log(chalk.italic('Sending message: ') + chalk.whiteBright(message.getData().toString()));

    // Send the message.
    DeviceClient.sendEvent(message, function (err) {
        if (err) {
            console.error('send error: ' + err.toString());
        } else {
            console.log(chalk.dim('message sent'));
        }
    });
}

// Create a message and send it to the IoT hub, initially every second.
intervalLoop = setInterval(sendMessage, 5000);
