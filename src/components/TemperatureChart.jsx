import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const TemperatureChart = ({ data }) => {
  const { isCelsius, isDarkMode } = useContext(WeatherContext);

  if (!data || !data.hourly) return null;

  // Find the index of the current time in the hourly array
  const nowStr = data.current.time.substring(0, 14) + "00"; // approximate to start of hour
  let currentIndex = data.hourly.time.findIndex(t => t.startsWith(data.current.time.substring(0,13)));
  if (currentIndex === -1) currentIndex = 0;

  // Take the next 24 hours of data
  const chartDataTimes = data.hourly.time.slice(currentIndex, currentIndex + 24);
  const chartDataTemps = data.hourly.temperature_2m.slice(currentIndex, currentIndex + 24);

  // Every 3 hours to not clutter the x-axis
  const filteredLabels = [];
  const filteredData = [];
  
  chartDataTimes.forEach((timeStr, idx) => {
    if (idx % 3 === 0) {
      // The API returns naive local-time strings (e.g. "2026-03-26T14:00").
      // Parse the hour directly from the string to avoid timezone shifts.
      const hourStr = timeStr.substring(11, 13);
      const hour = parseInt(hourStr, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      filteredLabels.push(`${displayHour} ${ampm}`);
      filteredData.push(chartDataTemps[idx]);
    }
  });

  const chartThemeColor = isDarkMode ? 'rgba(96, 165, 250, 1)' : 'rgba(59, 130, 246, 1)';
  const chartBgColor = isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const textColor = isDarkMode ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)';

  const dataConfig = {
    labels: filteredLabels,
    datasets: [
      {
        fill: true,
        label: `Temperature (°${isCelsius ? 'C' : 'F'})`,
        data: filteredData,
        borderColor: chartThemeColor,
        backgroundColor: chartBgColor,
        tension: 0.4,
        pointBackgroundColor: chartThemeColor,
        pointBorderColor: isDarkMode ? '#1e293b' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDarkMode ? '#f8fafc' : '#0f172a',
        bodyColor: isDarkMode ? '#cbd5e1' : '#334155',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}°${isCelsius ? 'C' : 'F'}`,
        }
      },
    },
    scales: {
      y: {
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          font: { family: "'Inter', sans-serif", size: 11 },
          callback: (value) => `${value}°`
        },
        border: { display: false }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          font: { family: "'Inter', sans-serif", size: 11 }
        },
        border: { display: false }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="glass-card p-6 md:p-8 mt-8">
      <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">24-Hour Forecast</h3>
      <div className="w-full h-64">
        <Line options={options} data={dataConfig} />
      </div>
    </div>
  );
};

export default TemperatureChart;
