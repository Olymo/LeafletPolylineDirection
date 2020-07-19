let DEFAULT_OPTIONS = {
  numberOfIndicators: 1,
  color: "blue",
};

const createDirectionIndicators = (coordinates, leafletMap, options) => {
  try {
    validateParameters(coordinates, leafletMap, options);
    overrideDefaultOptions(options);
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
    DEFAULT_OPTIONS.numberOfIndicators = options.color;
  }
};
