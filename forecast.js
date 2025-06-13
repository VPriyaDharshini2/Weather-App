//Forecast JS

 async function getWeather() {
      const city = document.getElementById("cityInput").value;
      const apiKey = "a1f96c6d91c3c026ee78921c483c5717"; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
          document.getElementById("weatherResult").innerHTML = `
            <div class="weather-card">
              <h3>Weather in ${data.name}</h3>
              <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
              <p><strong>Condition:</strong> ${data.weather[0].description}</p>
              <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
              <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
            </div>
          `;
        } else {
          document.getElementById("weatherResult").innerHTML = `<p>City not found. Try again.</p>`;
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherResult").innerHTML = `<p>Something went wrong.</p>`;
      }
    }
