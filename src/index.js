import {fetchWeather, fetchForecast} from './weather.js';

const testCity = 'Minsk';

function getWeather() {
    fetchWeather(testCity)
    .then(data => console.log(data));
};
