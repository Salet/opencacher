import { GeoPoint } from "../interfaces/geolocation";

export function calculateGeoPointMeterDistance(
  a: GeoPoint,
  b: GeoPoint
): number {
  let latitudeDistance = (b.lat * Math.PI) / 180 - (a.lat * Math.PI) / 180;
  let longitudeDistance = (b.lon * Math.PI) / 180 - (a.lon * Math.PI) / 180;
  let haversine =
    Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(longitudeDistance / 2) *
      Math.sin(longitudeDistance / 2);
  return (
    6378.137 *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)) *
    1000
  );
}
