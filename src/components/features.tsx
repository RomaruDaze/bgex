import React from "react";
import Exrate from "./exrate";
import Weather from "./weather";
import Calendar from "./calendar";

function Features() {
  return (
    <div className="features">
      <Weather />
      <div className="features-double">
        <Exrate />
        <Calendar />
      </div>
    </div>
  );
}

export default Features;
