var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect } from "react";
var WeatherCard = function () {
    var _a = useState(null), weatherData = _a[0], setWeatherData = _a[1];
    var _b = useState("Unknown Region"), regionName = _b[0], setRegionName = _b[1];
    var _c = useState("Unknown City"), city = _c[0], setCity = _c[1];
    var _d = useState(null), error = _d[0], setError = _d[1];
    var _e = useState(new Date()), currentTime = _e[0], setCurrentTime = _e[1];
    var getTimeOfDayClass = function () {
        var currentHour = currentTime.getHours();
        return currentHour >= 6 && currentHour < 18 ? "daytime" : "nighttime";
    };
    var getWeatherIcon = function (code) {
        var currentHour = currentTime.getHours();
        if (currentHour >= 6 && currentHour < 18 && code >= 0 && code <= 4) {
            return "https://img.icons8.com/ios/100/FFFFFF/sun--v1.png";
        }
        else if (code >= 45 && code <= 67) {
            return "https://img.icons8.com/ios/100/FFFFFF/rain--v1.png";
        }
        else if (code >= 71 && code <= 86) {
            return "https://img.icons8.com/ios/100/FFFFFF/snow.png";
        }
        else if (code === 95 || code === 96 || code === 99) {
            return "https://img.icons8.com/ios/100/FFFFFF/cloud-lighting--v1.png";
        }
        else if (currentHour >= 18 &&
            currentHour < 24 &&
            code >= 0 &&
            code <= 4) {
            return "https://img.icons8.com/ios/100/FFFFFF/crescent-moon.png";
        }
    };
    useEffect(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
                console.log("Latitude: ".concat(latitude, ", Longitude: ").concat(longitude));
                fetchWeatherData(latitude, longitude);
                fetchRegionName();
            }, function (error) {
                setError("Unable to retrieve your location");
            });
        }
        else {
            setError("Geolocation is not supported by this browser");
        }
        var timer = setInterval(function () {
            setCurrentTime(new Date());
        }, 1000);
        return function () { return clearInterval(timer); };
    }, []);
    var fetchWeatherData = function (lat, lon) { return __awaiter(void 0, void 0, void 0, function () {
        var url, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.open-meteo.com/v1/forecast?latitude=".concat(lat, "&longitude=").concat(lon, "&hourly=temperature_2m,weathercode&current_weather=true");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.current_weather) {
                        setWeatherData(data.current_weather);
                    }
                    else {
                        setError("Weather data not available");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    setError("Failed to fetch weather data");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var fetchRegionName = function () { return __awaiter(void 0, void 0, void 0, function () {
        var url, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://ip-api.com/json/";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.status === "success") {
                        setRegionName(data.regionName || "Unknown Region");
                        setCity(data.city || "Unknown City");
                    }
                    else {
                        setRegionName("Unknown Region");
                        setCity("Unknown City");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Failed to fetch region name", error_2);
                    setRegionName("Unknown Region");
                    setCity("Unknown City");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getWeatherDescription = function (code) {
        if (code >= 0 && code <= 4) {
            return "Sunny";
        }
        else if (code >= 45 && code <= 67) {
            return "Rainy";
        }
        else if (code >= 71 && code <= 86) {
            return "Snow";
        }
        else if (code === 95 || code === 96 || code === 99) {
            return "Thunderstorm";
        }
        else {
            return "Unknown Weather";
        }
    };
    if (error) {
        return React.createElement("div", { className: "card" }, error);
    }
    if (!weatherData) {
        return React.createElement("div", { className: "card" }, "Loading...");
    }
    return (React.createElement("div", { className: "card ".concat(getTimeOfDayClass()) },
        React.createElement("section", { className: "info-section" },
            React.createElement("div", { className: "background-design" },
                React.createElement("div", { className: "circle" }),
                React.createElement("div", { className: "circle" }),
                React.createElement("div", { className: "circle" })),
            React.createElement("div", { className: "left-side" },
                React.createElement("div", { className: "weather" },
                    React.createElement("div", { className: "weather-icon" },
                        React.createElement("img", { src: getWeatherIcon(weatherData.weathercode), alt: getWeatherDescription(weatherData.weathercode) })),
                    React.createElement("div", { className: "weather-description" }, getWeatherDescription(weatherData.weathercode))),
                React.createElement("div", { className: "temperature" },
                    Math.round(weatherData.temperature),
                    "\u00B0C")),
            React.createElement("div", { className: "right-side" },
                React.createElement("div", null,
                    React.createElement("div", { className: "hour" }, currentTime.toLocaleTimeString()),
                    React.createElement("div", { className: "date" }, currentTime.toLocaleDateString())),
                React.createElement("div", { className: "city" },
                    city,
                    ",",
                    regionName)))));
};
export default WeatherCard;
