import React, { useState, useEffect } from "react";

function Calendar() {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsNightMode(currentHour < 6 || currentHour >= 18);
  }, []);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: firstDayOfMonth }, () => null);

  return (
    <div className={`calendar ${isNightMode ? "nighttime" : "daytime"}`}>
      <h2>
        {today.toLocaleString("default", { month: "long" })} {currentYear}
      </h2>
      <div className="calendar-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {emptySlots.map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}
        {daysArray.map((day) => (
          <div
            key={day}
            className={`calendar-day ${day === currentDate ? "today" : ""}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
