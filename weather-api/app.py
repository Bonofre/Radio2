import os
import urllib.error
import urllib.request

from flask import Flask, Response, jsonify

app = Flask(__name__)

# En cPanel: Setup Python App > tu app > Environment Variables > OPENWEATHER_API_KEY
OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY')

LAT = -17.5974
LON = -69.4888


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/')
@app.route('/weather')
def weather():
    if not OPENWEATHER_API_KEY:
        return jsonify({'error': 'Falta configurar OPENWEATHER_API_KEY'}), 500

    url = (
        'https://api.openweathermap.org/data/2.5/weather'
        f'?lat={LAT}&lon={LON}&appid={OPENWEATHER_API_KEY}&units=metric&lang=es'
    )

    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            data = resp.read()
    except urllib.error.URLError:
        return jsonify({'error': 'No se pudo conectar con el servicio de clima'}), 502

    return Response(data, mimetype='application/json')
