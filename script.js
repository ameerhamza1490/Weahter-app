const weatherData = document.querySelector("#weatherData");
const city = document.querySelector("#city");
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");
const currentLocation = document.querySelector("#current-location");
const APIKEY = `1a208d48d95748f4ac72f02def549960`;

const getCurrentDate = () => {
  const currentDate = new Date();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = weekdays[currentDate.getDay()];
  const monthName = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const dayNumber = currentDate.getDate();

  return `${dayName}, ${dayNumber} ${monthName} ${year}.`;
};

const updateWeather = (data) => {
  const {
    name,
    main: { temp, temp_max, temp_min, feels_like, humidity },
    wind: { speed },
    weather,
    clouds: { all },
  } = data;
  const weatherCondition = weather[0].main;
  city.innerHTML = `
    <h2>${name}</h2>
    <h3>${getCurrentDate()}</h3>
    <h1>${Math.round(temp)}°</h1>
    <p>${weatherCondition}</p>
    <h2>Precipitation</h2>
    <h3>Max: ${Math.round(temp_max)}° Min: ${Math.round(temp_min)}°</h3>
    <h4>Feels Like: ${Math.round(feels_like)}</h4>
    <div id="columns">
      <div>Humidity ${humidity}</div>
      <div>Wind ${speed}km/hr</div>
      <div>Clouds ${all}%</div>
    </div>
  `;
};

const fetchWeatherData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    updateWeather(data);
  } catch (error) {
    alert(error.message);
  }
};

const getWeatherByLocation = (latitude, longitude) => {
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`;
  fetchWeatherData(weatherAPI);
};

const getWeatherByCity = () => {
  const cityName = search.value;
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`;
  fetchWeatherData(weatherAPI);
};

const getLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
      },
      (error) => alert(error.message)
    );
  }
};

getLocationWeather();

searchBtn.addEventListener("click", getWeatherByCity);
currentLocation.addEventListener("click", getLocationWeather);
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeatherByCity();
  }
});
