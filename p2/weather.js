const input = document.querySelector("#cityInput");
const button = document.querySelector("#searchBtn");

const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const weatherCondition = document.querySelector("#weatherCondition");



function searchWeather() {
    const city = input.value;

    if (city === "") {
        alert("Please enter a city");
        return;
    }

    getWeather(city);
}

button.addEventListener("click", searchWeather);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchWeather();
    }
});

async function getWeather(city) {

    try {

        // 1. Get latitude and longitude
        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoURL);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            alert("City not found");
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        const realCityName = geoData.results[0].name;

        // 2. Get weather
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        //  Get current weather
        const current = weatherData.current;

        // 4. Display on webpage
        cityName.innerText = realCityName;

        temperature.innerText =
            current.temperature_2m + " °C";
       

        humidity.innerText =
            current.relative_humidity_2m + " %";

        windSpeed.innerText =
            current.wind_speed_10m + " km/h";

        weatherCondition.innerText =
            getWeatherCondition(current.weather_code);

    } catch (error) {

        console.log("Error:", error);
        alert("Something went wrong");

    }
}


// Convert Open-Meteo weather code into readable text
function getWeatherCondition(code) {

    if (code === 0) {
        weatherCondition.style.color = "yellow";
        weatherCondition.style.fontWeight = "bold";

        return "Clear Sky";
    }

    else if (code >= 1 && code <= 3) {
        weatherCondition.style.color = "lightgray";
        weatherCondition.style.fontWeight = "bold";

        return "Cloudy";
    }

    else if (code >= 45 && code <= 48) {
        weatherCondition.style.color = "gray";

        return "Fog";
    }

    else if (code >= 51 && code <= 67) {
        weatherCondition.style.color = "deepskyblue";
        weatherCondition.style.fontWeight = "bold";

        return "Rain";
    }

    else if (code >= 71 && code <= 77) {
        weatherCondition.style.color = "white";

        return "Snow";
    }

    else if (code >= 80 && code <= 82) {
        weatherCondition.style.color = "blue";

        return "Rain Showers";
    }

    else if (code >= 95) {
        weatherCondition.style.color = "orange";
        weatherCondition.style.fontWeight = "bold";

        return "Thunderstorm";
    }

    else {
        weatherCondition.style.color = "white";

        return "Unknown";
    }
}