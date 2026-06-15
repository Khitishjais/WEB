import React from 'react';
import { Link } from 'react-router-dom';
import doctors from '../data/doctors.json';
import './DoctorsCarousel.css';

function DoctorsCarousel() {
  return (
    <section className="doctors section-padding bg-gradient-soft">
      <div className="container">
        <div className="section-header-flex">
          <div className="section-title text-left">
            <h5 className="sub-title">WORLD-CLASS EXPERTS</h5>
            <h2 className="section-title-alt">Meet Our <span className="text-gradient">Specialists</span></h2>
          </div>
          <div className="section-action hide-mobile">
            <Link to="/doctors" className="btn-outline">View All Doctors</Link>
          </div>
        </div>

        <div className="doctor-premium-grid">
          {doctors.slice(0, 4).map((d, i) => (
            <div key={i} className="doctor-premium-card animate-up" style={{animationDelay: `${i * 0.15}s`}}>
              <div className="doc-card-header">
                <div className="doc-img-container">
                  <img src={d.img} alt={d.name} />
                  <div className="doc-badge-exp">15+ Yrs Exp</div>
                </div>
                <div className="doc-avail-tag">
                  <span className="pulse-dot"></span>
                  Available Today
                </div>
              </div>
              
              <div className="doc-card-body">
                <div className="doc-branch">📍 {d.branch}</div>
                <h4 className="doc-name">{d.name}</h4>
                <span className="doc-speciality">{d.department}</span>
                <p className="doc-education">{d.qualification}</p>
                
                <div className="doc-footer">
                  <div className="doc-time">
                    <span>Next Slot:</span>
                    <strong>11:30 AM</strong>
                  </div>
                  <Link to="/booking" state={{ doctor: d.name, department: d.department }} className="btn-primary-sm w-full">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoctorsCarousel;
