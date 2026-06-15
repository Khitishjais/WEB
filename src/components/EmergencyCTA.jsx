import React from 'react';
import { Siren, PhoneCall, Navigation } from 'lucide-react';
import './EmergencyCTA.css';

function EmergencyCTA() {
  return (
    <section className="emergency-cta-lux">
      <div className="container em-flex-lux">
        <div className="em-text-lux">
          <div className="em-icon-lux-wrap">
            <Siren size={40} className="pulse-icon" />
          </div>
          <div>
            <h2>24x7 Emergency & Trauma Care</h2>
            <p>Our emergency team is always ready to save lives. Advanced life support ambulances available.</p>
          </div>
        </div>
        <div className="em-actions-lux">
          <a href="tel:06742972222" className="btn-em-primary">
            <PhoneCall size={20} /> Call Ambulance
            <span className="phone-num">0674 297 2222</span>
          </a>
          <button className="btn-em-outline">
            <Navigation size={20} /> Get Directions
          </button>
        </div>
      </div>
    </section>
  );
}

export default EmergencyCTA;
