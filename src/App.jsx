import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Appointments from './pages/Appointments';
import Tasks from './pages/Tasks';
import Leave from './pages/Leave';
import Inventory from './pages/Inventory';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');
  const [auth, setAuth] = useState(!!localStorage.getItem('auth'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCollapse = () => setCollapsed(!collapsed);
  const handleNavigate = () => window.scrollTo(0, 0);

  // 1. Theme initialization logic (Runs once on mount)
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    if (initial === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  // 2. NEW: Function to handle theme change from Sidebar
  // This takes the desired next theme string ('light' or 'dark') from the Sidebar
  const handleSetTheme = (nextTheme) => {
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    // Apply DOM class change
    if (nextTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const handleLogin = (token) => {
    if (token) {
      localStorage.setItem('auth', token);
      setAuth(true);
    }
  };

  function Inner() {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('auth');
      localStorage.removeItem('currentProfile');
      setAuth(false);
      navigate('/login');
    };

    const openMobile = () => setMobileOpen(true);
    const closeMobile = () => setMobileOpen(false);

    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar 
          collapsed={collapsed} 
          onCollapse={handleCollapse} 
          onNavigate={handleNavigate} 
          theme={theme} 
          onSetTheme={handleSetTheme} // <-- CORRECTED PROP HERE
          mobileOpen={mobileOpen} 
          onCloseMobile={closeMobile} 
        />

        <div className="flex-1 flex flex-col">
          <Navbar onLogout={handleLogout} onOpenMenu={openMobile} />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/login" element={auth ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
              <Route path="/" element={auth ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/attendance" element={auth ? <Attendance /> : <Navigate to="/login" />} />
              <Route path="/appointments" element={auth ? <Appointments /> : <Navigate to="/login" />} />
              <Route path="/tasks" element={auth ? <Tasks /> : <Navigate to="/login" />} />
              <Route path="/leave" element={auth ? <Leave /> : <Navigate to="/login" />} />
              <Route path="/inventory" element={auth ? <Inventory /> : <Navigate to="/login" />} />
              <Route path="/products" element={auth ? <Products /> : <Navigate to="/login" />} />
              <Route path="/employees" element={auth ? <Employees /> : <Navigate to="/login" />} />
              <Route path="/reports" element={auth ? <Reports /> : <Navigate to="/login" />} />
              <Route path="/settings" element={auth ? <Settings /> : <Navigate to="/login" />} />
              <Route path="/profile" element={auth ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Inner />
    </Router>
  );
}

export default App;