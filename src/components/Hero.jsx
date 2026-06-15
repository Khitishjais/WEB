import React from 'react';
import { Link } from 'react-router-dom';
import buildingImg from '../assets/images/hospital_building.jpg';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-lux">
      <div className="hero-glow-blob"></div>
      <div className="hero-glow-blob-2"></div>
      
      <div className="container-fluid hero-flex-lux">
        <div className="hero-content-lux animate-up">
          <span className="sub-title-lux">World-Class Healthcare Redefined</span>
          <h1 className="hero-title-lux">
            Your Health,<br />
            <span className="text-glow">Our Mission.</span>
          </h1>
          <p className="hero-desc-lux">
            Delivering compassionate and advanced healthcare with cutting-edge 
            technology and world-renowned specialists. Your journey to wellness 
            starts here.
          </p>

          <div className="hero-btns-lux">
            <Link to="/booking" className="btn-lux">Book Appointment</Link>
            <Link to="/doctors" className="btn-outline-lux">Find a Doctor</Link>
          </div>


        </div>

        <div className="hero-visual-lux">
          <div className="visual-composition-lux">
            <div className="main-visual-wrapper animate-float">
              <img 
                src={buildingImg} 
                alt="Sparsh Luxury Hospital Building" 
                className="main-visual-img" 
              />
              <div className="visual-glow"></div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
