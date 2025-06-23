const apiKey = '05ee01d51cd1cc26f90e8f92fff20b4c';

function getWeather() {
  const city = document.getElementById('city-input').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const iconCode = data.weather[0].icon;

      document.getElementById('temp').innerText = `${temp}°C`;
      document.getElementById('description').innerText = capitalize(desc);
      document.getElementById('weather-icon').src = getCustomIcon(iconCode);
    })
    .catch(error => {
      alert('Kota tidak ditemukan!');
      console.error(error);
    });
}

function getCustomIcon(code) {
  const map = {
    '01d': 'cerah siang.png',
    '01n': 'cerah malam.png',
    '02d': 'berawan.png',
    '02n': 'berawan.png',
    '03d': 'berawan.png',
    '03n': 'berawan.png',
    '04d': 'awan pecah.png',
    '04n': 'awan pecah.png',
    '09d': 'hujan.png',
    '09n': 'hujan.png',
    '10d': 'hujan.png',
    '10n': 'hujan.png',
    '11d': 'badai.png',
    '11n': 'badai.png',
    '13d': 'salju.png',
    '13n': 'salju.png',
    '50d': 'kabut.png',
    '50n': 'kabut.png',
  };
  return `assets/${map[code] || 'default.png'}`;
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
