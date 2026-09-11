import { useEffect, useState } from "react";
import getWeatherData from "../services/weatherApi";
import DisplayWeather from "./DisplayWeather";

const CountryCard = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  const {
    name,
    capital,
    area,
    flags,
    languages,
    capitalInfo: { latlng },
  } = country;

  useEffect(() => {
    getWeatherData(latlng[0], latlng[1]).then((data) => setWeatherData(data));
  }, [latlng]);

  return (
    <div>
      <h1>{name.common}</h1>
      <div>
        <p>Capital {capital}</p>
        <p>Area {area}</p>
      </div>
      <h2>Langauges</h2>
      <ul>
        {Object.entries(languages).map(([langCode, language]) => (
          <li key={langCode}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={`flag of ${name.common}`} />
      <div>
        <h2>Weather in {capital}</h2>
        {weatherData && <DisplayWeather weatherData={weatherData} />}
      </div>
    </div>
  );
};

export default CountryCard;
