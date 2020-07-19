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
    let icon = createLeafletDivIcon(coordinates[i]);

    for (let n = 1; n <= DEFAULT_OPTIONS.numberOfIndicators; n++) {
      result.push(
        window.L.marker(
          getMiddlePoint(
            coordinates[i],
            coordinates[i - 1],
            n / (DEFAULT_OPTIONS.numberOfIndicators + 1),
            leafletMap
          ),
          {
            icon: icon,
          }
        )
      );
    }
  }

  return result;
};

const createLeafletDivIcon = (coordinate) => {
  return window.L.divIcon({
    className: "direction-indicator",
    bgPos: [5, 5],
    html: `
      <div style="color: ${
        DEFAULT_OPTIONS.color
      }; transform: rotate(${calculateIndicatorAngle(
      coordinates[i - 1],
      coordinates[i],
      -1
    )});">▶</div>
    `,
  });
};

const calculateIndicatorAngle = (firstCoordinate, secondCoordinate, coef) => {
  let dy = secondCoordinate[0] - firstCoordinate[0];
  let dx = secondCoordinate[1] - firstCoordinate[1];
  let theta = Math.cos((Math.PI / 180) * firstCoordinate[0]) * dx;
  let angle = (Math.atan2(dy, theta) / Math.PI) * 180 * coef;

  return angle.toFixed(2);
};

const getMiddlePoint = (
  firstCoordinate,
  secondCoordinate,
  howMany,
  leafletMap
) => {
  let x = leafletMap.project(new window.L.latLng(firstCoordinate));
  let y = leafletMap.project(new window.L.latLng(secondCoordinate));
  let halfDistance = getDistance(x, y) * howMany;
  let distance = getDistance(x, y);

  if (halfDistance === 0) return leafletMap.unproject(x);

  if (distance > halfDistance) {
    let ratio = (distance - halfDistance) / distance;
    let result = leafletMap.unproject(
      new Point(x.x - ratio * (y.x - x.x), y.y - ratio * (y.y - x.y))
    );
    return [result.lat, result.lng];
  }
};

const getDistance = (pointOne, pointTwo) => {
  let x = pointTwo.x - pointOne.x;
  let y = pointTwo.y - pointOne.y;

  return Math.sqrt(x * x + y * y);
};

function Point(x, y, round) {
  this.x = round ? Math.round(x) : x;
  this.y = round ? Math.round(y) : y;
}
