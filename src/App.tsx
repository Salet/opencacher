import React, { Component, ReactNode } from "react";
import "./App.css";

const API_URL = "https://opencaching.pl/okapi/";
const KEY = "?consumer_key=8v5yBJfdTpcsxEnzUPah";

interface AppState {
  nearestCodes: Array<string>;
  nearestDetails: Array<{
    distance: number;
    code: string;
    name: string;
    location: string;
    status: string;
    type: string;
  }>
  error: string;
  currentPosition: Position | null;
}


interface CachesDetailsResponse {
  [code: string]: {
    code: string;
    name: string;
    location: string;
    status: string;
    type: string
  }
}

interface CachesNearestResponse {
  results: Array<string>;
}

class App extends Component<any, AppState> {
  constructor(props: any, state: AppState) {
    super(props);
    this.state = { nearestCodes: [], nearestDetails: [], error: "", currentPosition: null };

    if (navigator.geolocation) {
      this.getNearestCaches();
    } else {
      this.setState({ error: "No location services available" });
    }
  }


  // ACTIONS
  getNearestCaches(): void {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.setState({ currentPosition: position });
      this.handleCurrentPosition.call(this, position);
    }, _ => {
      this.setState({ error: "Please allow location services for this browser" });
    });
  }



  // HANDLERS
  handleCurrentPosition(position: Position): void {
    this.fetchCachesNearest(position).then(this.handleCachesNearest.bind(this));
  }

  handleCachesNearest(response: CachesNearestResponse): void {
    this.setState({ nearestCodes: response.results });
    this.fetchCachesDetails(this.state.nearestCodes).then(this.handleCachesDetails.bind(this));
  }

  handleCachesDetails(response: CachesDetailsResponse): void {
    let nearestDetails = [];
    for (let code of this.state.nearestCodes) {
      nearestDetails.push({
        distance: this.calculateDistance(
          this.state.currentPosition!.coords.latitude,
          this.state.currentPosition!.coords.longitude,
          +response[code].location.split('|')[0],
          +response[code].location.split('|')[1]
          ),
        ...response[code]
      });
    }
    this.setState({ nearestDetails: nearestDetails });
  }



  // HELPER FUNCTIONS
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    var R = 6378.137;
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000;
  }

  // API COMUNICATION
  fetchCachesNearest(position: Position): Promise<CachesNearestResponse> {
    const ENDPOINT = "services/caches/search/nearest";
    const URL = `${API_URL}${ENDPOINT}${KEY}&center=${
      position.coords.latitude
    }|${position.coords.longitude}`;
    return fetch(URL).then(response => response.json());
  }

  fetchCachesDetails(codes: Array<string>): Promise<CachesDetailsResponse> {
    const ENDPOINT = "services/caches/geocaches";
    const URL = `${API_URL}${ENDPOINT}${KEY}&cache_codes=${codes.join("|")}&fields=code|name|location|type|status|size2|difficulty|terrain|rating|recommendations`;
    return fetch(URL).then(response => response.json());
  }

  // RENDERING
  renderCache(cache: any) {
    let containerStyle = {
      border: '1px solid #eee',
      borderRadius: '3px',
      padding: '10px',
      marginBottom: '10px',
    };
    let nameStyle = {
      margin: 0
    }
    return (
      <div style={containerStyle}>
        <h3 style={nameStyle}>{cache.name}</h3>
        <p>Dystans: {Math.round(cache.distance)}m | Typ: {cache.type} | Ocena: {cache.rating} | Rozmiar: {cache.size2} | Teren: {cache.terrain} | Rekomendacje: {cache.recommendations}</p>
      </div>
    );
  }

  render(): ReactNode {
    let appStyle = {
      maxWidth: '1100px',
      margin: '0 auto',
    }

    return (
      <div style={appStyle}>
        { this.state.error }
        { this.state.nearestDetails.map(cache => this.renderCache(cache)) }
      </div>
    );
  }
}

export default App;
