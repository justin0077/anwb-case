import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Search from "./Search";
import Forecast from "./Forecast";
import { fetchWeatherData, fetchForecastData } from "../utils/WeatherApi";

// Hier haal de types op voor mijn useState
import { CurrentWeatherData, ForecastWeatherData } from "../utils/WeatherApi";

const Weather: React.FC = () => {
  // Hier maak ik use states. De eerste is voor de locatie, de tweede voor de currentdata en de derde is voor de forecast data.
  const [location, setLocation] = useState<string>("Den Haag");
  const [data, setData] = useState<CurrentWeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastWeatherData | null>(
    null
  );
  const [animationKey, setAnimationKey] = useState(0);

  // Hier wordt de data gefetched
  const fetchData = async () => {
    try {
      const currentWeatherData = await fetchWeatherData(location);
      const forecastWeatherData = await fetchForecastData(location);

      setData(currentWeatherData);
      setForecastData(forecastWeatherData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchData();
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <section className="weather">
      <Search
        location={location}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {data ? (
        <motion.div key={animationKey} className="weather__output">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="weather__output-location"
          >
            {data.name}
          </motion.h1>
          <div className="weather__output-temp">
            <motion.img
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
              className="weather__output-icon"
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            />
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
            >
              {data.main.temp.toFixed(0)}
              <span>°C</span>
            </motion.h1>
          </div>

          <motion.p
            className="weather__output-description"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeIn" }}
          >
            {data.weather[0].description}
          </motion.p>

          <motion.p
            className="weather__output-wind"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }}
          >
            Windsnelheid: {(data.wind.speed * 3.6).toFixed(1)} km/h
          </motion.p>

          <motion.hr
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeIn" }}
          />

          <Forecast forecastData={forecastData} />
        </motion.div>
      ) : (
        <h1>Weerinformatie ophalen</h1>
      )}
    </section>
  );
};

export default Weather;
