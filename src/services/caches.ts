import { API_URL, CONSUMER_KEY } from "./constants";
import { Geopoint } from "../interfaces/geolocation";
import { CacheDetails } from "../interfaces/caches";

export interface CachesDetailsResponse {
  [code: string]: CacheDetails;
}

export interface CachesNearestResponse {
  results: Array<string>;
}

export default class CachesService {
  fetchCachesNearest(geopoint: Geopoint): Promise<CachesNearestResponse> {
    const ENDPOINT = "services/caches/search/nearest";
    const URL = `${API_URL}${ENDPOINT}${CONSUMER_KEY}&center=${
      geopoint.latitude
    }|${geopoint.longitude}`;
    return fetch(URL).then(response => response.json());
  }

  fetchCachesDetails(codes: Array<string>): Promise<CachesDetailsResponse> {
    const ENDPOINT = "services/caches/geocaches";
    const URL = `${API_URL}${ENDPOINT}${CONSUMER_KEY}&cache_codes=${codes.join(
      "|"
    )}&fields=code|name|location|type|status|size2|difficulty|terrain|rating|recommendations`;
    return fetch(URL).then(response => response.json());
  }
}
