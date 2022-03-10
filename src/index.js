const apiKey = '29d46196468dda5ecc5548f448aa899c';
const lat = 47.73424240534853;
const lon = -122.30687432498033;
const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=29d46196468dda5ecc5548f448aa899c`;
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let isFarenheit = true;
let currentTempInKelvin;
let currentFeelsLike;
let currentHumidity;
let currentUvi;
let currentWindspeed;
let currentPrecipitation;

// Create object containing relavent icons for weather forcast 'light rain' etc should be 9  options
// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
// search for weather under bootstrap and select the outlined options
// https://icons.getbootstrap.com/
const weatherIcons = {

}


document.addEventListener('DOMContentLoaded', function() {
    const currentTemp = document.querySelector('#currentTemp');
    const tempFormatBtn = document.querySelector('#tempFormatBtn');
    const dayoneTemp = document.querySelector('#dayoneTemp');
    const daytwoTemp = document.querySelector('#daytwoTemp');
    const daythreeTemp = document.querySelector('#daythreeTemp');
    const dayfourTemp = document.querySelector('#dayfourTemp');
    const dayfiveTemp = document.querySelector('#dayfiveTemp');
    const feelsLike = document.querySelector('#feelslike');
    
    
    init();

    tempFormatBtn.addEventListener('click', function() {
        if (isFarenheit) {
            currentTemp.textContent = kelvinToCelcius(currentTempInKelvin) + '°';
           
            dayoneTemp.textContent = kelvinToCelcius(dayOneTemp) + '°';
            
            daytwoTemp.innerHTML = kelvinToCelcius(dayTwoTemp) + '°';
            
            daythreeTemp.innerHTML = kelvinToCelcius(dayThreeTemp) + '°';
            
            dayfourTemp.innerHTML = kelvinToCelcius(dayFourTemp) + '°';
            
            dayfiveTemp.innerHTML = kelvinToCelcius(dayFiveTemp) + '°';
            
            feelsLike.innerHTML = kelvinToCelcius(currentFeelsLike) + '°';
            isFarenheit = !isFarenheit;
        } else {
            currentTemp.innerHTML = kelvinToFarenheit(currentTempInKelvin) + '°';
            
            dayoneTemp.innerHTML = kelvinToFarenheit(dayOneTemp) + '°';
            
            daytwoTemp.innerHTML = kelvinToFarenheit(dayTwoTemp) + '°';
            
            daythreeTemp.innerHTML = kelvinToFarenheit(dayThreeTemp) + '°';
            
            dayfourTemp.innerHTML = kelvinToFarenheit(dayFourTemp) + '°';
            
            dayfiveTemp.innerHTML= kelvinToFarenheit(dayFiveTemp) + '°';
            
            feelsLike.innerHTML = kelvinToFarenheit(currentFeelsLike) + '°';
            isFarenheit = !isFarenheit;
        }
    });
   
});

    const precipitation = document.querySelector('#precipitation');
    const humidity = document.querySelector('#humidity');
    const windspeed = document.querySelector('#windspeed');
    const uvindex = document.querySelector('#uvindex');


function init() {
    fetch(weatherAPI)
    .then(response => response.json())
    .then(renderWeatherCards)
    .catch(console.error);
}

function renderWeatherCards(weeksWeather) {
    console.log(weeksWeather);
    currentTempInKelvin = weeksWeather.current.temp;
    currentTemp.textContent = kelvinToFarenheit(currentTempInKelvin) + '°';
    getDate();
    currentFeelsLike = kelvinToFarenheit(weeksWeather.current.feels_like);
    currentPrecipitation = weeksWeather.minutely[0].precipitation
    currentHumidity = weeksWeather.current.humidity;
    currentWindSpeed = weeksWeather.current.wind_speed;
    currentUvIndex = weeksWeather.current.uvi;

    dayOneTemp = kelvinToFarenheit(weeksWeather.daily[0].temp.day);
    dayTwoTemp = kelvinToFarenheit(weeksWeather.daily[1].temp.day);
    dayThreeTemp = kelvinToFarenheit(weeksWeather.daily[2].temp.day);
    dayFourTemp = kelvinToFarenheit(weeksWeather.daily[3].temp.day);
    dayFiveTemp = kelvinToFarenheit(weeksWeather.daily[4].temp.day);
    renderDetailedData()
    // renderSingleWeatherCard()
   //  
}

function renderSingleWeatherCard(weatherInfo) {
    let weekViewContainer = document.querySelector('.weekViewContainer');
    weekViewContainer.innerHTML = `
    <div class="futureCard">
    <i class="fa-8x bi bi-cloud-sun"></i>
    <div class="card-body">
      <h3 class="card-title" id="dayoneDate">Tomorrow</h3>
      <p class="card-text">${dayOneTemp}°</p>
      <h1 id="dayoneTemp"></h1>
    </div>
  </div>

  <div class="futureCard">
    <i class="fa-8x bi bi-cloud-rain"></i>
    <div class="card-body">
      <h3 class="card-title" id="daytwoDate">Day 2</h3>
      <p class="card-text">${dayTwoTemp}°</p>
      <h1 id="daytwoTemp"></h1>
    </div>
  </div>

  <div class="futureCard">
    <i class="fa-8x bi bi-cloud-hail"></i>
    <div class="card-body">
      <h3 class="card-title" id="daythreeDate">Day 3</h3>
      <p class="card-text">${dayThreeTemp}°</p>
      <h1 id="daythreeTemp"></h1>
    </div>
  </div>

  <div class="futureCard">
    <i class="fa-8x bi bi-cloud-sun"></i>
    <div class="card-body">
      <h3 class="card-title" id="dayfourDate">Day 4</h3>
      <p class="card-text">${dayFourTemp}°</p>
      <h1 id="dayfourTemp"></h1>
    </div>
  </div>

  <div class="futureCard">
    <i class="fa-8x bi bi-cloud-hail"></i>
    <div class="card-body">
      <h3 class="card-title" id="dayfiveDate">Day 5</h3>
      <p class="card-text">${dayFiveTemp}°</p>
      <h1 id="dayfiveTemp"></h1>
    </div>
  </div>`
}

function renderDetailedData(data) {
    let detailRow = document.querySelector('.detailContainer')
    detailRow.innerHTML = `
    <div class="detail">
    <div class="card-body">
      <h3 class="card-title">Details</h3>
      <p class="card-text" id="feelslike">Feels Like ${currentFeelsLike}°</p>
      <p class="card-text" id="precipitation">Precipitation ${currentPrecipitation}%</p>
      <p class="card-text" id="humidity">Humidity ${currentHumidity}%</p>
      <p class="card-text" id="windspeed">Wind Speed ${currentWindSpeed} mph</p>
      <p class="card-text" id="uvindex">UV Index ${currentUvIndex}</p>
      <h1 id="details"></h1>

  </div>   `

  
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



