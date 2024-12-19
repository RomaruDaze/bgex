import React, { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import Shortcut from "./Shortcut";
import Features from "./features";

function Background() {
  const [imagePath, setImagePath] = useState<string>("");
  const [shortcuts, setShortcuts] = useState<{ url: string; icon: string }[]>(
    []
  );

  useEffect(() => {
    const randomImageNumber = Math.floor(Math.random() * 23) + 1;
    import(`../assets/images/${randomImageNumber}.jpg`)
      .then((image) => setImagePath(image.default))
      .catch((err) => console.error("Failed to load image", err));
  }, []);

  const addShortcut = (url: string, icon: string) => {
    setShortcuts([...shortcuts, { url, icon }]);
  };

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${imagePath})`,
      }}
    >
      <Features />
      <SearchBar />
      <Shortcut shortcuts={shortcuts} onAddShortcut={addShortcut} />
    </div>
  );
}

export default Background;
