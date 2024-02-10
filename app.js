const DEFAULT_CITY = 'kiev';
const TEMP_UI = document.getElementById('temperature');
const LOCATION_UI = document.getElementById('location');
const DESC_UI = document.getElementById('description');
const HEADER = document.getElementById('header');
const GET_WEATHER_BTN= document.getElementById('featchWeatherBtn');
const RESET_WEATHER_BTN = document.getElementById('resetWeatherBtn');
const FAVICON = document.getElementById('favicon'); 
const SHORTCUT_ICON = document.getElementById('shortcutIcon');
const THEME_BTN = document.getElementById('themeBtn');

var isDark = false;

function updateUI(data) {
        LOCATION_UI.textContent = data.name;
        TEMP_UI.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
        DESC_UI.textContent = data.weather[0].description;   
}


function getWeather(city) {
    const API = '77da67154ab3412227f3a5dabba692a5';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
    
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        updateUI(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
}


getWeather(DEFAULT_CITY);

 GET_WEATHER_BTN.addEventListener('click', function () {
    cityInput = prompt('Enter your city, please: ') || defaultCity;
    getWeather(cityInput);
});
THEME_BTN.addEventListener('click', function() {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    HEADER.classList.toggle('dark', isDark);
    if (isDark) {
        FAVICON.href = './img/fav/icons8-night-32.png';
        SHORTCUT_ICON.href = './img/fav/icons8-night-32.png';
    } else {
        FAVICON.href = './img/fav/icons8-partly-cloudy-day-cute-clipart-32.png';
        SHORTCUT_ICON.href = './img/fav/icons8-partly-cloudy-day-cute-clipart-32.png';
    }
})
