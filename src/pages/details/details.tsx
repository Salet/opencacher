import React, { Component } from "react";
import { CacheDetailsWithDistance } from "../../interfaces/caches";

interface DetailsProps {
  cache: CacheDetailsWithDistance | null;
}

interface DetailsState {
  cache: CacheDetailsWithDistance;
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
  recommendations: 0
};

export default class Details extends Component<DetailsProps, DetailsState> {
  constructor(props: DetailsProps) {
    super(props);
    this.state = {
      cache: EMPTY_CACHE
    };
  }

  componentWillMount() {
    this.setState({ cache: this.props.cache || EMPTY_CACHE });
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
        <br />
        <p>Ocena: {this.state.cache.rating}/5</p>
        <p>Rekomendacje: {this.state.cache.recommendations}</p>
        <br />
        <p>Rozmiar: {this.state.cache.size2}</p>
        <p>Trudność: {this.state.cache.difficulty}/5</p>
        <p>Teren: {this.state.cache.terrain}/5</p>
      </div>
    );
  }
}
