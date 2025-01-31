const apiKey = "c5e0061f203ec2c1b5f6535319d61355"; // OpenWeather API Key
const unsplashAccessKey = "YOUR_UNSPLASH_ACCESS_KEY"; // Replace with your Unsplash API Key

document.getElementById("searchBtn").addEventListener("click", function () {
  const city = document.querySelector("#cityInput").value;
  if (!city) return alert("Please enter a city name!");

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const weatherInfo = {
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        };

        localStorage.setItem("weatherData", JSON.stringify(weatherInfo));
        displayWeather(weatherInfo);
      } else {
        document.querySelector(".weatherInfo").innerHTML =
          "<h3>City not found!</h3>";
      }
    })
    .catch(() => alert("Error fetching weather data."));
});

function fetchWeatherBackground(description) {
  const query = `${description} weather`; // Search query for Unsplash
  const unsplashUrl = `https://api.unsplash.com/photos/random?query=weather&client_id=R-LYXoSbGN89WceMkIggiDiXelm1Z_rI7p7sBrHRRqE`;

  return fetch(unsplashUrl)
    .then((response) => response.json())
    .then((data) => data.urls.regular) // Fetching Unsplash image URL
    .catch(() => "images/default.jpg"); // Fallback image
}

function displayWeather(weatherInfo) {
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}.png`;

  // Fetch and apply background image dynamically
  fetchWeatherBackground(weatherInfo.description).then((imageUrl) => {
    document.querySelector(
      ".weatherInfo"
    ).style.backgroundImage = `url('${imageUrl}')`;
  });

  // Update UI with weather details
  document.querySelector(".weatherInfo").innerHTML = `
        <h2>${weatherInfo.city}, ${weatherInfo.country}</h2>
        <h1>${weatherInfo.temp}°C</h1>
        <h3>${weatherInfo.description}</h3>
        <img src="${iconUrl}" alt="Weather Icon">
    `;
}

// Load saved weather data on page load
window.addEventListener("load", () => {
  const savedData = localStorage.getItem("weatherData");
  if (savedData) {
    displayWeather(JSON.parse(savedData));
  }
});
