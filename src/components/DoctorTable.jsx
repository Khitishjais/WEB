import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import doctorsRaw from '../data/doctors.json';
import './DoctorTable.css';

// Programmatically assign stable random experiences greater than 5 years
const doctors = doctorsRaw.map((doc, idx) => {
  const generatedExp = ((idx * 7 + 13) % 20) + 6; // Stable range between 6 and 25 years
  return {
    ...doc,
    experience: doc.experience || generatedExp
  };
});

function DoctorTable() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [expFilter, setExpFilter] = useState('All Experience');

  const filtered = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All Departments' || doc.department === deptFilter;
    
    let matchesExp = true;
    if (expFilter === '5+ Years') {
      matchesExp = doc.experience >= 5;
    } else if (expFilter === '10+ Years') {
      matchesExp = doc.experience >= 10;
    } else if (expFilter === '15+ Years') {
      matchesExp = doc.experience >= 15;
    } else if (expFilter === '20+ Years') {
      matchesExp = doc.experience >= 20;
    }

    return matchesSearch && matchesDept && matchesExp;
  });

  const uniqueDepts = ['All Departments', ...new Set(doctors.map(d => d.department))];

  return (
    <div className="doctor-list-container">
      <div className="roster-header">
        <div className="search-filter-row">
          <div className="search-wrap">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="roster-search"
            />
            <span className="search-icon">🔍</span>
          </div>
          <select 
            className="roster-dept-filter"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            {uniqueDepts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select 
            className="roster-exp-filter"
            value={expFilter}
            onChange={(e) => setExpFilter(e.target.value)}
          >
            <option value="All Experience">All Experience Levels</option>
            <option value="5+ Years">5+ Years Experience</option>
            <option value="10+ Years">10+ Years Experience</option>
            <option value="15+ Years">15+ Years Experience</option>
            <option value="20+ Years">20+ Years Experience</option>
          </select>
        </div>
      </div>

      <div className="doctor-luxury-grid">
        {filtered.map((doc, idx) => (
          <div key={idx} className="doc-lux-card card animate-up" style={{animationDelay: `${idx * 0.05}s`}}>
            <div className="doc-img-wrap">
              <img src={doc.img} alt={doc.name} />
              <div className="branch-tag">{doc.branch}</div>
            </div>
            
            <div className="doc-lux-body">
              <span className="doc-dept-tag">{doc.department}</span>
              <h3>{doc.name}</h3>
              <p className="doc-lux-qual">{doc.qualification}</p>
              
              <div className="doc-lux-experience">
                <span className="exp-icon">🏆</span>
                <span className="exp-text">{doc.experience}+ Years Experience</span>
              </div>
              
              <div className="doc-lux-meta">
                <div className="meta-item">
                  <span className="m-icon">🕒</span>
                  <span>{doc.timings}</span>
                </div>
              </div>
              
              <Link to="/booking" className="btn-book-green w-full mt-4">Book Appointment</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorTable;
