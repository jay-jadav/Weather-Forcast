import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen transition-colors duration-300">
        <RouterProvider router={router} />
      </div>
    </WeatherProvider>
  );
}

export default App;
