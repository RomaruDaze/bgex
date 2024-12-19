import React from "react";
import Exrate from "./exrate";
import Weather from "./weather";

function Features() {
  return (
    <div className="features">
      <Weather />
      <div className="features-double">
        <Exrate />
      </div>
    </div>
  );
}

export default Features;
