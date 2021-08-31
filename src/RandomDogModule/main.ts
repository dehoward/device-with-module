import { ModuleClient } from './config';

require('./getRandomDog');
require('./telemetry');

const interval = setInterval(() => console.log('Greetings from module land!'), 10000);

async function cleanup() {
    console.log('Module stopping...');
    clearInterval(interval);

    await ModuleClient.close();
    console.log('Module IoTHub client disconnected!');

    process.exit();
}

process.on('SIGINT', cleanup);