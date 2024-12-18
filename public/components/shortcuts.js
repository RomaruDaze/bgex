import React, { useState } from "react";
function Shortcuts(_a) {
    var onAddShortcut = _a.onAddShortcut, onClose = _a.onClose;
    var _b = useState(""), name = _b[0], setName = _b[1];
    var _c = useState(""), url = _c[0], setUrl = _c[1];
    var handleSubmit = function (event) {
        event.preventDefault();
        onAddShortcut(name, url);
        onClose();
    };
    return (React.createElement("div", { className: "shortcut-dialog" },
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("input", { type: "text", placeholder: "Shortcut Name", value: name, onChange: function (e) { return setName(e.target.value); }, required: true }),
            React.createElement("input", { type: "url", placeholder: "Shortcut URL", value: url, onChange: function (e) { return setUrl(e.target.value); }, required: true }),
            React.createElement("button", { type: "submit" }, "Add Shortcut"),
            React.createElement("button", { type: "button", onClick: onClose }, "Cancel"))));
}
export default Shortcuts;
