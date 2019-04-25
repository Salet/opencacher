export interface Geopoint {
  latitude: number;
  longitude: number;
}

export interface Geolocation extends Geopoint {
  accuracy: number;
}