const weatherData = document.querySelector("#weatherData");
const city = document.querySelector("#city");

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

const fullDate = `${dayName}, ${dayNumber} ${monthName} ${year}.`;
console.log(fullDate);

const currentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        weatherFinder(latitude, longitude);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
};

const weatherFinder = async (latitude, longitude) => {
  const APIKEY = `1a208d48d95748f4ac72f02def549960`;
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`;
  try {
    const response = await fetch(weatherAPI);
    const data = await response.json();
    const { feels_like, humidty, temp, temp_max, temp_min } = data.main;
    const cityName = data.name;
    console.log(data);
    city.innerHTML = `<h2>${cityName}</h2> <h1>${temp}</h1> `;
  } catch (error) {}
};
currentLocation();
