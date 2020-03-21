import {fetchWeather, fetchForecast} from './weather.js';
import {citySelect, cityName, imgWeather, weatherDescrp, cityTemp, windArrow, windSpeed, dateElem, visibilityElem, humidityElem, pressureElem, forecastDate, forecastCityTemp, imgForecastWeather, forecastWeatherDescrp} from './elements.js';
import {createChart} from './createChart.js'

const currentDate = new Date();
let forecastData, weatherData;
function getWeather(city) {
    fetchWeather(city)
    .then(data => {
        weatherData = data;
        return displayWeather(weatherData);
    });
};

function getForecast(city) {
    fetchForecast(city)
    .then(data => {
        forecastData = data;
        return displayForecast(forecastData);
    })
    .then(() => createChart(getDataForChart()));
};

Date.prototype.getDayString = function(day = this.getDay()) {
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
        default: 
            return `numDay: ${day}`;
    }
};

function displayWeather(data) {
    console.log(data);
    cityName.innerHTML = `${data.name == 'Hrodna' ? 'Grodno' : data.name}, `; // Grodno name fix
    dateElem.innerHTML = `${currentDate.getDayString()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    imgWeather.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherDescrp.innerHTML = data.weather[0].description;
    cityTemp.innerHTML = Math.floor(data.main.temp - 273.15) + '°С';
    windArrow.style.transform = `rotate(${data.wind.deg + 90}deg)`;
    windSpeed.innerHTML = `${data.wind.speed} m/s`;
    visibilityElem.innerHTML = `Visibility: ${data.visibility / 1000} km`;
    humidityElem.innerHTML = `Humidity: ${data.main.humidity}%`;
    pressureElem.innerHTML = `Pressure: ${data.main.pressure} mbar`;
};

function displayForecast(data) {
    console.log(data);
    for (let i = 0; i < 5; i++) {
        const dayName = (currentDate.getDay() + i) >= 7 ? currentDate.getDayString((currentDate.getDay() + i) % 7) : currentDate.getDayString(currentDate.getDay() + i);
        const dayAndMonth = data.list[i*8 + 3].dt_txt.substring(5, 10).split('-').reverse().join('.');
        forecastDate[i].innerHTML = `${dayName} (${dayAndMonth})`;
        forecastCityTemp[i].innerHTML =  Math.floor(data.list[i*8 + 3].main.temp - 273.15) + '°С';
        imgForecastWeather[i].src = `http://openweathermap.org/img/w/${data.list[i*8 + 3].weather[0].icon}.png`;
        forecastWeatherDescrp[i].innerHTML = `${data.list[i*8 + 3].weather[0].description}`;
    }
    
};

function getDataForChart() {
    let chartRows = [];
    let chartTicks = [];
    for (let i = 0; i <= 7; i++) {
        const currentItem = forecastData.list[i];
        const date = new Date(currentItem.dt * 1000);
        chartRows.push([[date.getHours(), 0, 0, 0], currentItem.main.temp - 273.15]);
        chartTicks.push([date.getHours(), 0, 0, 0]);
    }
    console.log(chartRows);
    return [chartRows, chartTicks];
};

function getWeatherAndForecast(city = 'Minsk') {
    getWeather(city);
    getForecast(city);
};

getWeatherAndForecast();
citySelect.addEventListener('change', () => getWeatherAndForecast(citySelect.options[citySelect.selectedIndex].value));