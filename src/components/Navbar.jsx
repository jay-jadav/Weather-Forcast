import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Sun, Moon, CloudSun, MapPin } from 'lucide-react';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';

const Navbar = ({ onSearch, onGeolocate }) => {
  const { isDarkMode, toggleTheme, isCelsius, toggleUnit } = useContext(WeatherContext);

  return (
    <nav className="glass-card mb-8 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-4 z-50">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
      >
        <CloudSun className="text-blue-500 dark:text-blue-400" size={32} />
        <span>WeatherVista</span>
      </motion.div>

      <div className="w-full md:w-auto flex-1 max-w-xl flex items-center gap-2">
        <SearchBar onSearch={onSearch} />
        <button
          onClick={onGeolocate}
          className="p-3 rounded-xl bg-blue-100 hover:bg-blue-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 transition-colors shadow-sm"
          title="Use Current Location"
        >
          <MapPin size={20} />
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-xl flex items-center shadow-inner">
          <button
            onClick={() => !isCelsius && toggleUnit()}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isCelsius ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            °C
          </button>
          <button
            onClick={() => isCelsius && toggleUnit()}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${!isCelsius ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            °F
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-sm"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
        </button>
      </motion.div>
    </nav>
  );
};

export default Navbar;
