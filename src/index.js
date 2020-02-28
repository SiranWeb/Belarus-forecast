import {fetchWeather, fetchForecast} from './weather.js';
import {citySelect, cityName, imgWeather, weatherDescrp, cityTemp, windArrow, windSpeed, dateElem} from './elements.js';

function getWeather(city) {
    fetchWeather(city)
    .then(data => displayWeather(data));
};

Date.prototype.getDayString = function() {
    const day = this.getDay();
    switch(day) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
};

function displayWeather(data) {
    console.log(data);
    // Grodno name fix
    cityName.innerHTML = `${data.name == 'Hrodna' ? 'Grodno' : data.name}, `;
    const weatherDate = new Date();
    dateElem.innerHTML = `${weatherDate.getDayString()}, ${weatherDate.getHours()}:${weatherDate.getMinutes()}`;
    imgWeather.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherDescrp.innerHTML = data.weather[0].description;
    cityTemp.innerHTML = Math.floor(data.main.temp - 273.15) + '°С';
    windArrow.style.transform = `rotate(${data.wind.deg + 90}deg)`;
    windSpeed.innerHTML = `${data.wind.speed} m/s`;
};

getWeather();

citySelect.addEventListener('change', () => getWeather(citySelect.options[citySelect.selectedIndex].value));