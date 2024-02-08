const defaultCity = 'kiev';
const tempUI = document.getElementById('temperature');
const locationUI = document.getElementById('location');
const descUI = document.getElementById('description');
const getWeatherBtn = document.getElementById('featchWeatherBtn');
const resetWeatherBtn = document.getElementById('resetWeatherBtn'); 

var lastCities = [defaultCity];
var counter = 1;

function updateUI(data) {
        locationUI.textContent = data.name;
        tempUI.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
        if (Math.round(data.main.temp - 273.15) >= 30) {
                tempUI.classList.add('hot');
        }
        else if (Math.round(data.main.temp - 273.15) >= 25) {
                tempUI.classList.add('warm');
        }
        else if (Math.round(data.main.temp - 273.15) >= 20) {
                tempUI.classList.add('normal');
        }
        else if (Math.round(data.main.temp - 273.15) <= 10) {
            tempUI.classList.add('cold');       
        }
        descUI.textContent = data.weather[0].description;   
}


function getWeather(city) {
    const apiKey = '77da67154ab3412227f3a5dabba692a5';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        updateUI(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
}


getWeather(defaultCity);

getWeatherBtn.addEventListener('click', function () {
    cityInput = prompt('Enter your city, please: ') || defaultCity;
    lastCities.push(cityInput);
    counter = counter + 1;
    getWeather(cityInput);
});
resetWeatherBtn.addEventListener('click', function () {
    if (counter <= 0) {
        getWeather(defaultCity);
    } else {
        counter = counter- 1;
        getWeather(lastCities[counter]);
        lastCities.pop(lastCities[1]);
    }
})
