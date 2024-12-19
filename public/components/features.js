import React from "react";
import Exrate from "./exrate";
import Weather from "./weather";
import Calendar from "./calendar";
function Features() {
    return (React.createElement("div", { className: "features" },
        React.createElement(Weather, null),
        React.createElement("div", { className: "features-double" },
            React.createElement(Exrate, null),
            React.createElement(Calendar, null))));
}
export default Features;
