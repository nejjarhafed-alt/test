import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Library from './pages/Library';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import { incrementVisitors } from './services/storageService';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Check session storage for existing session on load & increment visitors
  useEffect(() => {
    incrementVisitors(); // Increment visitor count
    
    const session = sessionStorage.getItem('iscae_admin_session');
    if (session === 'active') {
      setIsAdmin(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem('iscae_admin_session', 'active');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('iscae_admin_session');
    window.location.hash = '#/'; // Redirect home
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar 
          onAdminClick={() => setIsLoginModalOpen(true)} 
          isAdmin={isAdmin} 
          onLogout={handleLogout}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/admin" 
              element={isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </main>

        <Footer />

        <AdminLoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </Router>
  );
};

export default App;
