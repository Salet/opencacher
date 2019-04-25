import React, { Component } from "react";
import "./app.css";

interface Orientation {
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;
}

interface AppState {
  geolocationObject: boolean;
  geolocationEnabled: boolean;
  geolocation: Position;
  orientationEvents: boolean;
  orientation: Orientation;
}

export default class App extends Component<any, AppState> {
  constructor(props: any, state: AppState) {
    super(props);
    this.state = {
      geolocationObject: !!navigator.geolocation,
      geolocationEnabled: false,
      geolocation: {
        timestamp: 0,
        coords: {
          latitude: 0,
          longitude: 0,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          heading: 0,
          speed: 0
        }
      },
      orientationEvents: false,
      orientation: {
        absolute: false,
        alpha: 0,
        beta: 0,
        gamma: 0
      }
    };

    window.addEventListener(
      "deviceorientation",
      this.handleOrientationEvent.bind(this),
      true
    );

    navigator.geolocation.watchPosition(
      this.handlePositionEvent.bind(this),
      this.handlePositionError.bind(this),
      { enableHighAccuracy: true }
    );
  }

  handlePositionEvent(position: Position) {
    if (!this.state.geolocationEnabled) {
      this.setState({ geolocationEnabled: true });
    }
  }

  handlePositionError(error: any) {
    this.setState({ geolocationEnabled: false });
  }

  handleOrientationEvent(event: DeviceOrientationEvent) {
    if (!this.state.orientationEvents) {
      this.setState({ orientationEvents: true });
    }
    this.setState({
      orientation: {
        absolute: event.absolute,
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0
      }
    });
  }

  render() {
    return (
      <div className="App">
        <ul>
          <li>
            Geolocation object: {this.state.geolocationObject ? "yes" : "no"}
          </li>
          <li>
            Geolocation enabled: {this.state.geolocationEnabled ? "yes" : "no"}
          </li>
          <li>Geolocation reading: {JSON.stringify(this.state.geolocation)}</li>
          <li>
            Device orientation events:{" "}
            {this.state.orientationEvents ? "yes" : "no"}
          </li>
          <li>Orientation reading: {JSON.stringify(this.state.orientation)}</li>
        </ul>
      </div>
    );
  }
}
