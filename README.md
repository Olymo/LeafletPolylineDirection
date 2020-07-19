# @whatsaaaaa/leafletpolylinedirection

Leaflet plug-in to add direction arrows on existing Polylines.

## Install

```
$ npm i @whatsaaaaa/leafletpolylinedirection
```

## Usage

```js
import { createDirectionIndicators } from "@whatsaaaaa/leafletpolylinedirection";

createDirectionIndicators(coordinates, mapObject, {
  numberOfIndicators: 1,
  color: "red",
});
```

## Parameters

- coordinates: Array
- mapObject: Object
- options: Object

## Options

- numberOfIndicators - Default value 1. If you want more than one indicator between two coordinates, use this property
- color - Default 'blue'. Change the color of indicator

## Recommended CSS

```cs
.direction-indicator {
  width: 8px;
  height: 8px;
}

.direction-indicator > div {
  margin-left: -1px;
  margin-top: -3px;
  transform-origin: center center;
  font: 12px/1.5 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
```
