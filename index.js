let DEFAULT_OPTIONS = {
  numberOfIndicators: 1,
  color: "blue",
};

let result = [];

const createDirectionIndicators = (coordinates, leafletMap, options) => {
  try {
    validateParameters(coordinates, leafletMap, options);
    overrideDefaultOptions(options);
    createIndicator(coordinates, leafletMap);
  } catch (e) {
    console.error("[x] Validation failed. Error: ", e);
    return [];
  }
};

const validateParameters = (coordinates, leafletMap, options) => {
  validateCoordinates(coordinates);
  validateLeafletMap(leafletMap);
  validateOptions(options);
};

const validateCoordinates = (coordinates) => {
  if (coordinates == null) {
    throw new Error("[x] Missing required parameter [coordinates].");
  }

  if (!Array.isArray(coordinates)) {
    throw new Error("[x] Coordinates parameter must be an array.");
  }

  if (!coordinates.length) {
    throw new Error("[x] Coordinates can not be an empty array.");
  }

  if (coordinates.length < 2) {
    throw new Error("[x] Coordinates array needs at least two elements.");
  }
};

const validateLeafletMap = (leafletMap) => {
  if (leafletMap == null) {
    throw new Error("[x] Missing required parameter [leafletMap]");
  }
};

const validateOptions = (options) => {
  if (options == null) {
    throw new Error("[x] Missing required parameter [options]");
  }
};

const overrideDefaultOptions = (options) => {
  if (options.numberOfIndicators != null) {
    DEFAULT_OPTIONS.numberOfIndicators = options.numberOfIndicators;
  }

  if (options.color != null) {
    DEFAULT_OPTIONS.color = options.color;
  }
};

const createIndicator = (coordinates, leafletMap) => {
  for (let i = 1; i < coordinates.length; i++) {
    let icon = createLeafletDivIcon(coordinate[i]);

    for (let n = 1; n <= DEFAULT_OPTIONS.numberOfIndicators; n++) {
      
    }
  }
};

const createLeafletDivIcon = (coordinate) => {
  return window.L.divIcon({
    className: "direction-indicator",
    bgPos: [5, 5],
    html: `
      <div style="color: ${DEFAULT_OPTIONS.color}; transform: rotate(${calculateIndicatorAngle(coordinates[i -1], coordinates[i], -1)});">▶</div>
    `,
  });
};

const calculateIndicatorAngle = (firstCoordinate, secondCoordinate, coef) {
  let dy = secondCoordinate[0] - firstCoordinate[0];
  let dx = secondCoordinate[1] - firstCoordinate[1];
  let theta = Math.cos((Math.PI / 180) * firstCoordinate[0]) * dx;
  let angle = (Math.atan2(dy, theta) / Math.PI) * 180 * coef;

  return angle.toFixed(2);
}