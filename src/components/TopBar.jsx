import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar-lux">
      <div className="container-fluid top-bar-flex">
        <div className="top-bar-left">
          <div className="top-bar-item">
            <Phone size={14} className="top-icon" />
            <span>Emergency: <a href="tel:06742972222">0674 297 2222</a></span>
          </div>
          <div className="top-bar-item hide-mobile">
            <MapPin size={14} className="top-icon" />
            <span>Saheed Nagar | Kantabada</span>
          </div>
          <div className="top-bar-item hide-mobile">
            <Clock size={14} className="top-icon" />
            <span>Open 24/7</span>
          </div>
        </div>
        <div className="top-bar-right">
          <div className="social-links-top">
            <a href="https://www.facebook.com/shccpl" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://twitter.com/SPARSH_BBSR" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.1-3 3c0 7.3-5 13-12 13-4.4 0-8-3.1-8-8 0 0 3.1 1.1 5 1 0-1.4-1.4-3.1-4-3 1.1-.1 3.1 0 4 .5-1.1-2.1-1.1-4.1-1-6 1.4 1 3.1 2 5 2 0-2.4 1.1-5 4-5 1.1 0 2.1.4 3 1 .9-.2 1.8-.5 2.7-.9-.3 1-.9 1.8-1.7 2.3.8-.1 1.6-.3 2.4-.6-.5.7-1.1 1.4-1.8 2z"></path></svg>
            </a>
            <a href="https://www.instagram.com/sparshhospital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.linkedin.com/in/sparsh-hospitals-and-critical-care-996745138/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://www.youtube.com/@sparshhospital7387" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
