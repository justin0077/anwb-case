import { motion } from "framer-motion";

interface ForecastProps {
  forecastData: {
    list: {
      dt_txt: string;
      weather: {
        icon: string;
        description: string;
      }[];
      main: {
        temp: number;
      };
    }[];
  };
}

const Forecast: React.FC<ForecastProps> = ({ forecastData }) => {
  const getDutchDay = (dateString: string) => {
    const daysOfWeek = [
      "Zondag",
      "Maandag",
      "Dinsdag",
      "Woensdag",
      "Donderdag",
      "Vrijdag",
      "Zaterdag",
    ];

    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: "easeIn" }}
      className="weather__forecast"
    >
      <ul>
        {forecastData.list
          .filter((forecastItem) => forecastItem.dt_txt.includes("12:00"))
          .slice(0, 3)
          .map((forecastItem, index) => (
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.2,
                ease: "easeIn",
              }}
              key={index}
            >
              <img
                className="weather__forecast-icon"
                src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`}
                alt={forecastItem.weather[0].description}
              />
              <span className="weather__forecast-day">
                {getDutchDay(forecastItem.dt_txt)}
              </span>
              <span className="weather__forecast-temp">
                {forecastItem.main.temp.toFixed(0)}°C
              </span>
            </motion.li>
          ))}
      </ul>
    </motion.div>
  );
};

export default Forecast;
