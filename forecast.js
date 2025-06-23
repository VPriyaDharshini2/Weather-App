//Forecast JS

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "a1f96c6d91c3c026ee78921c483c5717"; 

  try {
    const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (geoData.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = `<p>City not found.</p>`;
      return;
    }

    const lat = geoData.coord.lat;
    const lon = geoData.coord.lon;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    const current = forecastData.list[0];
    document.getElementById("weatherResult").innerHTML = `
    <div class="weather-card">
      <h3>Weather in ${geoData.name}</h3>
      <p>Temperature: ${current.main.temp} °C</p>
      <p>Condition: ${current.weather[0].description}</p>
      <p>Humidity: ${current.main.humidity}%</p>
      <p>Wind: ${current.wind.speed} m/s</p>
    `;

    let hourlyHtml = `<div class="hourly-grid"><h3>Next 24h Forecast:</h3>`;
    for (let i = 0; i < 8; i++) {
      const hour = forecastData.list[i];
      const time = new Date(hour.dt * 1000).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit'
      });

      hourlyHtml += `
        <div class="hour-block">
          ${time}<br>
          ${hour.main.temp} °C<br>
          ${hour.weather[0].description}
        </div>
      `;
    }
    hourlyHtml += `</div>`;
    document.getElementById("hourlyForecast").innerHTML = hourlyHtml;

  } catch (err) {
    console.error("Error:", err);
    document.getElementById("weatherResult").innerHTML = `<p>Something went wrong. Check console.</p>`;
  }
}
