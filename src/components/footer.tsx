import React, { useState, useEffect, useRef } from "react";

interface FooterProps {
  onOptionSelect: (option: string) => void;
}

function Footer({ onOptionSelect }: FooterProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Newjeans");
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onOptionSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsTooltipVisible(false);
      }
    };

    if (isTooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTooltipVisible]);

  return (
    <div className="footer">
      <img
        src="https://img.icons8.com/fluency-systems-filled/144/FFFFFF/settings.png"
        alt="Settings"
        onClick={toggleTooltip}
        style={{ cursor: "pointer" }}
      />
      {isTooltipVisible && (
        <div className="tooltip" ref={tooltipRef}>
          <ul>
            <li
              className={selectedOption === "Mono" ? "default-option" : ""}
              onClick={() => handleOptionClick("Mono")}
            >
              Mono
            </li>
            <li
              className={selectedOption === "City" ? "default-option" : ""}
              onClick={() => handleOptionClick("City")}
            >
              City
            </li>
            <li
              className={selectedOption === "Newjeans" ? "default-option" : ""}
              onClick={() => handleOptionClick("Newjeans")}
            >
              Newjeans
            </li>
          </ul>
        </div>
      )}
      <img
        src="https://img.icons8.com/material-outlined/100/FFFFFF/image.png"
        alt="Image"
      />
    </div>
  );
}

export default Footer;
