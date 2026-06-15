import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, X, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import packages from '../data/packages.json';
import './HealthPackages.css';

const HealthPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="packages-page">
      <section className="packages-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-title"
        >
          Discover Our <span className="highlight">Health Check-up</span> Plans
        </motion.h1>
        <p className="luxury-subtitle">Prevention is the cornerstone of a vibrant life. Choose a plan tailored for you.</p>
      </section>

      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <motion.div 
            key={pkg.id}
            className="package-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="package-image-container">
              <img src={pkg.image} alt={pkg.name} className="package-image" />
              <div className="package-overlay">
                <span className="price-tag">₹{pkg.price}</span>
              </div>
            </div>
            
            <div className="package-content">
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
              
              <div className="package-meta">
                <span className="original-price">₹{pkg.originalPrice}</span>
                <span className="discount-badge">Save {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%</span>
              </div>

              <button 
                className="view-details-btn"
                onClick={() => setSelectedPackage(pkg)}
              >
                View Details <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPackage && (
          <motion.div 
            className="package-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div 
              className="package-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedPackage(null)}>
                <X size={24} />
              </button>

              <div className="modal-header">
                <h2>{selectedPackage.name}</h2>
                <div className="modal-price-wrap">
                  <div className="modal-price">₹{selectedPackage.price}</div>
                  <span className="tax-inclusive">Inclusive of All Taxes</span>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-info-section">
                  <h3><Info size={18} /> Included Tests & Services</h3>
                  <div className="tests-grid">
                    {(selectedPackage.tests || selectedPackage.services).map((item, idx) => (
                      <div key={idx} className="test-item">
                        <Check size={16} className="check-icon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-cta">
                  <button className="book-package-btn" onClick={() => {
                    navigate('/booking', { 
                      state: { 
                        packageId: selectedPackage.id, 
                        price: selectedPackage.price, 
                        packageName: selectedPackage.name,
                        isPackage: true
                      } 
                    });
                    setSelectedPackage(null);
                  }}>
                    Book This Package Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthPackages;
