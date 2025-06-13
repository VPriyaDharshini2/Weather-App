//Cities JS

const apiKey = "a1f96c6d91c3c026ee78921c483c5717"; 
const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cityWeatherContainer");

  cities.forEach(city => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const card = document.createElement("div");
        card.className = "city-card";
        card.innerHTML = `
          <h3>${data.name}</h3>
          <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
          <p><strong>${data.main.temp}°C</strong></p>
          <p>${data.weather[0].main}</p>
        `;
        container.appendChild(card);
      })
      .catch(error => {
        const card = document.createElement("div");
        card.className = "city-card";
        card.innerHTML = `<p>Error loading weather for ${city}</p>`;
        container.appendChild(card);
        console.error("Error fetching weather data:", error);
      });
  });
});
