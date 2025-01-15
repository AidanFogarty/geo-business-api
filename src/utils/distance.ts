interface Coordinates {
  lat: number;
  long: number;
}

export const haversineDistance = (pointA: Coordinates, pointB: Coordinates) => {
  const earthRadiusKm = 6371;

  const deltaLat = (pointB.lat - pointA.lat) * (Math.PI / 180);
  const deltaLong = (pointB.long - pointA.long) * (Math.PI / 180);

  const halfChordLength =
    Math.cos((pointA.lat * Math.PI) / 180) *
      Math.cos((pointB.lat * Math.PI) / 180) *
      Math.sin(deltaLong / 2) *
      Math.sin(deltaLong / 2) +
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2);

  const angularDistance =
    2 * Math.atan2(Math.sqrt(halfChordLength), Math.sqrt(1 - halfChordLength));

  return Number((earthRadiusKm * angularDistance).toFixed(2));
};
