import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import MissionVision from './pages/MissionVision';
import BoardOfDirectors from './pages/BoardOfDirectors';
import Recognition from './pages/Recognition';
import Departments from './pages/Departments';
import Doctors from './pages/Doctors';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import DepartmentDetail from './pages/DepartmentDetail';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import LoginModal from './components/LoginModal';
import { Toaster } from 'react-hot-toast';
import ChatBot from './components/ChatBot/ChatBot';
import HealthPackages from './components/HealthPackages';
import BranchesPage from './pages/BranchesPage';
import Blog from './pages/Blog';
import './styles/globals.css';

// Floating WhatsApp Component
const WhatsAppButton = () => (
  <a 
    href="https://wa.me/917894433821?text=Hi%20Sparsh%20AI%2C%20I%20want%20to%20book%20an%20appointment" 
    className="whatsapp-float" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
  </a>
);



function AppContent() {
  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <TopBar />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<MissionVision />} />
          <Route path="/directors" element={<BoardOfDirectors />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/department/:deptName" element={<DepartmentDetail />} />
          <Route path="/services" element={<Home />} /> 
          <Route path="/packages" element={<HealthPackages />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="*" element={
            <div style={{ padding: '150px 20px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h1 style={{ color: 'var(--color-primary-dark)', fontSize: '3rem', marginBottom: '20px' }}>Coming Soon</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>
                This page is currently under development. We are working hard to bring you this feature soon.
              </p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
