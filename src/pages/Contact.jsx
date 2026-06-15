import React from 'react';
import Branches from '../components/Branches';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page container animate-fade-in-up">
      <div className="luxury-page-header text-center mb-16">
        <h1 className="text-gradient">Get In Touch</h1>
        <p className="text-muted">Available 24/7 for your medical emergencies and inquiries.</p>
      </div>

      <div className="contact-lux-grid">
        <div className="contact-lux-info">
          <div className="info-lux-card glass">
            <span className="info-lux-icon">📍</span>
            <div className="info-lux-text">
              <h4>Main Branch</h4>
              <p>Sahid Nagar, Bhubaneswar, Odisha 751007</p>
            </div>
          </div>
          <div className="info-lux-card glass">
            <span className="info-lux-icon">📞</span>
            <div className="info-lux-text">
              <h4>Call Support</h4>
              <p>0674-6626666 / 6626667</p>
            </div>
          </div>
          <div className="info-lux-card glass">
            <span className="info-lux-icon">✉️</span>
            <div className="info-lux-text">
              <h4>Email Address</h4>
              <p>info@sparshhospitals.com</p>
            </div>
          </div>
        </div>

        <div className="contact-lux-form-wrap glass">
          <form className="lux-form" onSubmit={(e) => e.preventDefault()}>
            <div className="lux-form-row">
              <div className="lux-form-group">
                <label>First Name</label>
                <input type="text" placeholder="John" required />
              </div>
              <div className="lux-form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Doe" required />
              </div>
            </div>
            <div className="lux-form-group mt-6">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
            <div className="lux-form-group mt-6">
              <label>Message</label>
              <textarea placeholder="How can we help you?" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn-primary w-full mt-8">Send Message</button>
          </form>
        </div>
      </div>

      {/* Embedded branches with Saheed Nagar and Kantabada locations */}
      <div className="contact-branches-section" style={{ marginTop: '80px', borderTop: '1px solid var(--color-border)' }}>
        <Branches />
      </div>
    </div>
  );
}

export default Contact;
