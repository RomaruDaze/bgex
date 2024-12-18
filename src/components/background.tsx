import React, { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import Shortcut from "./Shortcut";
import Footer from "./footer";
<<<<<<< HEAD

=======
>>>>>>> 126dec79a8b74c2def93ce3a8cd90732ed47d806
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
      <SearchBar />
      <Shortcut shortcuts={shortcuts} onAddShortcut={addShortcut} />
      <Footer />
    </div>
  );
}

export default Background;
