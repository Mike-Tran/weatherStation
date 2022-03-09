# weatherStation

This is a single page weather app that shows the current weather for the week for any zip code within the United Sates, with detailed information including precipitation, wind speed, and humidity. Information will be retrieved from the OpenWeather API.

## User Stories:

As a user I want to be able to search for any location via zip code <br />
So that I can easily and quickly choose see the weather for various locations.

As a user I want to see pictures of the approximate weather forecast (sun/rain/clouds) <br />
So that I can make quick estimations of the weather without having to read actual numbers.

As a user I want to see detailed weather information for a location <br />
So that I can prepare and dress appropriately for outdoor conditions.

As a user I want all information to be accessed at one glance <br />
So that I do not need to click through multiple buttons to view one piece of weather data.

## Wireframe(s):

![alt text](https://github.com/Mike-Tran/weatherStation/blob/main/frank-wireframe-screenshot.png)

## API:

OpenWeather: https://openweathermap.org/api


## Goals:

Single page application <br />
Event Listener: DocumentContentLoaded <br />
Today’s date <br />
The current temperature <br />
The weeks temperature <br />
Detailed information on today's weather <br />
Humidity <br />
Pressure <br />
Wind speed <br />
Highs and lows 
Etc. <br />
Input form to query a US zip code and area <br />
Event Listener: Form submission <br />
Celsius to Fahrenheit conversion <br />
Event Listener: Button click (button indicates which system is used) <br />

Our event listeners will be the following: <br />
Form submission <br />
documentContentLoaded <br />
Click: when a user clicks on the C/F button it will convert Celsuis to Fahrenheit, and vice versa <br />

## Stretch Goals:

Have location cards for previuosly searched zip codes (This would be a POST request)

