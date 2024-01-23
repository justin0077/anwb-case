import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Hier heb ik de interface voor de current weather
export interface CurrentWeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

// Hier heb ik de interface voor de voorspellingen
export interface ForecastWeatherData {
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
}

// Dit is de functie voor het ophalen van de current weather
export const fetchWeatherData = (location: string) => {
  const { data, isError } = useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=nl&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      return response.data;
    },
  });

  return { data };
};

export const fetchForecastData = (location: string) => {
  const { data, isError } = useQuery({
    queryKey: ["forecast", location],
    queryFn: async () => {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&lang=nl&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      return response.data;
    },
  });

  return { data };
};
