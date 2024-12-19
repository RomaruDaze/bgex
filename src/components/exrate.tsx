import React, { useEffect, useState } from "react";

function Exrate() {
  const [rates, setRates] = useState<{
    IDR: number;
    USD: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocalTime(latitude, longitude);
        },
        (error) => {
          console.error("Unable to retrieve your location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }

    fetch("https://api.frankfurter.dev/v1/latest?symbols=IDR,USD&base=JPY")
      .then((response) => response.json())
      .then((data) => {
        setRates(data.rates);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        setLoading(false);
      });
  }, []);

  const fetchLocalTime = async (lat: number, lon: number) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&current_weather=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.current_weather && data.current_weather.time) {
        setCurrentTime(new Date(data.current_weather.time));
      } else {
        console.error("Failed to fetch current weather time");
      }
    } catch (error) {
      console.error("Failed to fetch local time");
    }
  };

  const getTimeOfDayClass = (): string => {
    if (!currentTime) return "daytime";
    const currentHour = currentTime.getHours();
    return currentHour >= 6 && currentHour < 18 ? "daytime" : "nighttime";
  };

  if (loading || !currentTime) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`exrate-card ${getTimeOfDayClass()}`}>
      <h2>Rates</h2>
      <div className="exrate-rates">
        <div className="exrate-rate">
          <h3>IDR</h3>
          <p>{rates?.IDR}</p>
        </div>
        <div className="exrate-divider"></div>
        <div className="exrate-rate">
          <h3>USD</h3>
          <p>{rates?.USD}</p>
        </div>
      </div>
    </div>
  );
}

export default Exrate;
