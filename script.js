async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=0faf9b77d5302b4957567270367b2517`);
        const data = await response.json();
        const lat = data[0].lat;
        const lon =  data[0].lon;
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0faf9b77d5302b4957567270367b2517`);
        const weatherData = await weatherResponse.json();
        displayLoader("none");
        processWeatherData(weatherData);
    } catch (e) {
        alert("Error: Location not found");
    }
}

function processWeatherData(weatherData) {
    const processedWeather = weatherData.main;
    processedWeather["description"] = weatherData.weather[0].description;
    processedWeather["name"] = weatherData.name;
    processedWeather["wind"] = weatherData.wind.speed * 3.6;
    for (const k in processedWeather) {
        if (typeof processedWeather[k] === 'number') {
            processedWeather[k] = Math.round(processedWeather[k]); 
        }
    }
    displayData(processedWeather);
}

function displayLoader(mode) {
    document.querySelector(".loader").style.display = mode;
}

function displayData(processedWeather) {
    const temp = document.querySelector(".temp");
    const location = document.querySelector(".location");
    const weatherDescription = document.querySelector(".weather-description");
    const max = document.querySelector(".max");
    const min = document.querySelector(".min");
    const feelsLike = document.querySelector(".feels-like");
    const windSpeed = document.querySelector(".wind-speed");
    const symbol = '\u00B0' + 'C';

    temp.textContent = processedWeather.temp + symbol;
    location.textContent = processedWeather.name;
    weatherDescription.textContent = '| ' + processedWeather.description[0].toUpperCase() + processedWeather.description.substring(1,);
    max.textContent = 'Max: ' + processedWeather.temp_max + symbol;
    min.textContent = 'Min: ' + processedWeather.temp_min + symbol;
    feelsLike.textContent = 'Feels Like: ' + processedWeather.feels_like + symbol;
    windSpeed.textContent = 'Wind Speed: ' + processedWeather.wind + "km/h";

    document.querySelector(".details-container").style.display = "block";
}

document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector(".details-container").style.display = "none";
    displayLoader("block");
    getWeatherData(e.target[0].value);
});

