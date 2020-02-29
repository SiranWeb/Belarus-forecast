import {fetchWeather, fetchForecast} from './weather.js';
import {citySelect, cityName, imgWeather, weatherDescrp, cityTemp, windArrow, windSpeed, dateElem, visibilityElem, humidityElem, pressureElem} from './elements.js';

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
    cityName.innerHTML = `${data.name == 'Hrodna' ? 'Grodno' : data.name}, `; // Grodno name fix
    const weatherDate = new Date();
    dateElem.innerHTML = `${weatherDate.getDayString()}, ${weatherDate.getHours()}:${weatherDate.getMinutes()}`;
    imgWeather.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherDescrp.innerHTML = data.weather[0].description;
    cityTemp.innerHTML = Math.floor(data.main.temp - 273.15) + '°С';
    windArrow.style.transform = `rotate(${data.wind.deg + 90}deg)`;
    windSpeed.innerHTML = `${data.wind.speed} m/s`;
    visibilityElem.innerHTML = `Visibility: ${data.visibility / 1000} km`;
    humidityElem.innerHTML = `Humidity: ${data.main.humidity}%`;
    pressureElem.innerHTML = `Pressure: ${data.main.pressure} mbar`;
};

getWeather();

citySelect.addEventListener('change', () => getWeather(citySelect.options[citySelect.selectedIndex].value));