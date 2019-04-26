import React, { Component } from "react";
import "./app.css";
import Nearby from "../nearby/nearby";
import Details from "../details/details";
import { Geolocation } from "../../interfaces/geolocation";
import { CacheDetailsWithDistance } from "../../interfaces/caches";

type Pages = "nearby" | "details" | "debug";

interface Orientation {
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;
  webkitCompassHeading: number;
}

interface AppState {
  page: Pages;
  currentCache: CacheDetailsWithDistance | null;
  geolocationReliable: boolean;
  geolocationObject: boolean;
  geolocationEnabled: boolean;
  geolocation: Geolocation;
  orientationReliable: boolean;
  orientationRelativeEvents: boolean;
  orientationAbsoluteEvents: boolean;
  orientation: Orientation;
}

export default class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: "nearby",
      currentCache: null,
      geolocationReliable: false,
      geolocationObject: !!navigator.geolocation,
      geolocationEnabled: false,
      geolocation: {
        latitude: 0,
        longitude: 0,
        accuracy: 0
      },
      orientationReliable: false,
      orientationRelativeEvents: "ondeviceorientation" in window,
      orientationAbsoluteEvents: "ondeviceorientationabsolute" in window,
      orientation: {
        absolute: false,
        alpha: 0,
        beta: 0,
        gamma: 0,
        webkitCompassHeading: 0
      }
    };
  }

  componentWillMount() {
    window.addEventListener(
      this.state.orientationAbsoluteEvents
        ? "deviceorientationabsolute"
        : "deviceorientation",
      this.handleOrientationEvent.bind(this),
      true
    );

    if (this.state.geolocationObject) {
      navigator.geolocation.getCurrentPosition(
        this.handlePositionEvent.bind(this),
        () => { },
        { enableHighAccuracy: true }
      );
    }
  }

  handleOrientationEvent(event: any) {
    if (!this.state.orientationReliable) {
      this.setState({
        orientationReliable:
          !!event.webkitCompassHeading || (event.absolute && !!event.alpha)
      });
    }
    this.setState({
      orientation: {
        absolute: event.absolute || false,
        alpha: +(event.alpha || 0).toFixed(2),
        beta: +(event.beta || 0).toFixed(2),
        gamma: +(event.gamma || 0).toFixed(2),
        webkitCompassHeading: +(event.webkitCompassHeading || 0).toFixed(2)
      }
    });
  }

  handlePositionEvent(position: Position) {
    if (!this.state.geolocationEnabled) {
      this.setState({ geolocationEnabled: true });
    }
    if (!this.state.geolocationReliable) {
      this.setState({
        geolocationReliable:
          !!position.coords.latitude || !!position.coords.longitude
      });
    }
    this.setState({
      geolocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      }
    });
  }

  handleCacheClick(currentCache: CacheDetailsWithDistance) {
    this.setState({ currentCache });
    this.setPage("details");
  }

  setPage(page: Pages) {
    this.setState({ page });
  }

  render() {
    return (
      <div className="App">
        <h1>Opencacher</h1>
        <div className="App-menu">
          <a href="#" onClick={this.setPage.bind(this, "nearby")}>
            Nearby
          </a>{" "}
          |&nbsp;
          <a href="#" onClick={this.setPage.bind(this, "debug")}>
            Debug info
          </a>
        </div>

        {this.state.page == "debug" && (
          <div>
            <p>
              Geolocation object: {this.state.geolocationObject ? "yes" : "no"}
            </p>
            <p>
              Geolocation enabled:{" "}
              {this.state.geolocationEnabled ? "yes" : "no"}
            </p>
            <p>Geolocation reading: {JSON.stringify(this.state.geolocation)}</p>
            <b>
              Geolocation reliable:{" "}
              {this.state.geolocationReliable ? "yes" : "no"}
            </b>
            <p>-----</p>
            <p>
              Orientation relative events:{" "}
              {this.state.orientationRelativeEvents ? "yes" : "no"}
            </p>
            <p>
              Orientation absolute events:{" "}
              {this.state.orientationAbsoluteEvents ? "yes" : "no"}
            </p>
            <p>
              Orientation webkit events:{" "}
              {!!this.state.orientation.webkitCompassHeading ? "yes" : "no"}
            </p>
            <p>Orientation reading: {JSON.stringify(this.state.orientation)}</p>
            <b>
              Orientation reliable:{" "}
              {this.state.orientationReliable ? "yes" : "no"}
            </b>
          </div>
        )}

        {this.state.page == "nearby" && (
          this.state.geolocationReliable && (
            <Nearby
              geolocation={this.state.geolocation}
              onCacheClick={this.handleCacheClick.bind(this)}
            />) ||
          !this.state.geolocationEnabled && (
            <p>Please enable geolocation permission for your browser and this page to see nearby caches.</p>
          ) ||
          !this.state.geolocationObject && (
            <p>Device not supported :(</p>
          )
        )}

        {this.state.page == "details" && this.state.currentCache && (
          <Details cache={this.state.currentCache} />
        )}
      </div>
    );
  }
}
