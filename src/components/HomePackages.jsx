import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import packages from '../data/packages.json';
import './HomePackages.css';

const HomePackages = () => {
  const navigate = useNavigate();

  return (
    <section className="home-packages-section">
      <div className="container-fluid">
        <div className="text-center mb-12">
          <span className="sub-title-lux">PREVENTIVE CARE</span>
          <h2 className="section-title-lux">Health <span className="text-glow">Check-up</span> Plans</h2>
          <p className="max-w-2xl mx-auto text-muted">Comprehensive screening packages designed for every stage of life.</p>
        </div>

        <div className="home-packages-grid">
          {packages.map((pkg, i) => (
            <motion.div 
              key={pkg.id}
              className="home-pkg-card animate-up"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="hp-img-container">
                <img src={pkg.image} alt={pkg.name} />
                <div className="hp-price">₹{pkg.price}</div>
              </div>
              <div className="hp-content">
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <ul className="hp-features">
                  {(pkg.tests || pkg.services).slice(0, 3).map((item, idx) => (
                    <li key={idx}><Check size={14} className="hp-check" /> {item}</li>
                  ))}
                  <li className="more-text">+ many more...</li>
                </ul>
                <div className="hp-actions">
                  <button className="hp-btn-main" onClick={() => navigate('/booking', { 
                    state: { 
                      packageId: pkg.id, 
                      price: pkg.price, 
                      packageName: pkg.name,
                      isPackage: true
                    } 
                  })}>
                    Book Now
                  </button>
                  <button className="hp-btn-outline" onClick={() => navigate('/packages')}>
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePackages;
