import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import doctorPatientImg from '../assets/images/doctor_patient_care.png';
import hospitalBuildingImg from '../assets/images/hospital_building_modern.png';

import { useAuth } from '../context/AuthContext';
import { User, LogIn, LayoutDashboard } from 'lucide-react';

function NavBar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-parent')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (menuName, e) => {
    e.preventDefault();
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };


  return (
    <nav className={`navbar-lux ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-top-strip">
        <div className="container-fluid top-strip-flex">
          <div className="top-info">
            <span>📞 Emergency: 0674 297 2222</span>
            <span>✉️ info@sparshhospitals.com</span>
            <span>📍 Saheed Nagar | Kantabada</span>
          </div>
          <div className="top-cta">
            <a href="tel:+919123456789" className="ambulance-pill">🚑 24/7 Ambulance: +91 91234 56789</a>
          </div>
        </div>
      </div>

      <div className="nav-main">
        <div className="container-fluid nav-flex">
          <Link to="/" className="nav-logo-lux">
            <div className="logo-text-lux">
              <span className="logo-icon">⚕️</span>
              <div className="logo-brand">
                <span className="brand-main">SPARSH</span>
                <span className="brand-sub">HEALTHCARE ODISHA</span>
              </div>
            </div>
          </Link>

          <ul className={`nav-menu-lux ${mobileMenu ? 'active' : ''}`}>
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            {/* ── Standalone About dropdown ── */}
            <li className={`dropdown-parent ${activeDropdown === 'about' ? 'open' : ''}`}>
              <a href="#" onClick={(e) => toggleDropdown('about', e)}
                className={['/about','/mission','/directors','/recognition'].includes(location.pathname) ? 'active' : ''}>
                About <span className="dropdown-arrow">▼</span>
              </a>
              <div className="simple-dropdown">
                <Link to="/mission" onClick={() => setActiveDropdown(null)}>
                  <span>
                    <strong>Mission &amp; Vision</strong>
                    <em>Our founding purpose</em>
                  </span>
                </Link>
                <Link to="/directors" onClick={() => setActiveDropdown(null)}>
                  <span>
                    <strong>Board of Directors</strong>
                    <em>Meet the leadership</em>
                  </span>
                </Link>
                <Link to="/recognition" onClick={() => setActiveDropdown(null)}>
                  <span>
                    <strong>Accreditations &amp; Awards</strong>
                    <em>Our recognition &amp; milestones</em>
                  </span>
                </Link>
              </div>
            </li>
            <li className={`dropdown-parent ${activeDropdown === 'our-hospital' ? 'open' : ''}`}>
              <a href="#" onClick={(e) => toggleDropdown('our-hospital', e)}>
                Our Hospital
                <span className="dropdown-arrow">▼</span>
              </a>
              <div className="mega-menu-lux">
                <div className="mega-menu-content">
                  <div className="mega-menu-col">
                    <h3>About Sparsh</h3>
                    <ul>
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/contact">Contact &amp; Location</Link></li>
                    </ul>
                  </div>
                  <div className="mega-menu-col">
                    <h3>Hospitals & Clinics</h3>
                    <ul>
                      <li><Link to="/branches">Our Branches</Link></li>
                      <li><Link to="/contact">Contact &amp; Location</Link></li>
                    </ul>
                  </div>
                </div>
                <Link to="/branches" className="mega-menu-image">
                  <img src={hospitalBuildingImg} alt="Modern Hospital Building" />
                  <div className="mega-menu-image-caption">
                    <h4>World-Class Infrastructure</h4>
                    <p>State-of-the-art facilities providing premium healthcare.</p>
                  </div>
                </Link>
              </div>
            </li>
            <li className={`dropdown-parent ${activeDropdown === 'patient-services' ? 'open' : ''}`}>
              <a href="#" onClick={(e) => toggleDropdown('patient-services', e)}>
                Patient Services
                <span className="dropdown-arrow">▼</span>
              </a>
              <div className="mega-menu-lux">
                <div className="mega-menu-content">
                  <div className="mega-menu-col">
                    <h3>Find a Doctor</h3>
                    <ul>
                      <li><Link to="/doctors">Our Doctors</Link></li>
                      <li><Link to="/booking">Book Appointment</Link></li>
                      <li><Link to="/packages">Health Packages</Link></li>
                      <li><Link to="/video-consult">Video Consultation</Link></li>
                    </ul>
                  </div>
                  <div className="mega-menu-col">
                    <h3>Specialities</h3>
                    <ul>
                      <li><Link to="/department/Cardiology">Cardiology</Link></li>
                      <li><Link to="/department/Neurology">Neurology</Link></li>

                    </ul>
                  </div>
                </div>
                <Link to="/doctors" className="mega-menu-image">
                  <img src={doctorPatientImg} alt="Doctor Patient Care" />
                  <div className="mega-menu-image-caption">
                    <h4>Compassionate Care</h4>
                    <p>2 Million+ lives touched every year, & counting...</p>
                  </div>
                </Link>
              </div>
            </li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/packages" className={location.pathname === '/packages' ? 'active' : ''}>Health Packages</Link></li>
            <li><Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>Blogs</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
          </ul>

          <div className="nav-actions-lux">
            <Link to="/booking" className="nav-btn-lux">Book Appointment <span className="arrow">→</span></Link>
            <button className={`mobile-toggle-lux ${mobileMenu ? 'active' : ''}`} onClick={() => setMobileMenu(!mobileMenu)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
