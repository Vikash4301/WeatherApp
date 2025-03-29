import React, { useEffect, useState } from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`, // Higher resolution icon
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Patna");
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && city.trim() !== "") {
      setSearchedCity(city);
      search(city);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#d8c9f2] text-black"
      }`}
    >
      
      <nav
        className={`w-full p-4 flex justify-between items-center fixed top-0 left-0 shadow-md transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-white"
        }`}
      >
        
        <div className="flex flex-col items-center">
          <img src="weatherlogo.jpg" alt="Logo" className="w-12 h-12" />
          <p className="text-60 font-bold">WeatherApp</p>
        </div>

        
        <div className="flex items-center">
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-72">
            <input
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-black text-lg"
            />
            <FaSearch
              className="text-gray-600 cursor-pointer text-xl"
              onClick={() => search(city)}
            />
          </div>

          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-2xl cursor-pointer transition-all duration-300 hover:scale-110 ml-4"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-200" />
            )}
          </button>
        </div>
      </nav>

      
      <div className="flex flex-col items-center justify-center mt-24">
        <h2 className="text-4xl font-bold text-blue-600 text-center">
          Get Instant Weather Updates
        </h2>
        <p className="text-gray-800 mt-3 text-lg text-center max-w-2xl">
          Check the latest weather details for any city worldwide. Stay updated
          with accurate forecasts and meteorological insights, including
          humidity and wind speed.
        </p>

        
        {searchedCity && weatherData && (
          <div
            className="mt-8 p-10 rounded-3xl shadow-2xl text-white w-96 text-center transition-all"
            style={{
              background: darkMode
                ? "linear-gradient(to bottom, #333, #555)"
                : "linear-gradient(to bottom, #4c9bd6, #673ab7)",
            }}
          >
            <img src={weatherData.icon} alt="Weather Icon" className="mx-auto w-32" />
            <p className="text-5xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-2xl mt-1">{weatherData.location}</p>

            <div className="flex justify-around mt-6">
              <div className="text-center">
                <p className="text-2xl font-semibold">{weatherData.humidity}%</p>
                <p className="text-lg">Humidity</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">{weatherData.windSpeed} km/h</p>
                <p className="text-lg">Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
