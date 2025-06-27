const apiKey = '05ee01d51cd1cc26f90e8f92fff20b4c';

function getWeather() {
  const city = document.getElementById('city-input').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const iconCode = data.weather[0].icon;

      document.getElementById('temp').innerText = `${temp}°C`;
      document.getElementById('description').innerText = capitalize(desc);
      document.getElementById('weather-icon').src = getCustomIcon(iconCode);
      updateBackgroundByCityTime(data.dt, data.timezone);
    })
    .catch(error => {
      alert('city not found!');
      console.error(error);
    });
}

function getCustomIcon(code) {
  const simplifiedMap = {
    // Cerah
    '01d': 'sunny.gif',
    '01n': 'sunny.gif',

    // Sebagian berawan
    '02d': 'sunny.gif',
    '02n': 'sunny.gif',
    '03n': 'cloudy.gif',
    '03d': 'cloudy.gif',
    '04d': 'cloudy.gif',
    '04n': 'cloudy.gif',

    // Hujan
    '09d': 'rainy.gif',
    '09n': 'rainy.gif',
    '10d': 'rainy.gif',
    '10n': 'rainy.gif',

    // Badai
    '11d': 'stormy.gif',
    '11n': 'stormy.gif',

    // Salju
    '13d': 'snowy.gif',
    '13n': 'snowy.gif',

    // Lain-lain dianggap default
    '50d': 'windy.gif',
    '50n': 'windy.gif'
  };

  return `assets/${simplifiedMap[code] || 'cloudy.gif'}`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function updateDate() {
  const today = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', options);
  document.getElementById('date').innerText = formattedDate;
}

updateDate();

function updateBackgroundByTime() {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18; // siang: jam 6–18
  document.body.className = isDay ? 'day' : 'night';
}

updateBackgroundByTime();

function updateBackgroundByCityTime(timestamp, timezoneOffset) {
  const cityTime = new Date((timestamp + timezoneOffset) * 1000); // Convert ke ms
  const hour = cityTime.getUTCHours(); // Karena sudah ditambahkan offset, cukup pakai getUTCHours()
  const isDay = hour >= 6 && hour < 18; // 06:00–17:59 dianggap siang

  document.body.className = isDay ? 'day' : 'night';
}

