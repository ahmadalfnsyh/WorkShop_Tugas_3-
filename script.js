const apiKey = '05ee01d51cd1cc26f90e8f92fff20b4c';

function getWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      const temp = Math.round(data.main.temp);
      const desc = capitalize(data.weather[0].description);
      const iconCode = data.weather[0].icon;

      document.getElementById('temp').innerText = `${temp}°C`;
      document.getElementById('description').innerText = desc;
      document.getElementById('weather-icon').src = getCustomIcon(iconCode);

      updateBackgroundByCityTime(data.dt, data.timezone);
    })
    .catch(error => {
      alert('City not found!');
      console.error(error);
    });
}

function getCustomIcon(code) {
  const simplifiedMap = {
    '01d': 'sunny.gif', '01n': 'sunny.gif',
    '02d': 'sunny.gif', '02n': 'sunny.gif',
    '03d': 'cloudy.gif', '03n': 'cloudy.gif',
    '04d': 'cloudy.gif', '04n': 'cloudy.gif',
    '09d': 'rainy.gif', '09n': 'rainy.gif',
    '10d': 'rainy.gif', '10n': 'rainy.gif',
    '11d': 'stormy.gif', '11n': 'stormy.gif',
    '13d': 'snowy.gif', '13n': 'snowy.gif',
    '50d': 'windy.gif', '50n': 'windy.gif'
  };
  return `assets/${simplifiedMap[code] || 'cloudy.gif'}`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function updateDate() {
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

  const dayName = days[today.getDay()];
  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  const formattedDate = `${dayName}, ${day} ${month} ${year}`; // Koma hanya setelah hari

  document.getElementById('date').innerText = formattedDate;
}


function updateBackgroundByTime() {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  document.body.className = isDay ? 'day' : 'night';
}

function updateBackgroundByCityTime(timestamp, timezoneOffset) {
  const cityTime = new Date((timestamp + timezoneOffset) * 1000);
  const hour = cityTime.getUTCHours();
  const isDay = hour >= 6 && hour < 18;
  document.body.className = isDay ? 'day' : 'night';
}

// Run on load
updateDate();
updateBackgroundByTime();
