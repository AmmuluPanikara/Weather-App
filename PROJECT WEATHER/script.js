const apiKey = "e21d180ca4646b2973aea133144b10c6"; // ✅ your API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultBox = document.getElementById("weatherResult");

  if (city === "") {
    resultBox.innerHTML = "<p style='color:red;'>Please enter a city name!</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    resultBox.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${iconUrl}" alt="Weather Icon" class="weather-icon"/>
      <p><b>🌡️ Temperature:</b> ${data.main.temp}°C</p>
      <p><b>🌥️ Condition:</b> ${data.weather[0].description}</p>
      <p><b>💧 Humidity:</b> ${data.main.humidity}%</p>
      <p><b>🌬️ Wind Speed:</b> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultBox.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
