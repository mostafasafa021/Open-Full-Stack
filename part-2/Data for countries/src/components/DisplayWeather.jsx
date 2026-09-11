const DisplayWeather = ({ weatherData }) => {
  const {
    main,
    wind,
    weather: [{ icon }],
  } = weatherData;
  const iconUrl = `https://openweathermap.org/payload/api/media/file/${icon}.png`;
  console.log(icon);
  return (
    <div>
      <p>Temperature {main.temp} Celsius</p>
      <img src={iconUrl} alt={weatherData.weather[0].description} />
      <p>Wind {wind.speed} m/s</p>
    </div>
  );
};

export default DisplayWeather;
