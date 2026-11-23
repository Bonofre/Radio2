# Su Radio 93.5 FM · Visviri

Sitio web de **Su Radio 93.5 FM**, de Visviri ("donde nace Chile"): radio en vivo, información de la zona, videos y el clima del momento.

## Objetivo
Darle a una radio comunitaria del altiplano una presencia en internet donde se pueda **escuchar la transmisión desde cualquier lugar**.

## Qué hace
- **Reproductor en vivo** de la señal de la radio.
- Sección sobre Visviri y la radio, y videos de la zona.
- **Widget del clima** de Visviri en tiempo real.

## Cómo funciona
- Frontend en **HTML, CSS, JavaScript y Bootstrap 5**.
- `weather-api/`: una pequeña API en **Python (Flask)** que consulta **OpenWeather** con las coordenadas de Visviri. Así la API key queda en el servidor y no se ve en el navegador.

## Levantarlo
```bash
# Frontend
python3 -m http.server 8000

# API del clima
cd weather-api
pip install -r requirements.txt
export OPENWEATHER_API_KEY=tu_clave
python app.py
```
