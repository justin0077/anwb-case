import { useState, ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Search from "./Search";
import Forecast from "./Forecast";
import { fetchWeatherData, fetchForecastData } from "../utils/WeatherApi";

const Weather: React.FC = () => {
  // Hier maak ik use states. De eerste is voor de locatie, de tweede voor de currentdata en de derde is voor de forecast data.
  const [location, setLocation] = useState<string>("Den Haag");
  const [inputLocation, setInputLocation] = useState<string>("");
  const [animationKey, setAnimationKey] = useState(0);

  // Hier wordt de data gefetched
  const { data: weatherData, isError: weatherError } =
    fetchWeatherData(location);
  const { data: forecastData, isError: forecastError } =
    fetchForecastData(location);

  console.log(weatherData, forecastData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLocation(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAnimationKey((prevKey) => prevKey + 1);
    setLocation(inputLocation);
  };

  return (
    <section className="weather">
      <Search
        location={inputLocation}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {weatherError ? (
        <p>Deze stad bestaat niet! Probeer een andere stad</p>
      ) : (
        weatherData && (
          <motion.div key={animationKey} className="weather__output">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="weather__output-location"
            >
              {weatherData.name}
            </motion.h1>
            <div className="weather__output-temp">
              <motion.img
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
                className="weather__output-icon"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              />
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
              >
                {weatherData.main.temp.toFixed(0)}
                <span>°C</span>
              </motion.h1>
            </div>

            <motion.p
              className="weather__output-description"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeIn" }}
            >
              {weatherData.weather[0].description}
            </motion.p>

            <motion.p
              className="weather__output-wind"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }}
            >
              Windsnelheid: {(weatherData.wind.speed * 3.6).toFixed(1)} km/h
            </motion.p>

            <motion.hr
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeIn" }}
            />

            <Forecast forecastData={forecastData} />
          </motion.div>
        )
      )}{" "}
      <AnimatePresence>
        {!weatherError && !weatherData && (
          <motion.h1
            className="weather__retrieve"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            Weerinformatie ophalen
          </motion.h1>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Weather;
