import React from 'react';
import './AboutSection.css';

function AboutSection() {
  return (
    <section className="about-section section-padding">
      <div className="container about-container">
        <div className="about-visuals animate-up">
          <div className="image-stack">
            <div className="img-box main-img">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" alt="Hospital Corridor" />
            </div>
            <div className="img-box sub-img-1 floating">
              <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1000" alt="Doctor Team" />
            </div>
            <div className="img-box sub-img-2 floating" style={{animationDelay: '2s'}}>
              <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1000" alt="Patient Care" />
            </div>
          </div>
          
          <div className="about-experience-badge glass animate-float">
            <strong>17+</strong>
            <span>Years of Excellence</span>
          </div>
        </div>

        <div className="about-content animate-up" style={{animationDelay: '0.2s'}}>
          <h5 className="sub-title">SINCE 2007</h5>
          <h2 className="section-title-alt">Trusted Healthcare <br /><span className="text-gradient">Redefined for You.</span></h2>
          <p className="about-desc">
            Sparsh Hospitals started functioning on 2nd February 2007 with a vision to redefine healthcare in Odisha. 
            The hospital boasts 100 beds with one of the largest ICUs, advanced operation theatres, and a dedicated team 
            of over 50 consultants.
          </p>
          
          <div className="about-features-grid">
            <div className="about-feature-item">
              <div className="af-icon">💎</div>
              <div className="af-text">
                <h4>Ethical Healthcare</h4>
                <p>Upholding transparency and integrity in every procedure.</p>
              </div>
            </div>
            <div className="about-feature-item">
              <div className="af-icon">⚡</div>
              <div className="af-text">
                <h4>Advanced Tech</h4>
                <p>Equipped with the latest medical equipment and tools.</p>
              </div>
            </div>
          </div>

          <div className="mv-cards">
            <div className="mv-card glass">
              <h4>Our Mission</h4>
              <p>To provide high-quality medical services with transparency and compassion.</p>
            </div>
            <div className="mv-card glass">
              <h4>Our Vision</h4>
              <p>To be the most trusted healthcare provider through medical excellence.</p>
            </div>
          </div>
          
          <button className="btn-primary mt-8">Learn More About Us</button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
