const apiKey = "11443e7d342145159bb121708262107";
const apiBaseUrl = "https://api.weatherapi.com/v1/current.json";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

async function getWeather(city) {
    const url = `${apiBaseUrl}?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById("city-name").innerText = data.location.name;
    document.getElementById("description").innerText = data.current.condition.text;
    document.getElementById("temperature").innerText = Math.round(data.current.temp_c);
    document.getElementById("humidity").innerText = data.current.humidity;
    document.getElementById("wind").innerText = data.current.wind_kph;
}

searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        getWeather(cityInput.value);
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && cityInput.value.trim() !== "") {
        getWeather(cityInput.value);
    }
});