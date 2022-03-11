const detailContainer = document.querySelector('#detailContainer .cardContainerBody');
const currentTemp = el('currentTemp');
const tempFormatBtn = el('tempFormatBtn');
const locationForm = el('locationForm');
const weekViewContainer = el('weekViewContainer');
const weatherContainer = el('weatherContainer');
const weatherSearchHistoryContainer = el('weatherSearchHistoryContainer');
const todaysDate = el('todaysDate');
const loc = el('weatherLocation');
const cardTemp = document.getElementsByClassName('cardTemp');
const cardText = document.querySelector('.card-text');

let apiKey;
let isFarenheit = true;

const NUMBER_OF_DAYS_SHOWN = 6;
const MAX_SEARCH_HISTORY_TABS = 10;
const BASE_URL = 'https://api.openweathermap.org';
const WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekForecast = {
    'fahrenheit': [],
    'celsius': []
};
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
const weatherCitySearchHistory = {
    // 'cityName':
    // {
    //     'location': {},
    //     'weatherData': {},
    // }
}

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
    }
}

function getGeoCode(event) {
    event.preventDefault();
    const zipCode = event.target.querySelector('.form-control').value;
    //** Stretch: user input validation */
    if (checkValidZipCode(zipCode)) {
        const geoCodeAPI = `${BASE_URL}/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;
        fetch(geoCodeAPI)
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Invalid ZIP code');
            })
            .then(function(data) {
                renderWeatherInformation(data);
            })
            .catch(console.error);

        event.target.reset();
    }
}

function renderWeatherInformation(geocodeData) {
    const lat = geocodeData.lat;
    const lon = geocodeData.lon;
    const weatherAPI = `${BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    
    fetch(weatherAPI)
    .then(response => response.json())
    .then((data) => {
        weatherCitySearchHistory[`${geocodeData.name}`] = {location: geocodeData, weatherData: data};
        renderWeatherCards(data, geocodeData.name);
        addCityButton(geocodeData.name, geocodeData.zip)
        removeOldestSearch();
})
    .catch(console.error);
    fadeIn();
}

function renderWeatherCards(weeksWeather,city) {
    clearPreviousForcast();
    loc.textContent = city;
    for(let i = 0; i < NUMBER_OF_DAYS_SHOWN; i++) {
        if (i === 0) {
            pushWeekForcast(weeksWeather.current.temp);
            renderDate(new Date());
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

function addCityButton(city, zip) {
    const newCity = document.createElement('button');
    newCity.id = zip;
    newCity.className = 'btn btn-primary';
    newCity.textContent = city;
    newCity.addEventListener('click', function() {
        renderWeatherCards(weatherCitySearchHistory[city].weatherData, city);
        loc.textContent = city;
    })
    weatherSearchHistoryContainer.append(newCity);  
}

function removeOldestSearch() {
    if (Object.keys(weatherCitySearchHistory).length > MAX_SEARCH_HISTORY_TABS) {
        const oldestSave = Object.keys(weatherCitySearchHistory)[0];
        const oldestSaveZip = weatherCitySearchHistory[oldestSave].location.zip;
        delete weatherCitySearchHistory[oldestSave];
        el(oldestSaveZip).remove();
    }
}

function renderDetailedData(currentWeather) {
    pushWeekForcast(currentWeather.feels_like);
    const currentTemp = isFarenheit ? kelvinToFahrenheit(currentWeather.feels_like) : kelvinToCelsius(currentWeather.feels_like);

    detailContainer.innerHTML = '';
    renderDetailCard('feelslike', 'FEELS LIKE', `${currentTemp}°`, 'bi-thermometer-half', 'cardTemp');
    renderDetailCard('humidity', 'HUMIDITY', `${currentWeather.humidity}%`, 'bi-moisture');
    renderDetailCard('windspeed', 'WIND', `${currentWeather.wind_speed} mph`, 'bi-wind');
    renderDetailCard('uvindex', 'UV INDEX', `${currentWeather.uvi}`, 'bi-sun');
}

function renderDetailCard(elementId, cardInfoTitleText, cardInfoDataText, icon = "", additionalClass = "") {
    const card = document.createElement('div');
    card.className = 'card detailCardContainer card-body';
    
    const cardInfo = document.createElement('div');
    cardInfo.className = 'cardInfo cardSubContainer';

    const cardInfoTitle = document.createElement('p');
    cardInfoTitle.className = 'cardInfoTitle';
    cardInfoTitle.textContent = cardInfoTitleText;

    const cardInfoData = document.createElement('h2');
    cardInfoData.className = `cardInfoData details-text card-text ${additionalClass}`;
    cardInfoData.id = elementId;
    cardInfoData.textContent = cardInfoDataText;

    const cardIcon = document.createElement('i');
    cardIcon.className = `float-right cardSubContainer cardIcon fa-4x bi ${icon}`;

    cardInfo.append(cardInfoTitle, cardInfoData);

    card.append(cardInfo, cardIcon);
    detailContainer.append(card);
}

function renderDate(date) {
    const month = date.toLocaleDateString('default', {month: 'long'});
    const day = date.getDate();
    cardText.textContent = `${WEEK[date.getDay()]}, ${month} ${day}`;
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

function fadeIn() {
    weatherContainer.style.transition = "opacity 1.5s linear 0s";
	weatherContainer.style.opacity = 1;
}

function checkValidZipCode(zipCode) {
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
    if (!isValidZip) {
        alert('Invalid ZIP code!');
        locationForm.reset();
        return false;
    }
    return true;
}

function el(elementId) {
    return document.getElementById(elementId);
}