// Current day
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let currentdate = date.getDate();
  let year = date.getFullYear();

  return `${day}, ${month} ${currentdate}, ${year}`;
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Current hour and minutes
function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let timeElement = document.querySelector("#current-time");
timeElement.innerHTML = formatTime(currentTime);

// Display temperature in id="real-temperature" + h1 changing by clicking on pin

function showTemperature(response) {
  let temperature = document.querySelector("#real-temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = response.data.wind.speed;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function showmyPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "7d7f0db622e0aaac041c916319ba774a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showmyPosition);
}

let pin = document.querySelector("#pin");
pin.addEventListener("click", currentPosition);

// Display researched city in the form + its temperature

function showWeatherconditions(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#real-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = response.data.wind.speed;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchrealcity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-realcity").value;
  let units = "metric";
  let apiKey = "7d7f0db622e0aaac041c916319ba774a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherconditions);
}

let enteryourCity = document.querySelector("#entercity-form");
enteryourCity.addEventListener("submit", searchrealcity);

function searchCity(city) {
  let apiKey = "7d7f0db622e0aaac041c916319ba774a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherconditions);
}

searchCity("Berlin");
