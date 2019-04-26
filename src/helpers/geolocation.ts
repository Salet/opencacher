import { Geopoint } from "../interfaces/geolocation";

export function calculateGeoPointMeterDistance(
  a: Geopoint,
  b: Geopoint
): number {
  let latitudeDistance =
    (b.latitude * Math.PI) / 180 - (a.latitude * Math.PI) / 180;
  let longitudeDistance =
    (b.longitude * Math.PI) / 180 - (a.longitude * Math.PI) / 180;
  let haversine =
    Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
    Math.cos((a.latitude * Math.PI) / 180) *
      Math.cos((b.latitude * Math.PI) / 180) *
      Math.sin(longitudeDistance / 2) *
      Math.sin(longitudeDistance / 2);
  return (
    6378.137 *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)) *
    1000
  );
}
