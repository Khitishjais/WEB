import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import HomePackages from '../components/HomePackages';
import SpecialitiesGrid from '../components/SpecialitiesGrid';
import FounderSection from '../components/FounderSection';
import Branches from '../components/Branches';
import EmergencyCTA from '../components/EmergencyCTA';
import PatientNavbar from '../components/PatientNavbar';
import FAQ from '../components/FAQ';
import './Home.css';

import corePillarsImg from '../assets/images/core_pillars.jpg';

import facIcu from '../assets/images/fac_icu.jpg';
import facSurgery from '../assets/images/fac_surgery.jpg';
import facEmergency from '../assets/images/fac_emergency.jpg';

import eliteSurgery from '../assets/images/elite_surgery.jpg';
import eliteIcu from '../assets/images/elite_icu.jpg';
import eliteDiagnostics from '../assets/images/elite_diagnostics.jpg';

function Home() {
  const specializedCare = [
    {
      title: 'Emergency & ICU Care',
      desc: 'Round-the-clock critical care with advanced life-support systems and expert intensivists.',
      img: eliteIcu,
      tag: 'CRITICAL CARE',
      class: 'main'
    },
    {
      title: 'Diagnostics',
      desc: 'Advanced imaging. Accurate results. Better decisions.',
      img: eliteDiagnostics,
      tag: 'PRECISION CARE',
      class: 'side1'
    },
    {
      title: 'Advanced Surgical Care',
      desc: 'Precision. Safety. Better Outcomes. Care you can trust.',
      img: eliteSurgery,
      tag: 'ADVANCED SURGERY',
      class: 'side2'
    }
  ];

  return (
    <div className="home-lux">
      <Hero />
      <HomePackages />



      {/* Specialized Medical Care */}
      <section className="section-padding bg-black-lux relative overflow-hidden">
        <div className="glow-mesh"></div>
        <div className="container-fluid">
          <div className="text-center">
            <span className="sub-title-lux">ELITE SERVICES</span>
            <h2 className="section-title-lux">Specialized Medical <span className="text-glow">Care</span></h2>
            <p className="max-w-3xl mx-auto text-muted mb-12">Advanced technology. Expert care. Better outcomes.</p>
          </div>
          <div className="specialized-grid-lux">
            {specializedCare.map((item, i) => (
              <div key={i} className={`spec-card-lux ${item.class} animate-up`} style={{animationDelay: `${i * 0.2}s`}}>
                <div className="spec-img-wrap">
                  <img src={item.img} alt={item.title} />
                  <div className="spec-overlay">
                    <span className="spec-tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <Link to="/booking" className="btn-learn-lux">
                      Learn More <span className="arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="spec-highlights-lux glass animate-up">
            <div className="sh-item">
              <span className="sh-icon">🕒</span>
              <div className="sh-text">
                <strong>24/7</strong>
                <span>Critical Care</span>
              </div>
            </div>
            <div className="sh-item">
              <span className="sh-icon">🚑</span>
              <div className="sh-text">
                <strong>Advanced</strong>
                <span>Life Support</span>
              </div>
            </div>
            <div className="sh-item">
              <span className="sh-icon">👨‍⚕️</span>
              <div className="sh-text">
                <strong>Expert</strong>
                <span>ICU Specialists</span>
              </div>
            </div>
            <div className="sh-item">
              <span className="sh-icon">🛡️</span>
              <div className="sh-text">
                <strong>Patient</strong>
                <span>Safety First</span>
              </div>
            </div>
          </div>

          <div className="spec-stats-lux animate-up">
            <div className="ss-item">
              <span className="ss-icon">🛡️</span>
              <div className="ss-text">
                <strong>17+</strong>
                <span>Years of Excellence</span>
              </div>
            </div>
            <div className="ss-item">
              <span className="ss-icon">👨‍⚕️</span>
              <div className="ss-text">
                <strong>100+</strong>
                <span>Expert Doctors</span>
              </div>
            </div>
            <div className="ss-item">
              <span className="ss-icon">🏥</span>
              <div className="ss-text">
                <strong>50+</strong>
                <span>Specialities</span>
              </div>
            </div>
            <div className="ss-item">
              <span className="ss-icon">👥</span>
              <div className="ss-text">
                <strong>25,000+</strong>
                <span>Happy Patients</span>
              </div>
            </div>
            <div className="ss-item">
              <span className="ss-icon">🛏️</span>
              <div className="ss-text">
                <strong>100+</strong>
                <span>Beds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialities Grid */}
      <SpecialitiesGrid />

      {/* Founder Section */}
      <FounderSection />

      {/* Core Values Section */}
      <section className="section-padding bg-dark-lux">
        <div className="container-fluid">
          <div className="values-split-lux">
            <div className="values-content-lux animate-up">
              <span className="sub-title-lux">CORE PHILOSOPHY</span>
              <h2 className="section-title-lux">Pillars of <span className="text-glow">Compassion</span></h2>
              
              <div className="values-list-lux">
                <div className="value-item-lux glass">
                  <div className="v-icon">🤝</div>
                  <div className="v-info">
                    <h4>Compassionate Care</h4>
                    <p>Treating every patient with dignity, empathy, and personalized attention.</p>
                  </div>
                </div>
                <div className="value-item-lux glass">
                  <div className="v-icon">👨‍⚕️</div>
                  <div className="v-info">
                    <h4>Trusted Specialists</h4>
                    <p>A team of world-renowned experts dedicated to your recovery.</p>
                  </div>
                </div>
                <div className="value-item-lux glass">
                  <div className="v-icon">🕛</div>
                  <div className="v-info">
                    <h4>24/7 Support</h4>
                    <p>Round-the-clock medical assistance for critical emergencies.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="values-visual-lux animate-up">
              <img src={corePillarsImg} alt="Compassionate Care" className="v-main-img" />
              <div className="v-overlay-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section - Asymmetrical Grid */}
      <section className="section-padding bg-white-lux" id="facilities">
        <div className="container-fluid">
          <div className="text-center">
            <span className="sub-title-lux" style={{color: 'var(--color-primary)'}}>INFRASTRUCTURE</span>
            <h2 className="section-title-lux" style={{color: '#050E15'}}>World-Class <span className="text-glow">Facilities</span></h2>
          </div>
          <div className="facilities-asym-grid">
            <div className="fac-box b1 animate-up">
              <img src={facIcu} alt="Smart ICU" />
              <div className="fac-label-lux">Smart ICU</div>
            </div>
            <div className="fac-box b2 animate-up" style={{animationDelay: '0.2s'}}>
              <img src={facSurgery} alt="Robotic Surgery" />
              <div className="fac-label-lux">Robotic Surgery</div>
            </div>
            <div className="fac-box b3 animate-up" style={{animationDelay: '0.4s'}}>
              <img src={facEmergency} alt="Emergency Unit" />
              <div className="fac-label-lux">Emergency Unit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-dark-lux">
        <div className="container-fluid">
          <div className="text-center">
            <span className="sub-title-lux">PATIENT STORIES</span>
            <h2 className="section-title-lux">Voices of <span className="text-glow">Trust</span></h2>
          </div>
          <div className="testimonials-grid-lux">
            {[
              { name: 'Rajesh Mohanty', text: 'The care I received at Sparsh was exceptional. The doctors are highly knowledgeable and the staff is very supportive.', rating: 5 },
              { name: 'Sasmita Das', text: 'One of the best hospitals in Bhubaneswar. The booking process was so smooth and the ICU care was world-class.', rating: 5 },
              { name: 'Amit Patnaik', text: 'Efficient diagnostics and very transparent billing. I highly recommend Sparsh for any cardiac issues.', rating: 5 }
            ].map((t, i) => (
              <div key={i} className="test-card-lux glass animate-up" style={{animationDelay: `${i * 0.2}s`}}>
                <div className="t-stars">{'⭐'.repeat(t.rating)}</div>
                <p>"{t.text}"</p>
                <div className="t-profile">
                  <div className="t-avatar">{t.name[0]}</div>
                  <div className="t-info">
                    <strong>{t.name}</strong>
                    <span>Verified Patient</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      <PatientNavbar />
      <div id="branches">
        <Branches />
      </div>
      
      <div id="emergency">
        <EmergencyCTA />
      </div>
    </div>
  );
}

export default Home;
