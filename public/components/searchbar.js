import React from "react";
function SearchBar() {
    var handleSearch = function (event) {
        event.preventDefault();
        var query = event.currentTarget.elements.namedItem("q").value;
        window.location.href = "https://www.google.com/search?q=".concat(encodeURIComponent(query));
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
                React.createElement("input", { type: "text", className: "searchbar-input", maxLength: 2048, name: "q", autoCapitalize: "off", autoComplete: "off", title: "Search", role: "combobox", placeholder: "Search Google" })))));
}
export default SearchBar;
