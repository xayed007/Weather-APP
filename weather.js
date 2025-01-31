document.getElementById("searchBtn").addEventListener("click", fetchWeather);
window.addEventListener("load", loadSavedWeather);

const apiKey = "c5e0061f203ec2c1b5f6535319d61355";

function fetchWeather() {
  const city = document.querySelector("#cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const weatherInfo = {
          city: data.name,
          country: data.sys.country,
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
        };

        localStorage.setItem("weatherData", JSON.stringify(weatherInfo));
        displayWeather(weatherInfo);
      } else {
        document.querySelector(
          ".weatherInfo"
        ).innerHTML = `<h3>City name not found</h3>`;
      }
    })
    .catch((error) => console.error("Error fetching weather:", error));
}

function displayWeather(weatherInfo) {
  document.querySelector(".weatherInfo").innerHTML = `
        <h2>${weatherInfo.city}, ${weatherInfo.country}</h2>
        <h1>${weatherInfo.temp}°C</h1>
        <h3>${weatherInfo.description}</h3>
       
    `;
}

function loadSavedWeather() {
  const savedData = localStorage.getItem("weatherData");
  if (savedData) {
    const weatherInfo = JSON.parse(savedData);
    displayWeather(weatherInfo);
  }
}
