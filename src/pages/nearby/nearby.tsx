import { Component } from "react";

interface NearbyState {
  nearestCodes: Array<string>;
  nearestDetails: Array<{
    distance: number;
    code: string;
    name: string;
    location: string;
    status: string;
    type: string;
  }>;
}

export default class Nearby extends Component<any, NearbyState> {
  constructor(props: any, state: any) {
    super(props, state);
    this.state = {
      nearestCodes: [],
      nearestDetails: []
    };
  }

  // ACTIONS
  // getNearestCaches(): void {
  //   navigator.geolocation.getCurrentPosition(
  //     (position: Position) => {
  //       this.setState({ currentPosition: position });
  //       this.handleCurrentPosition.call(this, position);
  //     },
  //     _ => {
  //       this.setState({
  //         error: "Please allow location services for this browser"
  //       });
  //     }
  //   );
  // }
  // handleCurrentPosition(position: Position): void {
  //   this.fetchCachesNearest(position).then(this.handleCachesNearest.bind(this));
  // }

  // handleCachesNearest(response: CachesNearestResponse): void {
  //   this.setState({ nearestCodes: response.results });
  //   this.fetchCachesDetails(this.state.nearestCodes).then(
  //     this.handleCachesDetails.bind(this)
  //   );
  // }

  // handleCachesDetails(response: CachesDetailsResponse): void {
  //   let nearestDetails = [];
  //   for (let code of this.state.nearestCodes) {
  //     nearestDetails.push({
  //       distance: calculateGeoPointMeterDistance(
  //         {
  //           lat: this.state.currentPosition!.coords.latitude,
  //           lon: this.state.currentPosition!.coords.longitude
  //         },
  //         {
  //           lat: +response[code].location.split("|")[0],
  //           lon: +response[code].location.split("|")[1]
  //         }
  //       ),
  //       ...response[code]
  //     });
  //   }
  //   this.setState({ nearestDetails: nearestDetails });
  // }

  renderCache(cache: any) {
    let nameStyle = {
      margin: 0
    };
    return (
      <div>
        <div className="container" style={{ padding: "10px" }}>
          <h3 style={nameStyle}>{cache.name}</h3>
          <p>
            Dystans: {Math.round(cache.distance)}m | Typ: {cache.type} | Ocena:{" "}
            {cache.rating} | Rozmiar: {cache.size2} | Teren: {cache.terrain} |
            Rekomendacje: {cache.recommendations}
          </p>
        </div>
        <hr style={{ border: 0, borderBottom: "1px solid #eee" }} />
      </div>
    );
  }

  render() {
    return (
      <div className="Nearby">
        {this.state.nearestDetails.map(cache => this.renderCache(cache))}
      </div>
    );
  }
}
