import {fetchWeather, fetchForecast} from './weather.js';
import {citySelect, cityName, imgWeather} from './elements.js';

function getWeather(city) {
    console.log(city);
    fetchWeather(city)
    .then(data => displayWeather(data));
};

function displayWeather(data) {
    console.log(data);
    cityName.innerHTML = data.name;
}

getWeather();

citySelect.addEventListener('change', () => getWeather(citySelect.options[citySelect.selectedIndex].value));

console.log(citySelect.options[citySelect.selectedIndex].value);