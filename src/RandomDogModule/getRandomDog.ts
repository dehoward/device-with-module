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