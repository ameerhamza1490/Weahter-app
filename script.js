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
  } catch (error) {}
};
currentLocation();
