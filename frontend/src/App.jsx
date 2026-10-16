import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Landing from './components/Landing'; // <-- NEW LANDING PAGE IMPORT
import Sidebar from './components/Sidebar';
import DashboardTab from './components/DashboardTab';
import ScanTab from './components/ScanTab';
import HistoryTab from './components/HistoryTab';
import FieldMapTab from './components/FieldMapTab';
import { getHistory, getStats } from './services/api';

// Rich treatment dictionary used across components
const treatments = {
  "Tomato___Late_blight": { action: "Apply copper-based fungicide immediately.", cost: "₹500 - ₹800 / acre", yieldLoss: "30 - 40%" },
  "Potato___Early_blight": { action: "Apply chlorothalonil or mancozeb.", cost: "₹400 - ₹600 / acre", yieldLoss: "20 - 30%" },
  "Corn___Healthy": { action: "Your crop is healthy!", cost: "₹0", yieldLoss: "0%" },
  "Tomato___Healthy": { action: "Your crop is healthy!", cost: "₹0", yieldLoss: "0%" },
};

export default function App() {
  // ==========================================
  // GLOBAL STATES
  // ==========================================
  const [showLanding, setShowLanding] = useState(true); // Controls Landing vs App
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ total: 0, healthy: 0, diseased: 0 });
  const [weather, setWeather] = useState({ temp: "--", humidity: "--", risk: false });

  // ==========================================
  // EFFECTS
  // ==========================================
  useEffect(() => {
    const savedUser = localStorage.getItem('farmwatch_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowLanding(false); // Skip landing if user is already logged in
    }
  }, []);

  useEffect(() => {
    if (user) {
      getHistory().then(res => setHistory(res.data)).catch(console.error);
      getStats().then(res => setStats(res.data)).catch(console.error);
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m`);
            const humidity = res.data.current.relative_humidity_2m;
            setWeather({ 
              temp: `${res.data.current.temperature_2m}°C`, 
              humidity: `${humidity}%`, 
              risk: humidity > 70 
            });
          } catch (e) { console.error("Weather error", e); }
        });
      }
    }
  }, [user, result]);

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleLogin = (userData) => { 
    setUser(userData); 
    localStorage.setItem('farmwatch_user', JSON.stringify(userData)); 
  };
  
  const handleLogout = () => { 
    setUser(null); 
    localStorage.removeItem('farmwatch_user');
    setShowLanding(true); // Return to landing page on logout
  };

  // ==========================================
  // RENDER LOGIC
  // ==========================================

  // 1. Show Landing Page First
  if (showLanding) {
    return <Landing onGetStarted={() => setShowLanding(false)} />;
  }

  // 2. Show Login Page if Not Authenticated
  if (!user) {
    return <Login onLogin={handleLogin} onBack={() => setShowLanding(true)} />;
  }

  // 3. Show Main Dashboard App
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex font-sans selection:bg-emerald-500 selection:text-white">
      {/* SIDEBAR */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        
        {/* TOP BAR */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8">
          <h2 className="text-lg font-bold text-white capitalize">{activeTab} Overview</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 text-slate-300">
              🌡️ {weather.temp}
            </div>
            <div className={`px-3 py-1 rounded-lg border font-semibold transition-colors ${
              weather.risk 
                ? 'bg-red-500/20 border-red-500/30 text-red-400' 
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              💧 {weather.humidity} {weather.risk && '(High Risk)'}
            </div>
          </div>
        </header>

        {/* SCROLLABLE TAB CONTENT */}
        <div className="flex-grow overflow-y-auto p-8 bg-slate-950">
          {activeTab === 'dashboard' && (
            <DashboardTab stats={stats} weather={weather} />
          )}
          
          {activeTab === 'scan' && (
            <ScanTab 
              preview={preview} 
              setPreview={setPreview} 
              file={file} 
              setFile={setFile} 
              result={result} 
              setResult={setResult} 
              loading={loading} 
              setLoading={setLoading} 
              treatments={treatments} 
            />
          )}
          
          {activeTab === 'map' && <FieldMapTab />}
          
          {activeTab === 'history' && (
            <HistoryTab history={history} stats={stats} />
          )}
        </div>
      </main>
    </div>
  );
}