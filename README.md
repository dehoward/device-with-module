# A device with a module

[[__TOC__]]
## Quickstart
1. **Get a connection string to your IoT Hub** and add it to `src/Device/config.ts`.
   
   a. You can optionally get a connection string for a module as well and add it to `src/RandomDogModule/config.ts`
2. To **start the device for the first time** run: 
   ```console
   $ npm i && npm run build && npm run start
   ```
   On subsequent runs you only need `npm run start`.

## Support commands:
- ### Device:
  - `SetTelemetryInterval`
    
    payload:
    ```json
    {
        "interval": 10000 // set the interval to 10s
    }
  - `StartModule`

    payload:
    ```json
    "RandomDogModule"
  - `StopModule`

    payload:
    ```json
    "RandomDogModule"
- ### RandomDogModule:
  - `GetRandomDog`

    (optional) payload:
     ```json
     {
         "breed": "hound"
     }