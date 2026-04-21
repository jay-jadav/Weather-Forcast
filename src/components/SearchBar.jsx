import { useState, useContext, useRef, useEffect } from 'react';
import { Search, X, Clock, Mic } from 'lucide-react';
import { WeatherContext } from '../context/WeatherContext';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { recentSearches, addSearch, removeSearch } = useContext(WeatherContext);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      addSearch(query.trim());
      setQuery('');
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (city) => {
    onSearch(city);
    addSearch(city);
    setQuery('');
    setShowHistory(false);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported by your browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      // Immediately search after converting speech
      onSearch(transcript.replace(/\.$/, '').trim()); // replace trailing period if present
      addSearch(transcript.replace(/\.$/, '').trim());
      setIsListening(false);
      setQuery('');
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <form onSubmit={handleSubmit} className="relative w-full flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowHistory(true)}
          placeholder={isListening ? "Listening..." : "Search for a city..."}
          className={`w-full bg-white/80 dark:bg-slate-900/80 border ${isListening ? 'border-red-400 dark:border-red-500 shadow-sm shadow-red-500/30' : 'border-slate-200 dark:border-slate-700'} text-slate-800 dark:text-white rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all focus:bg-white dark:focus:bg-slate-900`}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        
        <button
          type="button"
          onClick={handleVoiceSearch}
          className={`absolute right-3 p-1.5 rounded-lg transition-colors ${isListening ? 'bg-red-100 text-red-500 dark:bg-red-900/40 dark:text-red-400' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-500 dark:hover:text-blue-400'}`}
          title="Voice Search"
        >
          {isListening ? <Mic className="animate-pulse" size={18} /> : <Mic size={18} />}
        </button>
      </form>

      {showHistory && recentSearches.length > 0 && (
        <div className="absolute top-full mt-2 w-full glass-card bg-white/95 dark:bg-slate-900/95 shadow-xl border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden z-50">
          <div className="p-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">Recent Searches</span>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {recentSearches.map((city, idx) => (
              <li key={idx} className="flex flex-row items-center justify-between px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                <div 
                  className="flex flex-1 items-center gap-3 text-slate-700 dark:text-slate-300"
                  onClick={() => handleHistoryClick(city)}
                >
                  <Clock size={16} className="text-slate-400" />
                  <span>{city}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearch(city);
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors z-10 relative"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
