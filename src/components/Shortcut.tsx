import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ShortcutProps {
  shortcuts: { url: string; icon: string }[];
  onAddShortcut: (url: string, icon: string) => void;
}

function Shortcut({ shortcuts, onAddShortcut }: ShortcutProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [localShortcuts, setLocalShortcuts] = useState(shortcuts);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    index: number | null;
  }>({ visible: false, x: 0, y: 0, index: null });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedShortcuts = localStorage.getItem("shortcuts");
    if (storedShortcuts) {
      setLocalShortcuts(JSON.parse(storedShortcuts));
    }
  }, []);

  useEffect(() => {
    if (showDialog && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showDialog]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setShowDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddShortcut = async (event: React.FormEvent) => {
    event.preventDefault();
    const formattedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    let iconUrl;
    if (new URL(formattedUrl).hostname.includes("github.com")) {
      iconUrl =
        "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/100/external-github-community-for-software-building-and-testing-online-logo-shadow-tal-revivo.png";
    } else if (new URL(formattedUrl).hostname.includes("x.com")) {
      iconUrl = "https://img.icons8.com/color/480/twitterx--v1.png";
    } else if (new URL(formattedUrl).hostname.includes("whatsapp.com")) {
      iconUrl = "https://img.icons8.com/color/480/whatsapp--v1.png";
    } else if (new URL(formattedUrl).hostname.includes("icons8.com")) {
      iconUrl = "https://img.icons8.com/color/480/icons8-new-logo.png";
    } else if (new URL(formattedUrl).hostname.includes("mail.google.com")) {
      iconUrl = "https://img.icons8.com/fluency/240/gmail-new.png";
    } else if (new URL(formattedUrl).hostname.includes("calendar.google.com")) {
      iconUrl = "https://img.icons8.com/color/480/google-calendar--v2.png";
    } else if (new URL(formattedUrl).hostname.includes("spotify.com")) {
      iconUrl = "https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-spotify-a-swedish-audio-streaming-platform-that-provides-drm-protected-logo-color-tal-revivo.png";
    } else {
      iconUrl = "https://img.icons8.com/color/480/cancel--v1.png";
    }

    if (isEditing && editIndex !== null) {
      const updatedShortcuts = [...localShortcuts];
      updatedShortcuts[editIndex] = { url: formattedUrl, icon: iconUrl };
      setLocalShortcuts(updatedShortcuts);
      localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
    } else {
      const newShortcuts = [
        ...localShortcuts,
        { url: formattedUrl, icon: iconUrl },
      ];
      setLocalShortcuts(newShortcuts);
      localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
      onAddShortcut(formattedUrl, iconUrl);
    }

    setUrl("");
    setShowDialog(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleContextMenu = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setTooltip({ visible: true, x: event.clientX, y: event.clientY, index });
  };

  const handleEditShortcut = () => {
    if (tooltip.index !== null) {
      let currentUrl = localShortcuts[tooltip.index].url;
      currentUrl = currentUrl.replace(/^https?:\/\//, "");
      setUrl(currentUrl);
      setIsEditing(true);
      setEditIndex(tooltip.index);
      setShowDialog(true);
    }
    setTooltip({ ...tooltip, visible: false });
  };

  const handleDeleteShortcut = () => {
    if (tooltip.index !== null) {
      const newShortcuts = localShortcuts.filter((_, i) => i !== tooltip.index);
      setLocalShortcuts(newShortcuts);
      localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
    }
    setTooltip({ ...tooltip, visible: false });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const updatedShortcuts = [...localShortcuts];
      const [movedShortcut] = updatedShortcuts.splice(draggedIndex, 1);
      updatedShortcuts.splice(index, 0, movedShortcut);
      setLocalShortcuts(updatedShortcuts);
      localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
    }
    setDraggedIndex(null);
  };

  return (
    <div className="shortcuts">
      {localShortcuts.map((shortcut, index) => (
        <a
          className="shortcut-button"
          href={shortcut.url}
          key={index}
          onContextMenu={(e) => handleContextMenu(e, index)}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
        >
          <img
            src={shortcut.icon}
            className="shortcut-icon"
            onError={(e) => {
              e.currentTarget.src =
                "https://img.icons8.com/ios-filled/100/help.png";
            }}
          />
        </a>
      ))}
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{ top: tooltip.y, left: tooltip.x, position: "absolute" }}
        >
          <button onClick={handleEditShortcut}>Edit</button>
          <button onClick={handleDeleteShortcut}>Delete</button>
        </div>
      )}
      <button
        className="shortcut-button-add"
        onClick={() => {
          setShowDialog(true);
          setIsEditing(false);
          setUrl("");
        }}
      >
        +
      </button>
      {showDialog && (
        <div className="shortcut-dialog" ref={dialogRef}>
          <form onSubmit={handleAddShortcut}>
            <div className="shortcut-dialog-url">
              <p>https://</p>
              <input
                type="text"
                placeholder="example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                ref={inputRef}
              />
            </div>
            <button className="submit-button" type="submit">
              {isEditing ? "Update" : "Add"}
            </button>
            <button
              className="close-button"
              type="button"
              onClick={() => setShowDialog(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Shortcut;
