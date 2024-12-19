import React, { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import Shortcut from "./Shortcut";
import Features from "./features";
import Footer from "./footer";

function Background() {
  const [imagePath, setImagePath] = useState<string>("");
  const [shortcuts, setShortcuts] = useState<{ url: string; icon: string }[]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem("selectedOption") || "Newjeans";
  });

  useEffect(() => {
    const loadImage = () => {
      const randomImageNumber = Math.floor(Math.random() * 23) + 1;
      import(
        `../assets/images/${selectedOption.toLowerCase()}/${randomImageNumber}.jpg`
      )
        .then((image) => setImagePath(image.default))
        .catch((err) => console.error("Failed to load image", err));
    };

    loadImage();
  }, [selectedOption]);

  const addShortcut = (url: string, icon: string) => {
    setShortcuts([...shortcuts, { url, icon }]);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("selectedOption", option);
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
      <Footer onOptionSelect={handleOptionSelect} />
    </div>
  );
}

export default Background;
