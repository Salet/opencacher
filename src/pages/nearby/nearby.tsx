import React, { Component } from "react";
import { Geolocation } from '../../interfaces/geolocation';
import CachesService, { CachesNearestResponse, CachesDetailsResponse } from '../../services/caches';
import { calculateGeoPointMeterDistance } from '../../helpers/geolocation';
import './nearby.css';

interface NearbyProps {
  geolocation: Geolocation;
}

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

export default class Nearby extends Component<NearbyProps, NearbyState> {
  cachesService = new CachesService();

  constructor(props: NearbyProps, state: NearbyState) {
    super(props, state);
    this.state = {
      nearestCodes: [],
      nearestDetails: []
    };
    this.cachesService.fetchCachesNearest(this.props.geolocation).then(this.handleCachesNearest.bind(this));
  }

  componentDidUpdate(prevProps: NearbyProps) {
    if (this.props.geolocation.latitude !== prevProps.geolocation.latitude) {
      this.cachesService.fetchCachesNearest(this.props.geolocation).then(this.handleCachesNearest.bind(this));
    }
  }

  handleCachesNearest(response: CachesNearestResponse): void {
    this.setState({ nearestCodes: response.results });
    this.cachesService.fetchCachesDetails(this.state.nearestCodes).then(
      this.handleCachesDetails.bind(this)
    );
  }

  handleCachesDetails(response: CachesDetailsResponse): void {
    let nearestDetails = [];
    for (let code of this.state.nearestCodes) {
      nearestDetails.push({
        distance: calculateGeoPointMeterDistance(
          {
            latitude: this.props.geolocation.latitude,
            longitude: this.props.geolocation.longitude
          },
          {
            latitude: +response[code].location.split("|")[0],
            longitude: +response[code].location.split("|")[1]
          }
        ),
        ...response[code]
      });
    }
    this.setState({ nearestDetails: nearestDetails });
  }

  renderCache(cache: any) {
    return (
      <div className="Nearby-cache">
        <h3>{cache.name}</h3>
        <p>
          Dystans: {Math.round(cache.distance)}m | Typ: {cache.type} | Ocena:{" "}
          {cache.rating} | Rozmiar: {cache.size2} | Teren: {cache.terrain} |
          Rekomendacje: {cache.recommendations}
        </p>
        <hr className="Nearby-separator" />
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
