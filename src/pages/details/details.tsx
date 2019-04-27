import React, { Component } from "react";
import {
  CacheDetailsWithDistance,
  CacheDetailsExtended,
  CacheLog
} from "../../interfaces/caches";
import CachesService from "../../services/caches";
import {
  calculateGeoPointMeterDistance,
  calculateGeoPointDegreeBearing
} from "../../helpers/geolocation";
import { Geolocation } from "../../interfaces/geolocation";
import "./details.css";

interface DetailsProps {
  cache: CacheDetailsWithDistance;
  geolocation: Geolocation;
  phoneHeading: number;
}

interface DetailsState {
  cache: CacheDetailsExtended;
  bearing: number;
}

const EMPTY_CACHE = {
  distance: 0,
  code: "",
  name: "",
  location: "",
  status: "",
  type: "",
  size2: "",
  difficulty: 0,
  terrain: 0,
  rating: 0,
  recommendations: 0,
  description: "",
  latest_logs: []
};

export default class Details extends Component<DetailsProps, DetailsState> {
  cachesService = new CachesService();

  constructor(props: DetailsProps) {
    super(props);
    this.state = {
      cache: EMPTY_CACHE,
      bearing: 0
    };
  }

  componentWillMount() {
    this.setState({
      cache: { ...EMPTY_CACHE, ...this.props.cache },
      bearing: calculateGeoPointDegreeBearing(
        {
          latitude: this.props.geolocation.latitude,
          longitude: this.props.geolocation.longitude
        },
        {
          latitude: +this.props.cache.location.split("|")[0],
          longitude: +this.props.cache.location.split("|")[1]
        }
      )
    });
    this.cachesService
      .fetchCacheDetails(this.props.cache.code)
      .then(response => {
        let extendedCache: CacheDetailsExtended = {
          ...this.state.cache,
          ...response
        };
        this.setState({ cache: extendedCache });
      });
  }

  renderLog(log: CacheLog) {
    let logDate = new Date(log.date);
    return (
      <div key={log.uuid}>
        <b>
          {log.user.username} - {log.type} - {logDate.toLocaleString()}
        </b>
        <p dangerouslySetInnerHTML={{ __html: log.comment }} />
        <hr />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3>{this.state.cache.name}</h3>
        <h5>{this.state.cache.code}</h5>
        <br />
        <p>Status: {this.state.cache.status}</p>
        <p>Typ: {this.state.cache.type}</p>
        <p>Dystans: ~{Math.round(this.state.cache.distance)}m</p>
        <p>Lokacja: {this.state.cache.location.split("|").join(" ")}</p>
        <p>Kierunek: {this.state.bearing}</p>
        <br />
        <p>Ocena: {this.state.cache.rating}/5</p>
        <p>Rekomendacje: {this.state.cache.recommendations}</p>
        <br />
        <p>Rozmiar: {this.state.cache.size2}</p>
        <p>Trudność: {this.state.cache.difficulty}/5</p>
        <p>Teren: {this.state.cache.terrain}/5</p>
        <br />
        <hr />
        <hr />
        <br />
        <div className="Compass">
          <div
            className="Compass-background"
            style={{
              transform: `rotateZ(${360 - this.props.phoneHeading}deg)`
            }}
          >
            <span className="Compass-north">N</span>
          </div>
          <div
            className="Compass-cache"
            style={{
              transform: `rotateZ(${360 -
                this.props.phoneHeading +
                this.state.bearing}deg)`
            }}
          >
            |
          </div>
        </div>
        <br />
        <hr />
        <hr />
        <br />
        <div
          dangerouslySetInnerHTML={{ __html: this.state.cache.description }}
        />
        <br />
        <hr />
        <hr />
        <br />
        {this.state.cache.latest_logs.map(this.renderLog)}
      </div>
    );
  }
}
