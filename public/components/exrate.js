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
import React, { useEffect, useState } from "react";
function Exrate() {
    var _this = this;
    var _a = useState(null), rates = _a[0], setRates = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), currentTime = _c[0], setCurrentTime = _c[1];
    useEffect(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
                fetchLocalTime(latitude, longitude);
            }, function (error) {
                console.error("Unable to retrieve your location");
            });
        }
        else {
            console.error("Geolocation is not supported by this browser");
        }
        fetch("https://api.frankfurter.dev/v1/latest?symbols=IDR,USD&base=JPY")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setRates(data.rates);
            setLoading(false);
        })
            .catch(function (error) {
            console.error("Error fetching exchange rates:", error);
            setLoading(false);
        });
    }, []);
    var fetchLocalTime = function (lat, lon) { return __awaiter(_this, void 0, void 0, function () {
        var url, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://worldtimeapi.org/api/timezone/Etc/GMT";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    setCurrentTime(new Date(data.datetime));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Failed to fetch local time");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getTimeOfDayClass = function () {
        if (!currentTime)
            return "daytime";
        var currentHour = currentTime.getHours();
        return currentHour >= 6 && currentHour < 18 ? "daytime" : "nighttime";
    };
    if (loading || !currentTime) {
        return React.createElement("div", null, "Loading...");
    }
    return (React.createElement("div", { className: "exrate-card ".concat(getTimeOfDayClass()) },
        React.createElement("h2", null, "Rates"),
        React.createElement("div", { className: "exrate-rates" },
            React.createElement("div", { className: "exrate-rate" },
                React.createElement("h3", null, "IDR"),
                React.createElement("p", null, rates === null || rates === void 0 ? void 0 : rates.IDR)),
            React.createElement("div", { className: "exrate-divider" }),
            React.createElement("div", { className: "exrate-rate" },
                React.createElement("h3", null, "USD"),
                React.createElement("p", null, rates === null || rates === void 0 ? void 0 : rates.USD)))));
}
export default Exrate;