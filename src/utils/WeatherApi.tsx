import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Dit is de functie voor het ophalen van de current weather
export const fetchWeatherData = (location: string) => {
  const { data, isError } = useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=nl&limit=5&appid=${
            import.meta.env.VITE_API_KEY
          }`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // You can handle the error here, and optionally rethrow it if you want to propagate it further.
        throw isError;
      }
    },
  });

  return { data, isError };
};

export const fetchForecastData = (location: string) => {
  const { data, isError } = useQuery({
    queryKey: ["forecast", location],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&lang=nl&appid=${
            import.meta.env.VITE_API_KEY
          }`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // You can handle the error here, and optionally rethrow it if you want to propagate it further.
        throw isError;
      }
    },
  });

  return { data, isError };
};
