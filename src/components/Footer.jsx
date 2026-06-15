import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-fluid">
        <div className="footer-top-grid">
          <div className="footer-brand-area">
            <img src="https://sparshhospitals.com/wp-content/uploads/2024/05/sparshlogo.png" alt="Sparsh" className="footer-logo-premium" />
            <p className="footer-tagline">
              Sparsh Hospitals Bhubaneswar is a NABH accredited multi-speciality healthcare provider 
              committed to ethical and compassionate clinical excellence since 2007.
            </p>
            <div className="social-pill-group">
              <a href="https://www.facebook.com/shccpl" target="_blank" rel="noopener noreferrer" className="social-pill">Facebook</a>
              <a href="https://twitter.com/SPARSH_BBSR" target="_blank" rel="noopener noreferrer" className="social-pill">Twitter</a>
              <a href="https://www.instagram.com/sparshhospital/" target="_blank" rel="noopener noreferrer" className="social-pill">Instagram</a>
              <a href="https://www.linkedin.com/in/sparsh-hospitals-and-critical-care-996745138/" target="_blank" rel="noopener noreferrer" className="social-pill">LinkedIn</a>
              <a href="https://www.youtube.com/@sparshhospital7387" target="_blank" rel="noopener noreferrer" className="social-pill">YouTube</a>
            </div>
          </div>

          <div className="footer-link-col">
            <h4>Medical Services</h4>
            <ul>
              <li><Link to="/departments">Cardiology</Link></li>
              <li><Link to="/departments">Neurology</Link></li>
              <li><Link to="/departments">Orthopaedics</Link></li>
              <li><Link to="/departments">Oncology</Link></li>
              <li><Link to="/departments">Gastroenterology</Link></li>
            </ul>
          </div>

          <div className="footer-link-col">
            <h4>Quick Access</h4>
            <ul>
              <li><Link to="/about">Our Hospital</Link></li>
              <li><Link to="/doctors">Find a Doctor</Link></li>
              <li><Link to="/booking">Online Booking</Link></li>
              <li><Link to="/blog">Clinical Blogs</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>Get In Touch</h4>
            <div className="contact-item">
              <span className="c-icon">📍</span>
              <p>Plot No. 184, Sahid Nagar, Bhubaneswar, Odisha - 751007</p>
            </div>
            <div className="contact-item">
              <span className="c-icon">📞</span>
              <p>0674 297 2222 / 297 1111</p>
            </div>
            <div className="contact-item">
              <span className="c-icon">✉️</span>
              <p>info@sparshhospitals.com</p>
            </div>
            <div className="emergency-box mt-6">
              <strong>Emergency Helpline</strong>
              <p>+91 91234 56789</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom-premium">
          <p>&copy; 2024 Sparsh Hospitals Pvt. Ltd. | All Rights Reserved | NABH Accredited</p>
          <div className="footer-badges">
            <span className="nabh-badge">NABH Accredited</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
