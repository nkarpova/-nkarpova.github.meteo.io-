
'use strict';

var button = document.querySelector('.button')
var inputCity = document.querySelector('#inputCity')
const api_key = process.env.API_KEY;
const geo_key = process.env.GEO_KEY;

require('dotenv').config();

console.log(process.env);

function showDateTime2() {
    var now = new Date();
    date.textContent = now.toLocaleDateString("en-US",
    { day: "numeric", month: "long" })+" "+now.getFullYear(),
    + now.toLocaleDateString("en-US", { weekday: "long" });
    time.textContent = correctTime(now);
  }
  showDateTime2();
  // Общая функция корректного отображения времени.
    function correctTime(time) {
    let h = time.getHours(),
     m = time.getMinutes();

    return ((h < 10 ? "0" : "") + h)+":"+((m < 10 ? "0" : "") + m);
  }

  if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
  }
  else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML="<p>Browser doesn't support geolocation</p>";
  }
  function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  }
  function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML =`<p> ${error.message} </p>`;
  }
  function getWeather(latitude,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;

fetch(api)
  .then(function(resp) { return resp.json()})
  .then(function(data) {
    console.log(data);
    document.querySelector("#city-name").textContent = data.name;
    document.querySelector("#country").innerHTML = data.sys.country;
    document.querySelector("#temp").innerHTML = Math.round(data.main.temp - 273) + "&deg";
    document.querySelector("#temp-max").innerHTML = Math.round(data.main.temp_max - 273) + "&deg";
    document.querySelector("#temp-min").innerHTML = Math.round(data.main.temp_min - 273) + "&deg";
    document.querySelector("#state").innerHTML = data.weather[0].description;
    document.querySelector("#speed").innerHTML = (data.wind.speed);
    document.querySelector("#humidity").innerHTML = data.main.humidity;
    document.querySelector("#icon").innerHTML = '<img src="https://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png">';
  })
  }
  button.addEventListener("click", function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputCity.value+'&appid=' + api_key)
    .then(function(resp) { return resp.json()})
    .then(function(data) {
      console.log(data);


    document.querySelector("#city-name").textContent = data.name;
    document.querySelector("#country").innerHTML = data.sys.country;
    document.querySelector("#temp").innerHTML = Math.round(data.main.temp - 273) + "&deg";
    document.querySelector("#temp-max").innerHTML = Math.round(data.main.temp_max - 273) + "&deg";
    document.querySelector("#temp-min").innerHTML = Math.round(data.main.temp_min - 273) + "&deg";
    document.querySelector("#state").innerHTML = data.weather[0].description;
    document.querySelector("#speed").innerHTML = (data.wind.speed);
    document.querySelector("#humidity").innerHTML = data.main.humidity;
    document.querySelector("#icon").innerHTML = '<img src="https://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png">';

  })
})
