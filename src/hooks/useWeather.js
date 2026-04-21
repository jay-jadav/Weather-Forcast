import { useState, useCallback, useContext } from 'react';
import { getWeatherByCity, getWeatherByCoords } from '../services/weatherService';
import { WeatherContext } from '../context/WeatherContext';

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isCelsius } = useContext(WeatherContext);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherByCity(city, isCelsius);
      setData(weatherData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [isCelsius]);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherByCoords(lat, lon, isCelsius);
      setData(weatherData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [isCelsius]);

  return { data, loading, error, fetchWeather, fetchWeatherByCoords };
};
