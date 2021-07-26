let todaysDate = new Date();
console.log(todaysDate);

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

handleCurrentTemp();

let day = days[todaysDate.getDay()];
console.log(day);

let date = todaysDate.getDate();
let year = todaysDate.getFullYear();
let month = months[todaysDate.getMonth()];
let time = todaysDate.toLocaleTimeString();

console.log(time);
let formatTime = `${time} Hrs`;

let currentDate = `${day}, ${date} ${month} ${year}`;
console.log(currentDate);
let updateDate = document.querySelector("#current-date");
console.log(updateDate);
updateDate.innerHTML = currentDate;
let updateTime = document.querySelector(".time");
updateTime.innerHTML = formatTime;

//currentTemp button Handling//

function handlePosition(position) {
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);
  let apiKey = "298159ea1285926f2960068f39a80cbf";
  let geolocationAPI = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(geolocationAPI).then(showlocation);
}

function showlocation(location) {
  console.log(location);
  let loc = location.data.name;
  console.log(loc);
  let inputPlace = document.querySelector(".searchbar");

  let place = document.querySelector(".place");
  let cityName = inputPlace.value;
  console.log(cityName);
  place.innerHTML = loc;

  let temperature = Math.round(location.data.main.temp);
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = temperature;

  let humidity = location.data.main.humidity;
  console.log(humidity);
  let humid = document.querySelector("#Hvalue");
  humid.innerHTML = ` ${humidity}%`;

  let wind = location.data.wind.speed;
  console.log(wind);
  let windy = document.querySelector("#Wvalue");
  windy.innerHTML = ` ${wind}km/hr`;

  let status = document.querySelector(".status");
  status.innerHTML = location.data.weather[0].main;

  let image = document.querySelector("img");
  console.log("im here displaying the image value");
  console.log(image);
  let icon = location.data.weather[0].icon;
  let link = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log(link);
  console.log("icon link");
  document.getElementById("weatherimg").src = link;
  console.log(image.innerHTML);
}

function handleCurrentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

//Handling the API response and displaying it in the webpage->Temperature, Humidity, Wind<---//

function handleResponse(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = temperature;

  let humidity = response.data.main.humidity;
  console.log(humidity);
  let humid = document.querySelector("#Hvalue");
  humid.innerHTML = ` ${humidity}%`;

  let wind = response.data.wind.speed;
  console.log(wind);
  let windy = document.querySelector("#Wvalue");
  windy.innerHTML = ` ${wind}km/hr`;

  let status = document.querySelector(".status");
  status.innerHTML = response.data.weather[0].main;

  let image = document.querySelector("img");
  console.log("im here displaying the image value");
  console.log(image);
  let icon = response.data.weather[0].icon;
  let link = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log(link);
  console.log("icon link");
  document.getElementById("weatherimg").src = link;
  console.log(image.innerHTML);
}

//get the value (City name)from the searchbar and display it in the webpage //

function handlesearch(event) {
  event.preventDefault();
  let inputPlace = document.querySelector(".searchbar");

  let place = document.querySelector(".place");
  let cityName = inputPlace.value;
  console.log(cityName);
  place.innerHTML = cityName;

  //Api service call to the weather API//

  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
  let apiKey = "298159ea1285926f2960068f39a80cbf";
  let apiService = `${apiUrl}&q=${cityName}&appid=${apiKey}`;
  console.log(apiService);
  axios.get(`${apiUrl}&q=${cityName}&appid=${apiKey}`).then(handleResponse);

  //reset the searchbar//
  let resetData = document.querySelector("form");
  resetData.reset();
}

//temperature conversion//

function converttoF() {
  let temp = document.querySelector(".currentTemp");
  console.log(temp);
  temp.innerHTML = "77";
}

function converttoC() {
  let temp = document.querySelector(".currentTemp");
  //var temp = document.getElementById("#temp");
  //console.log(temp);
  temp.innerHTML = "25";
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
