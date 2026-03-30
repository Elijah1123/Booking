import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Reserve from './pages/Reserve';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);

  // Load user session on startup or refresh
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Session error:", e);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    // Use window.location for a hard reset to clear all states
    window.location.href = "/";
  };

  /**
   * ADMIN IDENTIFICATION LOGIC
   * We check if the logged-in user matches your specific admin credentials.
   */
  const isAdmin = user?.email === "elijahmzalendo659@gmail.com";

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        {/* Pass isAdmin to Navbar so it can show the "Admin Panel" button */}
        <Navbar 
          user={user} 
          setUser={setUser} 
          onLogout={handleLogout} 
          isAdmin={isAdmin} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reserve" element={<Reserve user={user} />} />
            
            {/* PROTECTED ADMIN ROUTE:
              If a non-admin tries to go to /admin, they are instantly 
              redirected back to the home page.
            */}
            <Route 
              path="/admin" 
              element={isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;