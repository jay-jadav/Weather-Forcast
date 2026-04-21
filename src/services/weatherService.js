import axios from 'axios';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherByCity = async (city, isCelsius) => {
  const geoRes = await axios.get(GEO_URL, { params: { name: city, count: 1 } });
  if (!geoRes.data.results || geoRes.data.results.length === 0) {
    throw new Error('City not found');
  }
  const { latitude, longitude, name, country, timezone } = geoRes.data.results[0];
  return getWeatherByCoords(latitude, longitude, isCelsius, name, country, timezone);
};

export const getWeatherByCoords = async (latitude, longitude, isCelsius, nameStr = 'Current Location', countryStr = '', timezoneStr = 'auto') => {
  const weatherRes = await axios.get(WEATHER_URL, {
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m',
      hourly: 'temperature_2m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: timezoneStr,
      temperature_unit: isCelsius ? 'celsius' : 'fahrenheit',
      wind_speed_unit: isCelsius ? 'kmh' : 'mph',
    }
  });

  return {
    ...weatherRes.data,
    location: { name: nameStr, country: countryStr }
  };
};
