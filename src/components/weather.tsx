import React, { useState, useEffect } from "react";

const WeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [regionName, setRegionName] = useState<string>("Unknown Region");
  const [city, setCity] = useState<string>("Unknown City");
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const getTimeOfDayClass = (): string => {
    const currentHour = currentTime.getHours();
    return currentHour >= 6 && currentHour < 18 ? "daytime" : "nighttime";
  };

  const getWeatherIcon = (code: number): string => {
    const currentHour = currentTime.getHours();
    let iconUrl = "";

    if (currentHour >= 6 && currentHour < 18 && code >= 0 && code <= 4) {
      iconUrl = "https://img.icons8.com/ios/100/FFFFFF/sun--v1.png";
    } else if (code >= 45 && code <= 67) {
      iconUrl = "https://img.icons8.com/ios/100/FFFFFF/rain--v1.png";
    } else if (code >= 71 && code <= 86) {
      iconUrl = "https://img.icons8.com/ios/100/FFFFFF/snow.png";
    } else if (code === 95 || code === 96 || code === 99) {
      iconUrl = "https://img.icons8.com/ios/100/FFFFFF/cloud-lighting--v1.png";
    } else if (
      (currentHour >= 0 && currentHour < 6) ||
      (currentHour >= 18 && currentHour < 24 && code >= 0 && code <= 4)
    ) {
      iconUrl = "https://img.icons8.com/ios/100/FFFFFF/bright-moon--v1.png";
    }

    return iconUrl;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          fetchWeatherData(latitude, longitude);
          fetchRegionName();
        },
        (error) => {
          setError("Unable to retrieve your location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchWeatherData = async (lat: number, lon: number) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&current_weather=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.current_weather) {
        setWeatherData(data.current_weather);
      } else {
        setError("Weather data not available");
      }
    } catch (error) {
      setError("Failed to fetch weather data");
    }
  };

  const fetchRegionName = async () => {
    const url = `http://ip-api.com/json/`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "success") {
        setRegionName(data.regionName || "Unknown Region");
        setCity(data.city || "Unknown City");
      } else {
        setRegionName("Unknown Region");
        setCity("Unknown City");
      }
    } catch (error) {
      console.error("Failed to fetch region name", error);
      setRegionName("Unknown Region");
      setCity("Unknown City");
    }
  };

  const getWeatherDescription = (code: number): string => {
    if (code >= 0 && code <= 4) {
      return "Sunny";
    } else if (code >= 45 && code <= 67) {
      return "Rainy";
    } else if (code >= 71 && code <= 86) {
      return "Snow";
    } else if (code === 95 || code === 96 || code === 99) {
      return "Thunderstorm";
    } else {
      return "Unknown Weather";
    }
  };

  if (error) {
    return <div className="card">{error}</div>;
  }

  if (!weatherData) {
    return <div className="card">Loading...</div>;
  }

  return (
    <div className={`card ${getTimeOfDayClass()}`}>
      <section className="info-section">
        <div className="background-design">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="left-side">
          <div className="weather">
            <div className="weather-icon">
              <img
                src={getWeatherIcon(weatherData.weathercode)}
                alt={getWeatherDescription(weatherData.weathercode)}
              />
            </div>
            <div className="weather-description">
              {getWeatherDescription(weatherData.weathercode)}
            </div>
          </div>
          <div className="temperature">
            {Math.round(weatherData.temperature)}°C
          </div>
        </div>
        <div className="right-side">
          <div>
            <div className="hour">{currentTime.toLocaleTimeString()}</div>
            <div className="date">{currentTime.toLocaleDateString()}</div>
          </div>
          <div className="city">
            {city},{regionName}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeatherCard;
