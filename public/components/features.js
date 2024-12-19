import React from "react";
import Exrate from "./exrate";
import Weather from "./weather";
function Features() {
    return (React.createElement("div", { className: "features" },
        React.createElement(Weather, null),
        React.createElement("div", { className: "features-double" },
            React.createElement(Exrate, null))));
}
export default Features;
