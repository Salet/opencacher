import { API_URL, CONSUMER_KEY } from "./constants";

interface CachesDetailsResponse {
  [code: string]: {
    code: string;
    name: string;
    location: string;
    status: string;
    type: string;
  };
}

interface CachesNearestResponse {
  results: Array<string>;
}

export default class CachesService {
  fetchCachesNearest(position: Position): Promise<CachesNearestResponse> {
    const ENDPOINT = "services/caches/search/nearest";
    const URL = `${API_URL}${ENDPOINT}${CONSUMER_KEY}&center=${
      position.coords.latitude
    }|${position.coords.longitude}`;
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
