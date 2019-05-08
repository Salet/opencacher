import React, { Component } from "react";
import { CacheDetailsWithDistance, CacheDetailsExtended, CacheLog } from "../../interfaces/caches";
import CachesService from "../../services/caches";
import { calculateGeoPointMeterDistance, calculateGeoPointDegreeBearing } from "../../helpers/geolocation";
import { Geolocation } from "../../interfaces/geolocation";
import CompassComponent from "../../components/compass/compass";
import "./details.css";

interface DetailsProps {
  cache: CacheDetailsWithDistance;
  geolocation: Geolocation;
  heading: number;
  onRefreshGeolocation: Function;
}

interface DetailsState {
  cache: CacheDetailsExtended;
  bearing: number;
  distance: number;
  tab: Tabs;
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

type Tabs = "description" | "logs" | "compass" | "photos";

export default class Details extends Component<DetailsProps, DetailsState> {
  cachesService = new CachesService();
  interval: any;

  constructor(props: DetailsProps) {
    super(props);
    this.state = {
      cache: { ...EMPTY_CACHE, ...props.cache },
      bearing: 0,
      distance: 0,
      tab: "description"
    };

    this.interval = setInterval(() => {
      this.props.onRefreshGeolocation();
    }, 300);
  }

  componentDidMount() {
    this.cachesService.fetchCacheDetails(this.props.cache.code).then(response => {
      let extendedCache: CacheDetailsExtended = {
        ...this.state.cache,
        ...response
      };
      this.setState({ cache: extendedCache });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps: DetailsProps) {
    if (
      this.props.geolocation.latitude !== prevProps.geolocation.latitude ||
      this.props.geolocation.longitude !== prevProps.geolocation.longitude
    ) {
      this.setState({
        bearing: calculateGeoPointDegreeBearing(
          {
            latitude: this.props.geolocation.latitude,
            longitude: this.props.geolocation.longitude
          },
          {
            latitude: +this.props.cache.location.split("|")[0],
            longitude: +this.props.cache.location.split("|")[1]
          }
        ),
        distance: calculateGeoPointMeterDistance(
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
    }
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

  switchTab(tab: Tabs) {
    this.setState({ tab });
  }

  renderCompass() {
    return (
      <div className="Compass">
        <div className="Compass-background" style={{ transform: `rotateZ(${360 - this.props.heading}deg)` }}>
          <span className="Compass-north">N</span>
        </div>
        <div
          className="Compass-cache"
          style={{
            transform: `rotateZ(${360 - this.props.heading + this.state.bearing}deg)`
          }}
        >
          |
        </div>
        <div className="Compass-front">
          <br />|
        </div>
        <div className="Compass-distance">{this.state.distance.toFixed(2)}m</div>
      </div>
    );
  }

  renderTab() {
    switch (this.state.tab) {
      case "description":
        return <div dangerouslySetInnerHTML={{ __html: this.state.cache.description }} />;
      case "logs":
        return <div>{this.state.cache.latest_logs.map(this.renderLog)}</div>;
      case "compass":
        return (
          <CompassComponent heading={this.props.heading} bearing={this.state.bearing} distance={this.state.distance} />
        );
    }
  }

  render() {
    return (
      <div>
        <h3>{this.state.cache.name}</h3>
        <h5>{this.state.cache.code}</h5>
        <br />
        <p>
          <b>Status:</b> {this.state.cache.status}
        </p>
        <p>
          <b>Typ:</b> {this.state.cache.type}
        </p>
        <p>
          <b>Ocena:</b> {this.state.cache.rating}/5
        </p>
        <p>
          <b>Rekomendacje:</b> {this.state.cache.recommendations}
        </p>
        <p>
          <b>Rozmiar:</b> {this.state.cache.size2}
        </p>
        <p>
          <b>Trudność:</b> {this.state.cache.difficulty}/5
        </p>
        <p>
          <b>Teren:</b> {this.state.cache.terrain}/5
        </p>
        <p>
          <b>GPS:</b> {this.state.cache.location.split("|").join(" ")}
        </p>
        <ul className="Tabs">
          <li
            className={`Tabs-single ${this.state.tab == "description" ? "Tabs-single--active" : ""}`}
            onClick={_ => this.switchTab("description")}
          >
            Opis
          </li>
          <li
            className={`Tabs-single ${this.state.tab == "logs" ? "Tabs-single--active" : ""}`}
            onClick={_ => this.switchTab("logs")}
          >
            Logi
          </li>
          <li
            className={`Tabs-single ${this.state.tab == "compass" ? "Tabs-single--active" : ""}`}
            onClick={_ => this.switchTab("compass")}
          >
            Kompas
          </li>
          <li
            className={`Tabs-single ${this.state.tab == "photos" ? "Tabs-single--active" : ""}`}
            onClick={_ => this.switchTab("photos")}
          >
            Zdjęcia
          </li>
        </ul>
        {this.renderTab()}
      </div>
    );
  }
}
