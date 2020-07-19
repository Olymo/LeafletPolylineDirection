module.exports = function drawDirectionArrows(
  latlngs,
  color,
  numberOfArrows,
  map
) {
  if (
    typeof latlngs === undefined ||
    latlngs == null ||
    !latlngs.length ||
    latlngs.length < 2
  ) {
    return [];
  }

  if (typeof numberOfArrows === undefined || numberOfArrows === null) {
    numberOfArrows = 1;
  }

  if (typeof color === "undefined" || color === null) {
    color = "color: blue";
  } else {
    color = "color: " + color;
  }

  var result = [];

  for (var i = 1; i < latlngs.length; i++) {
    var icon = window.L.divIcon({
      className: "arrow-icon",
      bgPos: [5, 5],
      html: `
        <div style="${color};transform: rotate(${getAngle(
        latlngs[i - 1],
        latlngs[i],
        -1
      ).toString()}deg)">▶</div>
      `,
    });

    for (var n = 1; n <= numberOfArrows; n++) {
      result.push(
        window.L.marker(
          midPoint(latlngs[i], latlngs[i - 1], n / (numberOfArrows + 1), map),
          { icon: icon }
        )
      );
    }
  }

  return result;
};

function getAngle(firstLatlng, secondLatlng, coef) {
  var dy = secondLatlng[0] - firstLatlng[0];
  var dx =
    Math.cos((Math.PI / 180) * firstLatlng[0]) *
    (secondLatlng[1] - firstLatlng[1]);
  var ang = (Math.atan2(dy, dx) / Math.PI) * 180 * coef;
  return ang.toFixed(2);
}

function midPoint(firstLatlng, secondLatlng, per, map) {
  if (!map) {
    throw new Error(
      "Map object is not defined. Can not proceed. Please check if you correctly passed the map parameter"
    );
  }

  var halfDist, dist, pOne, pTwo, ration;

  pOne = map.project(new window.L.latLng(firstLatlng));
  pTwo = map.project(new window.L.latLng(secondLatlng));
  halfDist = distance(pOne, pTwo) * per;

  if (halfDist === 0) return map.unproject(pOne);

  dist = distance(pOne, pTwo);

  if (dist > halfDist) {
    ratio = (dist - halfDist) / dist;
    var res = map.unproject(
      new Point(
        pTwo.x - ratio * (pTwo.x - pOne.x),
        pTwo.y - ratio * (pTwo.y - pOne.y)
      )
    );

    return [res.lat, res.lng];
  }
}

function distance(pOne, pTwo) {
  var x = pTwo.x - pOne.x;
  var y = pTwo.y - pOne.y;

  return Math.sqrt(x * x + y * y);
}

function Point(x, y, round) {
  this.x = round ? Math.round(x) : x;
  this.y = round ? Math.round(y) : y;
}
