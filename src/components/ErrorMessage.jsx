import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorMessage = ({ message }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-start gap-4 my-6"
    >
      <AlertCircle className="text-red-500 dark:text-red-400 flex-shrink-0" size={24} />
      <div>
        <h3 className="text-red-800 dark:text-red-300 font-semibold mb-1">Error fetching data</h3>
        <p className="text-red-600 dark:text-red-400 text-sm capitalize">{message}</p>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;
