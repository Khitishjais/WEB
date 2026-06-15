import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Package, PhoneCall, CreditCard } from 'lucide-react';
import './PatientNavbar.css';

const PatientNavbar = () => {
  const navItems = [
    { icon: <Calendar size={20} />, label: 'Book Appointment', path: '/booking' },
    { icon: <Search size={20} />, label: 'Find a Doctor', path: '/doctors' },
    { icon: <Package size={20} />, label: 'Health Packages', path: '/packages' },
    { icon: <CreditCard size={20} />, label: 'Pay Online', path: '/payment' },
    { icon: <PhoneCall size={20} />, label: 'Contact Us', path: '/contact' }
  ];

  return (
    <div className="patient-navbar-container">
      <div className="container-fluid">
        <nav className="patient-nav glass">
          {navItems.map((item, index) => (
            <Link key={index} to={item.path} className="patient-nav-item">
              <span className="p-nav-icon">{item.icon}</span>
              <span className="p-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PatientNavbar;
