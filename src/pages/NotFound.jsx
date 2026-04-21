import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CloudOff, Home as HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card max-w-lg w-full p-12 flex flex-col items-center"
      >
        <CloudOff size={100} className="text-slate-400 mb-8" />
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Page Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The weather forecast for this page is completely unpredictable because it doesn't exist.
        </p>
        <Link 
          to="/"
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <HomeIcon size={20} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
