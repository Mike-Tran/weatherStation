const apiKey = '329cbaeef2629343499bd641a0fa58d0';
const lat = 47.73424240534853;
const lon = -122.30687432498033;
const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let isFarenheit = true;
let currentTempInKelvin;

// Create object containing relavent icons for weather forcast 'light rain' etc should be 9  options
// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
// search for weather under bootstrap and select the outlined options
// https://icons.getbootstrap.com/
const weatherIcons = {

}

document.addEventListener('DOMContentLoaded', function() {
    const currentTemp = document.querySelector('#currentTemp');
    const tempFormatBtn = document.querySelector('#tempFormatBtn');

    init();

    tempFormatBtn.addEventListener('click', function() {
        if (isFarenheit) {
            currentTemp.textContent = kelvinToCelcius(currentTempInKelvin) + '°';
            isFarenheit = !isFarenheit;
        } else {
            currentTemp.textContent = kelvinToFarenheit(currentTempInKelvin) + '°';
            isFarenheit = !isFarenheit;
        }
    });
});


function init() {
    fetch(weatherAPI)
    .then(response => response.json())
    .then(renderWeatherCards)
    .catch(console.error);
}

function renderWeatherCards(weeksWeather) {
    console.log(weeksWeather);
    currentTempInKelvin = weeksWeather.current.temp;
    currentTemp.textContent = kelvinToFarenheit(weeksWeather.current.temp) + '°';
    getDate();

    for(let i = 0; i < 5; i++) {
        renderSingleWeatherCard(weeksWeather.daily[i]);
    }

}

function renderSingleWeatherCard(weatherInfo) {
    const weekViewContainer = document.querySelector('.weekViewContainer');
    const card = document.createElement('div');
    card.className = 'dayCard';

    // link weather forecast for this day to icon and append to card
    const weatherIcon = document.createElement('i');
    weatherIcon.className = "fa-8x bi bi-cloud-sun";

    const dayTemp = document.createElement('h2');
    dayTemp.className = 'center';
    dayTemp.textContent = `${kelvinToFarenheit(weatherInfo.temp.day)}°`;
    card.append(weatherIcon, dayTemp);
    weekViewContainer.append(card);
}

function getDate() {
    const todaysDate = document.querySelector('#todaysDate');
    const cardText = document.querySelector('.card-text');
    const date = new Date();
    const month = date.toLocaleDateString('default', {month: 'long'});
    const day = date.getDay();
    cardText.textContent = `${week[date.getUTCDay()]}, ${month} ${day}`;
}

function kelvinToFarenheit(tempInKelvin) {
    return Math.round(((tempInKelvin-273.15)*1.8)+32);
}

function kelvinToCelcius(tempInKelvin) {
    return Math.round(tempInKelvin-273.15);
}

