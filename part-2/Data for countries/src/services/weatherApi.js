import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_API;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;
const getWeatherData = (lat, lon) => {
  return axios
    .get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then((response) => response.data);
};

export default getWeatherData;
