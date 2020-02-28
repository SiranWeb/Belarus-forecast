import {fetchWeather, fetchForecast} from './weather.js';
import {citySelect, cityName, imgWeather, weatherDescrp, cityTemp, windArrow, windSpeed} from './elements.js';

function getWeather(city) {
    fetchWeather(city)
    .then(data => displayWeather(data));
};

function displayWeather(data) {
    console.log(data);
    // Grodno name fix
    cityName.innerHTML = data.name == 'Hrodna' ? 'Grodno' : data.name;
    imgWeather.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherDescrp.innerHTML = data.weather[0].description;
    cityTemp.innerHTML = Math.floor(data.main.temp - 273.15) + '°С';
    windArrow.style.transform = `rotate(${data.wind.deg + 90}deg)`;
    windSpeed.innerHTML = `${data.wind.speed} m/s`;
};

getWeather();

citySelect.addEventListener('change', () => getWeather(citySelect.options[citySelect.selectedIndex].value));