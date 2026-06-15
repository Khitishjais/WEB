import React from 'react';
import './FounderSection.css';
import founderImg from '../assets/images/founder_actual.png';

const FounderSection = () => {
  const stats = [
    {
      value: '17+',
      label: 'Years of Excellence',
      icon: '🛡️'
    },
    {
      value: '100+',
      label: 'Expert Doctors',
      icon: '👥'
    },
    {
      value: '50K+',
      label: 'Happy Patients',
      icon: '❤️'
    },
    {
      value: 'Advanced',
      label: 'Critical Care Units',
      icon: '🏥'
    }
  ];

  return (
    <section className="founder-section-lux">
      <div className="container-fluid">
        <div className="founder-label animate-up">
          OUR FOUNDER
        </div>

        <div className="founder-grid">
          <div className="founder-image-wrap animate-up">
            <img src={founderImg} alt="Dr. Priyabrata Dhir" className="founder-main-img" />
          </div>

          <div className="founder-content">
            <h1 className="founder-title animate-up">
              Healing With <br />
              <span className="text-cyan">Humanity</span>
            </h1>

            <div className="founder-info animate-up" style={{ animationDelay: '0.1s' }}>
              <h3>Dr. Priyabrata Dhir</h3>
              <p>Founder & Chairman, SPARSH Healthcare Odisha</p>
              <div className="founder-divider"></div>
            </div>

            <p className="founder-quote animate-up" style={{ animationDelay: '0.2s' }}>
              "At SPARSH Healthcare, our mission has always been to combine advanced medical excellence with compassionate patient care. Every patient deserves dignity, trust, and world-class treatment close to home."
            </p>

            <p className="founder-desc animate-up" style={{ animationDelay: '0.3s' }}>
              Under the visionary leadership of <span className="text-cyan">Dr. Priyabrata Dhir</span>,
              SPARSH Healthcare Odisha continues to redefine modern healthcare through innovation,
              critical care excellence, advanced surgical infrastructure, and patient-first services.
            </p>
          </div>
        </div>

        <div className="founder-stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card-lux animate-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="stat-icon-wrap">
                {stat.icon}
              </div>
              <div className="stat-info">
                <h4>{stat.value}</h4>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
