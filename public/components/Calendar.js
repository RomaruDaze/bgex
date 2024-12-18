import React, { useState, useEffect } from "react";
function Calendar() {
    var _a = useState(false), isNightMode = _a[0], setIsNightMode = _a[1];
    useEffect(function () {
        var currentHour = new Date().getHours();
        setIsNightMode(currentHour < 6 || currentHour >= 18);
    }, []);
    var today = new Date();
    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();
    var currentDate = today.getDate();
    var firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    var daysArray = Array.from({ length: daysInMonth }, function (_, i) { return i + 1; });
    var emptySlots = Array.from({ length: firstDayOfMonth }, function () { return null; });
    return (React.createElement("div", { className: "calendar ".concat(isNightMode ? "nighttime" : "daytime") },
        React.createElement("h2", null,
            today.toLocaleString("default", { month: "long" }),
            " ",
            currentYear),
        React.createElement("div", { className: "calendar-grid" },
            ["S", "M", "T", "W", "T", "F", "S"].map(function (day) { return (React.createElement("div", { key: day, className: "calendar-day-header" }, day)); }),
            emptySlots.map(function (_, index) { return (React.createElement("div", { key: "empty-".concat(index), className: "calendar-day empty" })); }),
            daysArray.map(function (day) { return (React.createElement("div", { key: day, className: "calendar-day ".concat(day === currentDate ? "today" : "") }, day)); }))));
}
export default Calendar;
