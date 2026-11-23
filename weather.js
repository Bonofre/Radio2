// Ajusta esta ruta a la "Application URL" que configures en cPanel > Setup Python App
const WEATHER_API_URL = '/weatherapi/';

async function getWeather() {
    try {
        const response = await fetch(WEATHER_API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const cityName = "Visviri";
        const countryCode = "CL";
        const windSpeedKmh = (data.wind.speed * 3.6).toFixed(1);
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById('climaContainer').innerHTML = `
            <h4>${cityName}, ${countryCode}</h4>
            <div class="d-flex align-items-center justify-content-center">
                <img src="${iconUrl}" alt="${data.weather[0].description}" class="me-2">
                <p class="mb-0"><strong>${data.weather[0].description}</strong></p>
            </div>
            <p><strong>Temperatura:</strong> ${data.main.temp}&deg;C</p>
            <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
            <p><strong>Viento:</strong> ${windSpeedKmh} km/h</p>
        `;
    } catch (error) {
        console.error('Error al obtener el clima:', error);
        document.getElementById('climaContainer').innerHTML =
            `<p>No se pudo cargar el clima.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
