var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import Shortcut from "./Shortcut";
import Footer from "./footer";
function Background() {
    var _a = useState(""), imagePath = _a[0], setImagePath = _a[1];
    var _b = useState([]), shortcuts = _b[0], setShortcuts = _b[1];
    useEffect(function () {
        var randomImageNumber = Math.floor(Math.random() * 23) + 1;
        import("../assets/images/".concat(randomImageNumber, ".jpg"))
            .then(function (image) { return setImagePath(image.default); })
            .catch(function (err) { return console.error("Failed to load image", err); });
    }, []);
    var addShortcut = function (url, icon) {
        setShortcuts(__spreadArray(__spreadArray([], shortcuts, true), [{ url: url, icon: icon }], false));
    };
    return (React.createElement("div", { className: "background", style: {
            backgroundImage: "url(".concat(imagePath, ")"),
        } },
        React.createElement(SearchBar, null),
        React.createElement(Shortcut, { shortcuts: shortcuts, onAddShortcut: addShortcut }),
        React.createElement(Footer, null)));
}
export default Background;
