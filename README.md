# durable-entities-xstate

XState + Durable Entities = 🚀

## Quick Start

1. Run `npm install` to install the required dependencies.
1. Hit <kbd>F5</kbd> or run `npm start` to start the function.

## Interacting with the State Machine

In this sample, the `DonutEntity` is controlled by the following statechart:

<a href="https://xstate.js.org/viz/?gist=529435f997b4276799778db37f64b0da" title="View this statechart on XState Viz">
  <img src="https://imgur.com/PRh0nO3.jpg" />
</a>

[View this statechart on XState Viz](https://xstate.js.org/viz/?gist=529435f997b4276799778db37f64b0da)

**To send an event to an entity:**

Open up an API client, such as [Postman](https://postman.com), and `POST` a JSON event object, which is an object that contains a `{ type: "someEventType" }` property, to `http://localhost:7071/api/DonutTrigger?id=<ENTITY ID>`:

```
POST http://localhost:7071/api/DonutTrigger?id=donut1

{
  "type": "NEXT"
}
```

Or using `curl`:

```bash
curl -d '{"type": "NEXT"}' -H "Content-Type: application/json" -X POST http://localhost:7071/api/DonutTrigger?id=donut1
```

The text response should be similar to:

> `Event "NEXT" sent to entity "donut1".`

**To view the state of an entity:**

In the same API client, send a `GET` request to `http://localhost:7071/api/DonutTrigger?id=<ENTITY ID>`

```
GET http://localhost:7071/api/DonutTrigger?id=donut1
```

Or using `curl`:

```bash
curl http://localhost:7071/api/DonutTrigger?id=donut1
```

Example response:

```json
{
  "entityExists": true,
  "entityState": {
    ...
    "value": {
      "directions": "makeDough"
    },
    ...
    "event": {
      "type": "NEXT"
    },
    ...
  }
}
```
