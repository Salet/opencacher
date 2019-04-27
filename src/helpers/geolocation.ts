import { Geopoint } from "../interfaces/geolocation";

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export function calculateGeoPointDegreeBearing(
  startPoint: Geopoint,
  endPoint: Geopoint
) {
  const startLat = toRadians(startPoint.latitude);
  const startLng = toRadians(startPoint.longitude);
  const endLat = toRadians(endPoint.latitude);
  const endLng = toRadians(endPoint.longitude);

  const y = Math.sin(endLng - startLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360;
}

export function calculateGeoPointMeterDistance(
  a: Geopoint,
  b: Geopoint
): number {
  const aLat = toRadians(a.latitude);
  const aLng = toRadians(a.longitude);
  const bLat = toRadians(b.latitude);
  const bLng = toRadians(b.longitude);
  const latDistance = bLat - aLat;
  const lngDistance = bLng - aLng;
  const haversine =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos(aLat) *
      Math.cos(bLat) *
      Math.sin(lngDistance / 2) *
      Math.sin(lngDistance / 2);
  return (
    6378.137 *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)) *
    1000
  );
}
