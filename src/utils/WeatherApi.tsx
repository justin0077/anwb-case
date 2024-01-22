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
export const fetchWeatherData = async (
  location: string
): Promise<CurrentWeatherData> => {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=nl&limit=5&appid=8f36c76b9bdb9d301336fba4300e88db`
  );
  return response.data;
};

// Dit is de functie voor het ophalen van de forecast weather
export const fetchForecastData = async (
  location: string
): Promise<ForecastWeatherData> => {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&lang=nl&appid=8f36c76b9bdb9d301336fba4300e88db`
  );
  return response.data;
};
