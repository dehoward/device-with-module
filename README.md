# A device with a module

[[__TOC__]]
## Quickstart

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