import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Cloud, CloudRain, CloudLightning, CloudSnow, CloudFog } from 'lucide-react';

const getLocationTime = (utcOffsetSeconds) => {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + utcOffsetSeconds * 1000);
};

export const getWmoIcon = (code, isDay = 1, size = 120, className = '') => {
  // WMO Weather interpretation codes (WW)
  if (code === 0) return isDay ? <Sun size={size} className={`text-yellow-400 drop-shadow-lg ${className}`} /> : <Moon size={size} className={`text-blue-200 drop-shadow-lg ${className}`} />;
  if (code === 1 || code === 2 || code === 3) return <Cloud size={size} className={`text-slate-300 drop-shadow-lg ${className}`} />;
  if (code === 45 || code === 48) return <CloudFog size={size} className={`text-slate-400 drop-shadow-lg ${className}`} />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={size} className={`text-blue-400 drop-shadow-lg ${className}`} />;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return <CloudSnow size={size} className={`text-white drop-shadow-lg ${className}`} />;
  if (code >= 95 && code <= 99) return <CloudLightning size={size} className={`text-indigo-400 drop-shadow-lg ${className}`} />;
  return <Cloud size={size} className={`text-slate-300 drop-shadow-lg ${className}`} />;
};

export const getWmoDescription = (code) => {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Fog';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 65) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Cloudy';
};

const WeatherCard = ({ data }) => {
  if (!data || !data.current) return null;

  const { location, current } = data;
  const isDay = current.is_day;
  const code = current.weather_code;
  const utcOffset = data.utc_offset_seconds ?? 0;

  const [currentTime, setCurrentTime] = useState(() => getLocationTime(utcOffset));

  useEffect(() => {
    setCurrentTime(getLocationTime(utcOffset));
    const interval = setInterval(() => {
      setCurrentTime(getLocationTime(utcOffset));
    }, 60000);
    return () => clearInterval(interval);
  }, [utcOffset]);

  const bgClass = isDay
    ? (code === 0 || code === 1) ? 'weather-gradient-sunny' : 'weather-gradient-cloudy'
    : 'weather-gradient-night';

  const timeStr = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const dateStr = currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });


  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl ${bgClass} transition-colors duration-700`}
    >
      <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
        {getWmoIcon(code, isDay, 240)}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 tracking-tight">{location.name}{location.country ? `, ${location.country}` : ''}</h2>
          <p className="text-lg opacity-90 font-medium mb-8">
            {dateStr} | {timeStr}
          </p>
          
          <div className="flex items-start gap-4 mb-4">
            <span className="text-7xl md:text-9xl font-bold tracking-tighter leading-none">
              {Math.round(current.temperature_2m)}°
            </span>
            <div className="flex flex-col pt-3">
              <span className="text-2xl font-bold uppercase tracking-wider">{getWmoDescription(code)}</span>
              <span className="text-lg opacity-80 mt-1">Feels like {Math.round(current.apparent_temperature)}°</span>
            </div>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="hidden md:block"
        >
          {getWmoIcon(code, isDay, 160)}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
