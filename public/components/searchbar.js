import React from "react";
function SearchBar() {
    var handleSearch = function (event) {
        event.preventDefault();
        var query = event.currentTarget.elements.namedItem("q").value;
        window.location.href = "https://www.google.com/search?q=".concat(encodeURIComponent(query));
    };
    var handleVoiceSearch = function () {
        if ("webkitSpeechRecognition" in window) {
            var recognition = new window.webkitSpeechRecognition();
            recognition.lang = "en-US";
            recognition.onresult = function (event) {
                var query = event.results[0][0].transcript;
                window.location.href = "https://www.google.com/search?q=".concat(encodeURIComponent(query));
            };
            recognition.start();
        }
        else {
            alert("Speech recognition not supported in this browser.");
        }
    };
    var handleLensClick = function (event) {
        event.preventDefault();
        window.open("https://lens.google.com/", "_blank");
    };
    return (React.createElement("form", { onSubmit: handleSearch, className: "searchbar" },
        React.createElement("div", { className: "searchbar-wrapper" },
            React.createElement("div", { className: "searchbar-left" },
                React.createElement("div", { className: "search-icon-wrapper" },
                    React.createElement("span", { className: "search-icon searchbar-icon" },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                            React.createElement("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }))))),
            React.createElement("div", { className: "searchbar-center" },
                React.createElement("div", { className: "searchbar-input-spacer" }),
                React.createElement("input", { type: "text", className: "searchbar-input", maxLength: 2048, name: "q", autoCapitalize: "off", autoComplete: "off", title: "Search", role: "combobox", placeholder: "Search Google" })),
            React.createElement("div", { className: "searchbar-right" },
                React.createElement("svg", { className: "voice-search", role: "button", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", onClick: handleVoiceSearch },
                    React.createElement("path", { fill: "#4285f4", d: "m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z" }),
                    React.createElement("path", { fill: "#34a853", d: "m11 18.08h2v3.92h-2z" }),
                    React.createElement("path", { fill: "#fbbc05", d: "m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z" }),
                    React.createElement("path", { fill: "#ea4335", d: "m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z" })),
                React.createElement("button", { className: "lens-button", onClick: handleLensClick, "aria-label": "Google Lens", type: "button" },
                    React.createElement("img", { src: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Google_Lens_Icon.svg", alt: "Google Lens" }))))));
}
export default SearchBar;
