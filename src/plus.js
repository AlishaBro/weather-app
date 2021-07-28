handleCurrentTemp();

function formatdtandTime(apidt) {
  let todaysDate = new Date(apidt);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[todaysDate.getDay()];
  let date = todaysDate.getDate();
  let year = todaysDate.getFullYear();
  let month = months[todaysDate.getMonth()];
  let hours = todaysDate.getHours();
  let mints = todaysDate.getMinutes();
  let parameter = "AM";
  if (hours > 12) {
    hours = hours - 12;
    parameter = "PM";
  } else if (hours === 0) {
    hours = 12;
    parameter = "AM";
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (mints < 10) {
    mints = `0${mints}`;
  }

  let formatTime = `${hours}:${mints} ${parameter}`;
  let currentDate = `${day}, ${date} ${month} ${year}`;
  let updateDate = document.querySelector("#current-date");

  updateDate.innerHTML = currentDate;
  let updateTime = document.querySelector(".time");
  updateTime.innerHTML = formatTime;
}

//currentTemp button Handling//

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "298159ea1285926f2960068f39a80cbf";
  let geolocationAPI = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(geolocationAPI).then(showlocation);
}

function showlocation(location) {
  let inputPlace = document.querySelector(".searchbar");
  let place = document.querySelector(".place");
  temperature = Math.round(location.data.main.temp);
  let currentTemp = document.querySelector(".currentTemp");
  let humidity = location.data.main.humidity;
  let humid = document.querySelector("#Hvalue");
  let wind = location.data.wind.speed;
  let windy = document.querySelector("#Wvalue");
  let status = document.querySelector(".status");
  let image = document.querySelector("img");
  let icon = location.data.weather[0].icon;
  place.innerHTML = location.data.name;
  currentTemp.innerHTML = temperature;
  humid.innerHTML = ` ${humidity}%`;
  windy.innerHTML = ` ${wind}km/hr`;
  status.innerHTML = location.data.weather[0].description;
  let link = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById("weatherimg").src = link;
  let x = location.data.dt;
  let y = x * 1000;
  formatdtandTime(y);
}

function handleCurrentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

//*******Handling the API response and displaying it in the webpage->Temperature, Humidity, Wind********//
//handling error//

function handleResponse(response) {
  let place = document.querySelector(".place");
  place.innerHTML = response.data.name;

  temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = temperature;

  let humid = document.querySelector("#Hvalue");
  humid.innerHTML = ` ${response.data.main.humidity}%`;

  let windy = document.querySelector("#Wvalue");
  windy.innerHTML = ` ${response.data.wind.speed}km/hr`;

  let status = document.querySelector(".status");
  status.innerHTML = response.data.weather[0].description;

  let image = document.querySelector("img");
  let icon = response.data.weather[0].icon;
  let link = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  document.getElementById("weatherimg").src = link;
}

//get the value (City name)from the searchbar and display it in the webpage //

function handlesearch(event) {
  event.preventDefault();
  let inputPlace = document.querySelector(".searchbar");
  let place = document.querySelector(".place");
  let cityName = inputPlace.value;

  //Api service call to the weather API//

  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
  let apiKey = "298159ea1285926f2960068f39a80cbf";
  let apiService = `${apiUrl}&q=${cityName}&appid=${apiKey}`;

  axios
    .get(apiService)
    .then(handleResponse)
    .catch((error) => alert("Sorry you have entered an incorrect city"));

  //reset the searchbar//
  let resetData = document.querySelector("form");
  resetData.reset();
}

//temperature conversion//

function converttoF() {
  let temp = document.querySelector(".currentTemp");
  temp.innerHTML = Math.round(temperature * 1.8 + 32);
}

function converttoC() {
  let temp = document.querySelector(".currentTemp");
  temp.innerHTML = temperature;
}

//Declaration and functions//

let inputData = document.querySelector("form");
inputData.addEventListener("submit", handlesearch);

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", converttoF);

let celcius = document.querySelector(".celcius");
celcius.addEventListener("click", converttoC);

let button = document.querySelector("#button");
button.addEventListener("click", handleCurrentTemp);

let temperature = null;
