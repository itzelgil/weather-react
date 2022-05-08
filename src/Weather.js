import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Weather() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter a city" onChange={searchCity} />
      <input type="submit" value="Search" />
    </form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `a58132974e1508fb139cd5dab2b170ec`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemp);
  }

  function searchCity(event) {
    setCity(event.target.value);
  }

  function showTemp(response) {
    setWeather({
      temperature: Math.round(response.data.main.temp),
      humidity: Math.round(response.data.main.humidity),
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  return (
    <div>
      {form}
      <h3>The weather in {city} is: </h3>
      <ul className="datalist">
        <li>Temperature: {weather.temperature}ºC</li>
        <li>Humidity: {weather.humidity}%</li>
        <li>Description: {weather.description}</li>
        <li>Wind: {weather.wind}km/h</li>
        <li>
          <img src={weather.icon} alt={weather.description} />
        </li>
      </ul>
    </div>
  );
}
