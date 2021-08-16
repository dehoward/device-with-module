import axios from 'axios';
import chalk from 'chalk';
import { ModuleClient } from './config';

// Woof woof!
ModuleClient.onDeviceMethod('GetRandomDog', async (request, response) => {
    const { breed } = request.payload;
    const { data: { message: randomDogLink } } = await axios.get<{ message: string }>(breed
        ? `https://dog.ceo/api/breed/${breed}/images/random`
        : 'https://dog.ceo/api/breeds/image/random');

    response.send(200, `Here is the ${breed ? `(${breed}) ` : ''}dog you requested: ${randomDogLink} 🐶`, () => chalk.magenta(`Sucessfully got a new dog: ${randomDogLink} 🐶`));
});

const interval = setInterval(() => console.log('Greetings from module land!'), 10000)

async function cleanup() {
    console.log('Module stopping...');
    clearInterval(interval);

    await ModuleClient.close();
    console.log('Module IoTHub client disconnected!');

    process.exit();
}

[`exit`, 'error', `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, cleanup);
})