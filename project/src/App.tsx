import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import CarGamesDashboard from './pages/CarGamesDashboard';
import BikeGamesDashboard from './pages/BikeGamesDashboard';
import GunGamesDashboard from './pages/GunGamesDashboard';
import MindGamesDashboard from './pages/MindGamesDashboard';
import AdventureGamesDashboard from './pages/AdventureGamesDashboard';
import FunGamesDashboard from './pages/FunGamesDashboard';
import MultiplayerGamesDashboard from './pages/MultiplayerGamesDashboard';
import FightingGamesDashboard from './pages/FightingGamesDashboard';
import StrategyGamesDashboard from './pages/StrategyGamesDashboard';
import { categories } from './data/categories';
import { Auth } from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'neon'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme}`}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/car-games" element={<CarGamesDashboard />} />
              <Route path="/bike-games" element={<BikeGamesDashboard />} />
              <Route path="/gun-games" element={<GunGamesDashboard />} />
              <Route path="/mind-games" element={<MindGamesDashboard />} />
              <Route path="/adventure-games" element={<AdventureGamesDashboard />} />
              <Route path="/fun-games" element={<FunGamesDashboard />} />
              <Route path="/multiplayer-games" element={<MultiplayerGamesDashboard />} />
              <Route path="/fighting-games" element={<FightingGamesDashboard />} />
              <Route path="/strategy-games" element={<StrategyGamesDashboard />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
