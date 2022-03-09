# weatherStation

This is a single page weather app that shows the current weather for the week for any zip code within the United Sates, with detailed information including precipitation, wind speed, and humidity. Information will be retrieved from the OpenWeather API.

## User Stories:

As a user I want to be able to search for any location via zip code
So that I can easily and quickly choose see the weather for various locations.

As a user I want to see pictures of the approximate weather forecast (sun/rain/clouds)
So that I can make quick estimations of the weather without having to read actual numbers.

As a user I want to see detailed weather information for a location
So that I can prepare and dress appropriately for outdoor conditions.

As a user I want all information to be accessed at one glance
So that I do not need to click through multiple buttons to view one piece of weather data.

## Wireframe(s):

![alt text](https://github.com/Mike-Tran/weatherStation/blob/main/frank-wireframe-screenshot.png)

## API:

OpenWeather: https://openweathermap.org/api


## Goals:

Single page application
Event Listener: DocumentContentLoaded
Today’s date
The current temperature
The weeks temperature 
Detailed information on today's weather
Humidity
Pressure
Wind speed
Highs and lows
Etc.
Input form to query a US zip code and area
Event Listener: Form submission
Celsius to Fahrenheit conversion
Event Listener: Button click (button indicates which system is used)

Our event listeners will be the following
Form submission
documentContentLoaded
Click: when a user clicks on the C/F button it will convert Celsuis to Fahrenheit, and vice versa

## Stretch Goals:

Have location cards for previuosly searched zip codes (This would be a POST request)

