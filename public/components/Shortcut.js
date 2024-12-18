var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function Shortcut(_a) {
    var _this = this;
    var shortcuts = _a.shortcuts, onAddShortcut = _a.onAddShortcut;
    var _b = useState(false), showDialog = _b[0], setShowDialog = _b[1];
    var _c = useState(""), url = _c[0], setUrl = _c[1];
    var _d = useState(shortcuts), localShortcuts = _d[0], setLocalShortcuts = _d[1];
    var _e = useState({ visible: false, x: 0, y: 0, index: null }), tooltip = _e[0], setTooltip = _e[1];
    var _f = useState(false), isEditing = _f[0], setIsEditing = _f[1];
    var _g = useState(null), editIndex = _g[0], setEditIndex = _g[1];
    var _h = useState(null), draggedIndex = _h[0], setDraggedIndex = _h[1];
    var inputRef = useRef(null);
    var dialogRef = useRef(null);
    useEffect(function () {
        var storedShortcuts = localStorage.getItem("shortcuts");
        if (storedShortcuts) {
            setLocalShortcuts(JSON.parse(storedShortcuts));
        }
    }, []);
    useEffect(function () {
        if (showDialog && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showDialog]);
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (dialogRef.current &&
                !dialogRef.current.contains(event.target)) {
                setShowDialog(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    var handleAddShortcut = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var formattedUrl, iconUrl, updatedShortcuts, newShortcuts;
        return __generator(this, function (_a) {
            event.preventDefault();
            formattedUrl = url.startsWith("http://") || url.startsWith("https://")
                ? url
                : "https://".concat(url);
            if (new URL(formattedUrl).hostname.includes("github.com")) {
                iconUrl =
                    "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/100/external-github-community-for-software-building-and-testing-online-logo-shadow-tal-revivo.png";
            }
            else if (new URL(formattedUrl).hostname.includes("x.com")) {
                iconUrl = "https://img.icons8.com/color/480/twitterx--v1.png";
            }
            else if (new URL(formattedUrl).hostname.includes("whatsapp.com")) {
                iconUrl = "https://img.icons8.com/color/480/whatsapp--v1.png";
            }
            else if (new URL(formattedUrl).hostname.includes("icons8.com")) {
                iconUrl = "https://img.icons8.com/color/480/icons8-new-logo.png";
            }
            else if (new URL(formattedUrl).hostname.includes("mail.google.com")) {
                iconUrl = "https://img.icons8.com/fluency/240/gmail-new.png";
            }
            else if (new URL(formattedUrl).hostname.includes("calendar.google.com")) {
                iconUrl = "https://img.icons8.com/color/480/google-calendar--v2.png";
            }
            else if (new URL(formattedUrl).hostname.includes("spotify.com")) {
                iconUrl =
                    "https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-spotify-a-swedish-audio-streaming-platform-that-provides-drm-protected-logo-color-tal-revivo.png";
            }
            else {
                iconUrl =
                    "https://www.google.com/s2/favicons?sz=256&domain=" + formattedUrl;
            }
            if (isEditing && editIndex !== null) {
                updatedShortcuts = __spreadArray([], localShortcuts, true);
                updatedShortcuts[editIndex] = { url: formattedUrl, icon: iconUrl };
                setLocalShortcuts(updatedShortcuts);
                localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
            }
            else {
                newShortcuts = __spreadArray(__spreadArray([], localShortcuts, true), [
                    { url: formattedUrl, icon: iconUrl },
                ], false);
                setLocalShortcuts(newShortcuts);
                localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
                onAddShortcut(formattedUrl, iconUrl);
            }
            setUrl("");
            setShowDialog(false);
            setIsEditing(false);
            setEditIndex(null);
            return [2 /*return*/];
        });
    }); };
    var handleContextMenu = function (event, index) {
        event.preventDefault();
        setTooltip({ visible: true, x: event.clientX, y: event.clientY, index: index });
    };
    var handleEditShortcut = function () {
        if (tooltip.index !== null) {
            var currentUrl = localShortcuts[tooltip.index].url;
            currentUrl = currentUrl.replace(/^https?:\/\//, "");
            setUrl(currentUrl);
            setIsEditing(true);
            setEditIndex(tooltip.index);
            setShowDialog(true);
        }
        setTooltip(__assign(__assign({}, tooltip), { visible: false }));
    };
    var handleDeleteShortcut = function () {
        if (tooltip.index !== null) {
            var newShortcuts = localShortcuts.filter(function (_, i) { return i !== tooltip.index; });
            setLocalShortcuts(newShortcuts);
            localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
        }
        setTooltip(__assign(__assign({}, tooltip), { visible: false }));
    };
    var handleDragStart = function (index) {
        setDraggedIndex(index);
    };
    var handleDragOver = function (event) {
        event.preventDefault();
    };
    var handleDrop = function (index) {
        if (draggedIndex !== null && draggedIndex !== index) {
            var updatedShortcuts = __spreadArray([], localShortcuts, true);
            var movedShortcut = updatedShortcuts.splice(draggedIndex, 1)[0];
            updatedShortcuts.splice(index, 0, movedShortcut);
            setLocalShortcuts(updatedShortcuts);
            localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
        }
        setDraggedIndex(null);
    };
    return (React.createElement("div", { className: "shortcuts" },
        localShortcuts.map(function (shortcut, index) { return (React.createElement("a", { className: "shortcut-button", href: shortcut.url, key: index, onContextMenu: function (e) { return handleContextMenu(e, index); }, draggable: true, onDragStart: function () { return handleDragStart(index); }, onDragOver: handleDragOver, onDrop: function () { return handleDrop(index); } },
            React.createElement("img", { src: shortcut.icon, className: "shortcut-icon", onError: function (e) {
                    e.currentTarget.src =
                        "https://img.icons8.com/ios-filled/100/help.png";
                } }))); }),
        tooltip.visible && (React.createElement("div", { className: "tooltip", style: { top: tooltip.y, left: tooltip.x, position: "absolute" } },
            React.createElement("button", { onClick: handleEditShortcut }, "Edit"),
            React.createElement("button", { onClick: handleDeleteShortcut }, "Delete"))),
        React.createElement("button", { className: "shortcut-button-add", onClick: function () {
                setShowDialog(true);
                setIsEditing(false);
                setUrl("");
            } }, "+"),
        showDialog && (React.createElement("div", { className: "shortcut-dialog", ref: dialogRef },
            React.createElement("form", { onSubmit: handleAddShortcut },
                React.createElement("div", { className: "shortcut-dialog-url" },
                    React.createElement("p", null, "https://"),
                    React.createElement("input", { type: "text", placeholder: "example.com", value: url, onChange: function (e) { return setUrl(e.target.value); }, required: true, ref: inputRef })),
                React.createElement("button", { className: "submit-button", type: "submit" }, isEditing ? "Update" : "Add"),
                React.createElement("button", { className: "close-button", type: "button", onClick: function () { return setShowDialog(false); } },
                    React.createElement(FontAwesomeIcon, { icon: faXmark })))))));
}
export default Shortcut;
