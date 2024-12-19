import React, { useState, useEffect, useRef } from "react";
function Footer(_a) {
    var onOptionSelect = _a.onOptionSelect;
    var _b = useState(false), isTooltipVisible = _b[0], setIsTooltipVisible = _b[1];
    var _c = useState("Newjeans"), selectedOption = _c[0], setSelectedOption = _c[1];
    var tooltipRef = useRef(null);
    var toggleTooltip = function () {
        setIsTooltipVisible(!isTooltipVisible);
    };
    var handleOptionClick = function (option) {
        setSelectedOption(option);
        onOptionSelect(option);
    };
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (tooltipRef.current &&
                !tooltipRef.current.contains(event.target)) {
                setIsTooltipVisible(false);
            }
        };
        if (isTooltipVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isTooltipVisible]);
    return (React.createElement("div", { className: "footer" },
        React.createElement("img", { src: "https://img.icons8.com/fluency-systems-filled/144/FFFFFF/settings.png", alt: "Settings", onClick: toggleTooltip, style: { cursor: "pointer" } }),
        isTooltipVisible && (React.createElement("div", { className: "tooltip", ref: tooltipRef },
            React.createElement("ul", null,
                React.createElement("li", { className: selectedOption === "Mono" ? "default-option" : "", onClick: function () { return handleOptionClick("Mono"); } }, "Mono"),
                React.createElement("li", { className: selectedOption === "City" ? "default-option" : "", onClick: function () { return handleOptionClick("City"); } }, "City"),
                React.createElement("li", { className: selectedOption === "Newjeans" ? "default-option" : "", onClick: function () { return handleOptionClick("NewJeans"); } }, "Newjeans")))),
        React.createElement("img", { src: "https://img.icons8.com/material-outlined/100/FFFFFF/image.png", alt: "Image" })));
}
export default Footer;
