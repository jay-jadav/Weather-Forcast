import { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const toggleUnit = () => setIsCelsius((prev) => !prev);

  const addSearch = (city) => {
    if (!city) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, 5);
    });
  };

  const removeSearch = (city) => {
    setRecentSearches((prev) => prev.filter((item) => item.toLowerCase() !== city.toLowerCase()));
  };

  return (
    <WeatherContext.Provider
      value={{
        isCelsius,
        toggleUnit,
        isDarkMode,
        toggleTheme,
        recentSearches,
        addSearch,
        removeSearch,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
