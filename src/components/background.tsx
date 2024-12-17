import React, { useEffect, useState } from "react";

function Background() {
  const [imagePath, setImagePath] = useState<string>("");

  useEffect(() => {
    const randomImageNumber = Math.floor(Math.random() * 24) + 1;
    import(`../assets/images/${randomImageNumber}.jpg`)
      .then((image) => setImagePath(image.default))
      .catch((err) => console.error("Failed to load image", err));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${imagePath})`,
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}

export default Background;
