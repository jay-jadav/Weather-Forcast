import { motion } from 'framer-motion';
import { getWmoIcon, getWmoDescription } from './WeatherCard';

const getDayName = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const ForecastCard = ({ data }) => {
  if (!data || !data.daily) return null;

  const { daily } = data;
  
  // daily.time, daily.weather_code, daily.temperature_2m_max ... arrays of 7 elements
  // We want to skip today (index 0) or just show the next 5 days
  const forecastDays = [];
  for (let i = 0; i < 5; i++) {
    forecastDays.push({
      date: daily.time[i],
      code: daily.weather_code[i],
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
    });
  }

  return (
    <div className="glass-card p-6 md:p-8 mt-8">
      <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
        <span>5-Day Forecast</span>
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {forecastDays.map((day, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={day.date} 
            className="flex flex-col items-center justify-between p-4 px-2 rounded-2xl bg-white/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-700/60 transition-all border border-white/40 dark:border-slate-700/50 shadow-sm hover:shadow-md"
          >
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {idx === 0 ? 'Today' : getDayName(day.date)}
            </span>
            
            <div className="my-4 transform scale-110">
              {getWmoIcon(day.code, 1, 44)}
            </div>
            
            <div className="flex items-center justify-center gap-3 mt-1">
              <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                {Math.round(day.tempMax)}°
              </span>
              <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                {Math.round(day.tempMin)}°
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wide font-bold text-center w-full truncate px-1">
              {getWmoDescription(day.code)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
