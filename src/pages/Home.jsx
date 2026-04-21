import { useEffect, useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import Navbar from '../components/Navbar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import WeatherDetails from '../components/WeatherDetails';
import TemperatureChart from '../components/TemperatureChart';
import ErrorMessage from '../components/ErrorMessage';
import { SkeletonCard } from '../components/Loader';
import { motion } from 'framer-motion';

const Home = () => {
  const { data, loading, error, fetchWeather, fetchWeatherByCoords } = useWeather();
  const [initialLoad, setInitialLoad] = useState(true);

  // Initialize with geolocation or default city on load
  useEffect(() => {
    if (initialLoad) {
      handleGeolocate();
      setInitialLoad(false);
    }
  }, [initialLoad, fetchWeather]);

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // If denied or failed, fallback to a default city
          fetchWeather('New Delhi');
        }
      );
    } else {
      fetchWeather('New Delhi');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      <Navbar onSearch={handleSearch} onGeolocate={handleGeolocate} />

      <main className="w-full">
        {error && <ErrorMessage message={error} />}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SkeletonCard />
            </div>
            <div className="lg:col-span-1">
              <SkeletonCard />
            </div>
          </div>
        ) : (
          data && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col gap-8"
            >
              <WeatherCard data={data} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col justify-start">
                  <TemperatureChart data={data} />
                  <WeatherDetails data={data} />
                </div>
                <div className="lg:col-span-1 flex flex-col justify-start">
                  <ForecastCard data={data} />
                </div>
              </div>
            </motion.div>
          )
        )}
      </main>
    </div>
  );
};

export default Home;
