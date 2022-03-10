const detailRow = document.querySelector('#detailContainer');
const currentTemp = document.querySelector('#currentTemp');
const tempFormatBtn = document.querySelector('#tempFormatBtn');
const locationForm = document.querySelector('#locationForm');
const weekViewContainer = document.getElementById('weekViewContainer');
const cardTemp = document.getElementsByClassName('cardTemp');
const todaysDate = document.querySelector('#todaysDate');
const cardText = document.querySelector('.card-text');

const WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const BASE_URL = 'https://api.openweathermap.org';
let apiKey;
let isFarenheit = true;

const weekForecast = {
    'fahrenheit': [],
    'celsius': []
}

const weatherIconList = {
    '01d': 'bi-brightness-low',
    '02d': 'bi-cloud-sun',
    '03d': 'bi-cloud',
    '04d': 'bi-clouds',
    '09d': 'bi-clopud-drizzle',
    '10d': 'bi-cloud-rain-heavy',
    '11d': 'bi-cloud-lightening',
    '13d': 'bi-cloud-snow',
    '50d': 'bi-cloud-fog2',
};

init();

function init() {
    getAPIKey();
    locationForm.addEventListener('submit', (e) => getGeoCode(e));
    tempFormatBtn.addEventListener('click', renderTemperature);
}

function getAPIKey() {
    fetch('/config.json')
        .then(resp => resp.json())
        .then(function(config) {
            apiKey = config.apiKey;
    });
}

function renderTemperature(event) {
    if (!!event) isFarenheit = !isFarenheit;

    for (let i = 0; i < cardTemp.length; i++) {
        cardTemp[i].textContent = `${isFarenheit ? weekForecast.fahrenheit[i] : weekForecast.celsius[i]}°`;
        // if (i === 6) {
        //     cardTemp[i].textContent = `Feels Like ${isFarenheit ? weekForecast.fahrenheit[i] : weekForecast.celsius[i]}°`;
        // }
    }
}

function getGeoCode(event) {
    event.preventDefault();
    const zipCode = event.target.querySelector('.form-control').value;
    //** Stretch: user input validation */

    const geoCodeAPI = `${BASE_URL}/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;
    fetch(geoCodeAPI)
        .then(response => response.json())
        .then(function(data) {
            getWeatherInformation(data);
        })
        .catch(console.error);

    event.target.reset();
}

function getWeatherInformation(geocodeData) {
    const lat = geocodeData.lat;
    const lon = geocodeData.lon;
    const weatherAPI = `${BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    const location = document.getElementById('weatherLocation');
    location.textContent = geocodeData.name;
    
    fetch(weatherAPI)
        .then(response => response.json())
        .then(renderWeatherCards)
        .catch(console.error);
}

function renderWeatherCards(weeksWeather) {
    clearPreviousForcast();
    
    for(let i = 0; i < 6; i++) {
        if (i === 0) {
            pushWeekForcast(weeksWeather.current.temp);
            renderDate();
        } else {
            pushWeekForcast(weeksWeather.daily[i].temp.day);
            renderSingleWeatherCard(weeksWeather.daily[i]);
        }
    }
    renderTemperature();
    renderDetailedData(weeksWeather.current);
}

function renderSingleWeatherCard(weatherInfo) {
    const card = document.createElement('div');
    card.className = 'weatherCardContainer';

    const date = new Date(weatherInfo.dt * 1000);
    const dayCard = document.createElement('h4');
    dayCard.className = 'dayCardTitle';
    dayCard.textContent = WEEK[date.getDay()];

    const dayWeatherIcon = weatherIconList[weatherInfo.weather[0].icon];
    const weatherIcon = document.createElement('i');
    weatherIcon.className = `fa-6x bi ${dayWeatherIcon}`;

    const dayTemp = document.createElement('h2');
    dayTemp.className = 'cardTemp center';
    card.append(dayCard, weatherIcon, dayTemp);
    weekViewContainer.append(card);
}

function renderDetailedData(currentWeather) {
    pushWeekForcast(currentWeather.feels_like);
    const currentTemp = isFarenheit ? kelvinToFahrenheit(currentWeather.feels_like) : kelvinToCelsius(currentWeather.feels_like);
    el('feelslike').textContent = `Feels Like ${currentTemp}°`;
    el('humidity').textContent = `Humidity ${currentWeather.humidity}%`;
    el('windspeed').textContent = `Wind Speed ${currentWeather.wind_speed} mph`;
    el('uvindex').textContent = `UV Index ${currentWeather.uvi}`;
}

function renderDate() {
    const date = new Date();
    const month = date.toLocaleDateString('default', {month: 'long'});
    const day = date.getDate();
    cardText.textContent = `${WEEK[date.getUTCDay()]}, ${month} ${day}`;
}

function pushWeekForcast(tempInKelvin) {
    weekForecast.fahrenheit.push(kelvinToFahrenheit(tempInKelvin));
    weekForecast.celsius.push(kelvinToCelsius(tempInKelvin));
}

function kelvinToFahrenheit(tempInKelvin) {
    return Math.round(((tempInKelvin-273.15)*1.8)+32);
}

function kelvinToCelsius(tempInKelvin) {
    return Math.round(tempInKelvin-273.15);
}

function clearPreviousForcast() {
    weekViewContainer.innerHTML = '';
    weekForecast.fahrenheit = [];
    weekForecast.celsius = [];
}

function el(elementId) {
    return document.getElementById(elementId);
}