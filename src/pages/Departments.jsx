import React from 'react';
import './Departments.css';
import departments from "../data/departments.json";
import DepartmentCard from '../components/DepartmentCard';

function Departments() {
  return (
    <div className="departments-page container animate-fade-in-up">
      <div className="luxury-page-header text-center mb-16">
        <h1 className="text-gradient">Our Specialities</h1>
        <p className="text-muted">State-of-the-art multi-specialty care powered by advanced technology.</p>
      </div>

      <div className="departments-luxury-grid">
        {departments.map((dept) => (
          <DepartmentCard key={dept.id} department={dept} />
        ))}
      </div>
    </div>
  );
}

export default Departments;
