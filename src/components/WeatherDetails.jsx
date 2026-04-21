import { Droplets, Wind, Gauge, Sunrise, Sunset } from 'lucide-react';

const DetailItem = ({ icon: Icon, label, value, unit }) => (
  <div className="glass-card p-6 flex flex-col justify-between gap-4 w-full relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
    <div className="flex items-center gap-3">
      <div className="p-2.5 bg-blue-50 dark:bg-slate-800/80 rounded-xl text-blue-500 shadow-inner">
        <Icon size={22} />
      </div>
      <span className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-baseline gap-1 mt-2">
      <span className="text-4xl font-extrabold text-slate-800 dark:text-white">{value}</span>
      <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">{unit}</span>
    </div>
  </div>
);

const WeatherDetails = ({ data }) => {
  if (!data || !data.current) return null;

  const { current } = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      <DetailItem 
        icon={Droplets} 
        label="Humidity" 
        value={Math.round(current.relative_humidity_2m)} 
        unit="%" 
      />
      <DetailItem 
        icon={Wind} 
        label="Wind" 
        value={current.wind_speed_10m} 
        unit={data.current_units?.wind_speed_10m || 'km/h'} 
      />
      <DetailItem 
        icon={Gauge} 
        label="Pressure" 
        value={Math.round(current.surface_pressure)} 
        unit="hPa" 
      />
    </div>
  );
};

export default WeatherDetails;
