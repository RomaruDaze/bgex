import React, { useEffect, useState } from "react";
function Background() {
    var _a = useState(""), imagePath = _a[0], setImagePath = _a[1];
    useEffect(function () {
        var randomImageNumber = Math.floor(Math.random() * 24) + 1;
        import("../assets/images/".concat(randomImageNumber, ".jpg"))
            .then(function (image) { return setImagePath(image.default); })
            .catch(function (err) { return console.error("Failed to load image", err); });
    }, []);
    return (React.createElement("div", { style: {
            backgroundImage: "url(".concat(imagePath, ")"),
            height: "100vh",
            width: "100vw",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        } }));
}
export default Background;
