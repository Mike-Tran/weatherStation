const apiKey = '329cbaeef2629343499bd641a0fa58d0';
const lat = 47.73424240534853;
const lon = -122.30687432498033;
const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

document.addEventListener('DOMContentLoaded', function() {
    const currentTemp = document.querySelector('#currentTemp');
    init();
});


function init() {
    fetch(weatherAPI)
    .then(response => response.json())
    .then(renderWeatherCards)
    .catch(console.error);
}

function renderWeatherCards(weeksWeather) {
    console.log(weeksWeather);
    // debugger;
    currentTemp.textContent = kelvinToFarenheit(weeksWeather.current.temp) + '°';
    getDate();
}

function getDate() {
    const todaysDate = document.querySelector('#todaysDate');
    const cardText = document.querySelector('.card-text');
    const date = new Date();
    const month = date.toLocaleDateString('default', {month: 'long'});
    const day = date.getDay();
    // console.log(week[date.getUTCDay()]);
    // console.log(date);
    todaysDate.textContent = week[date.getUTCDay()];
    cardText.textContent = `${month} ${day}`;
}

function kelvinToFarenheit(tempInKelvin) {
    return Math.round(((tempInKelvin-273.15)*1.8)+32);
}