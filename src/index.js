import {fetchWeather, fetchForecast} from './weather.js';
import * as elem from './elements.js';
const testCity = 'Minsk';

function getWeather() {
    fetchWeather(testCity)
    .then(data => console.log(data));
};

getWeather();

console.log(elem.cityName);