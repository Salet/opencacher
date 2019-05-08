import React from "react";
import "./compass.css";

const Compass = ({ heading, bearing, distance }: { heading: number; bearing: number; distance: number }) => {
  return (
    <div className="Compass">
      <div className="Compass-background" style={{ transform: `rotateZ(${360 - heading}deg)` }}>
        <span className="Compass-north">N</span>
      </div>
      <div className="Compass-cache" style={{ transform: `rotateZ(${360 - heading + bearing}deg)` }}>
        |
      </div>
      <div className="Compass-front">
        <br />|
      </div>
      <div className="Compass-distance">{distance.toFixed(2)}m</div>
    </div>
  );
};

export default Compass;
