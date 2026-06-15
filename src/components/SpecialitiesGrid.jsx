import React from 'react';
import { Link } from 'react-router-dom';
import './SpecialitiesGrid.css';

import deptCardiology from '../assets/images/dept_cardiology.jpg';
import deptNeurology from '../assets/images/dept_neurology.jpg';
import deptOrthopaedic from '../assets/images/dept_orthopaedic.jpg';
import deptGastroenterology from '../assets/images/dept_gastroenterology.jpg';
import deptNephrology from '../assets/images/dept_nephrology.jpg';
import deptSurgery from '../assets/images/dept_surgery.jpg';

const specialities = [
  { 
    name: 'Cardiology', 
    img: deptCardiology,
  },
  { 
    name: 'Neurology', 
    img: deptNeurology,
  },
  { 
    name: 'Orthopedics', 
    img: deptOrthopaedic,
  },
  { 
    name: 'Gastroenterology', 
    img: deptGastroenterology,
  },
  { 
    name: 'Nephrology', 
    img: deptNephrology,
  },
  { 
    name: 'General Surgery', 
    img: deptSurgery,
  }
];

function SpecialitiesGrid() {
  return (
    <section className="section-padding bg-dark-lux" id="specialities">
      <div className="container-fluid">
        <div className="text-center">
          <span className="sub-title-lux">CENTERS OF EXCELLENCE</span>
          <h2 className="section-title-lux">Our Medical <span className="text-glow">Specialities</span></h2>
        </div>

        <div className="spec-grid-lux">
          {specialities.map((spec, i) => (
            <Link to={`/departments/${spec.name.toLowerCase()}`} key={i} className="spec-item-lux animate-up" style={{animationDelay: `${i * 0.1}s`}}>
              <div className="spec-img-box infographic-style">
                <img src={spec.img} alt={spec.name} />
                <div className="spec-overlay-hover-only">
                  <span className="spec-link-lux">View Department →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/departments" className="btn-lux">View All Departments</Link>
        </div>
      </div>
    </section>
  );
}

export default SpecialitiesGrid;
