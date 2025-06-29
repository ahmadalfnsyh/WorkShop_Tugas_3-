// Kunci API untuk ambil data cuaca dari OpenWeatherMap
const apiKey = '05ee01d51cd1cc26f90e8f92fff20b4c';

// Fungsi untuk mengambil dan menampilkan cuaca berdasarkan nama kota
function getWeather() {
  const city = document.getElementById('city-input').value.trim(); // Ambil nama kota dari input

  if (!city) {
    alert('Please enter a city name.'); // Validasi jika kosong
    return;
  }

  // Buat URL untuk ambil data cuaca
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${apiKey}`;

  // Ambil data dari API
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found'); // Jika gagal, lempar error
      return response.json(); // Ubah hasil ke format JSON
    })
    .then(data => {
      const temp = Math.round(data.main.temp); // Ambil suhu dan bulatkan
      const desc = capitalize(data.weather[0].description); // Ambil deskripsi cuaca
      const iconCode = data.weather[0].icon; // Ambil kode ikon cuaca

      // Tampilkan hasil ke halaman
      document.getElementById('temp').innerText = `${temp}°C`;
      document.getElementById('description').innerText = desc;
      document.getElementById('weather-icon').src = getCustomIcon(iconCode);

      updateBackgroundByCityTime(data.dt, data.timezone); // Ganti latar belakang berdasarkan waktu kota
    })
    .catch(error => {
      alert('City not found!'); // Jika terjadi error
      console.error(error);
    });
}

// Fungsi untuk memilih gambar ikon cuaca berdasarkan kode
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

  // Kembalikan gambar sesuai kode, default ke 'cloudy.gif'
  return `assets/${simplifiedMap[code] || 'cloudy.gif'}`;
}

// Fungsi untuk mengubah huruf pertama menjadi kapital
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Fungsi untuk menampilkan tanggal hari ini
function updateDate() {
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

  const dayName = days[today.getDay()];
  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  // Format dan tampilkan tanggal
  const formattedDate = `${dayName}, ${day} ${month} ${year}`;
  document.getElementById('date').innerText = formattedDate;
}

// Fungsi untuk mengatur latar belakang berdasarkan waktu lokal
function updateBackgroundByTime() {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18; // Siang antara jam 6 pagi - 6 sore
  document.body.className = isDay ? 'day' : 'night';
}

// Fungsi untuk mengatur latar belakang sesuai waktu kota yang dicari
function updateBackgroundByCityTime(timestamp, timezoneOffset) {
  const cityTime = new Date((timestamp + timezoneOffset) * 1000);
  const hour = cityTime.getUTCHours();
  const isDay = hour >= 6 && hour < 18;
  document.body.className = isDay ? 'day' : 'night';
}

// Jalankan saat pertama kali halaman dibuka
updateDate();             // Tampilkan tanggal sekarang
updateBackgroundByTime(); // Atur latar belakang awal
