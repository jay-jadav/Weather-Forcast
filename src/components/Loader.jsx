import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="w-full flex justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="w-16 h-16 border-4 border-slate-200 border-t-blue-500 rounded-full dark:border-slate-700 dark:border-t-blue-400"
      />
    </div>
  );
};

export const SkeletonCard = () => (
  <div className="glass-card p-6 w-full animate-pulse">
    <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-2xl w-1/3 mb-6"></div>
    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-1/4 mb-4"></div>
    <div className="flex justify-between items-end">
      <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-3xl w-1/2"></div>
      <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-full w-32"></div>
    </div>
  </div>
);

export default Loader;
