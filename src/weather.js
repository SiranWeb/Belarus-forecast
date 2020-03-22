const API_KEY = '27ffc02e273de1d4f074adfb4a68c75e';

export async function fetchWeather(city) {
    city == undefined ? city = 'minsk' : city = city;
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`)
    return await rawData.json();
};

export async function fetchForecast(city) {
    city == undefined ? city = 'minsk' : city = city;
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`);
    return await rawData.json();
};