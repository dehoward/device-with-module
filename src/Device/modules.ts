import * as cp from 'child_process';
import chalk from 'chalk';
import { DeviceClient } from "./config";

const moduleProcessMap: Record<string, cp.ChildProcess> = {};
const ModuleMap = {
    RandomDogModule: '../../dist/RandomDogModule/main.js'
}

DeviceClient.onDeviceMethod('StartModule', ({ payload: module }, response) => {
    console.log(chalk.green(`Starting module '${module}'...`));

    const modulePath = ModuleMap[module];
    if (!modulePath) {
        console.log(`Could not start module '${module}'`)
        response.send(404, 'Module not found');
        return;
    }

    // start module:
    moduleProcessMap[module] = cp.exec(`node ${modulePath}`, (err, stdout) => console.log(err?.message ? chalk.red(err.message) : chalk.bold(chalk.greenBright(`Module says: ${stdout}`))));
    moduleProcessMap[module].stdout?.on('data', (data) => {
        console.log(`Module ${chalk.italic(`'${module}'`)} says: ${chalk.cyanBright(data)}`);
    });

    response.send(200, 'Started module!!!', err => console.log(err?.message ? chalk.red(err.message) : chalk.bold(chalk.greenBright('Successfully started module!'))));
});

DeviceClient.onDeviceMethod('StopModule', async ({ payload: module }, response) => {
    console.log(chalk.green(`Stopping module '${module}'...`));

    const moduleProcess = moduleProcessMap[module];
    if (!moduleProcess) {
        console.log(`Could not stop module '${module}'`)
        response.send(404, 'Module not found');
        return;
    }

    response.send(200, 'Stopped module!!!', err => console.log(err?.message ? chalk.red(err.message) : chalk.bold(chalk.greenBright('Successfully stopped module!'))));
});