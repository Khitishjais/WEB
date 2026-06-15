import React from 'react';
import DoctorTable from '../components/DoctorTable';
import './Doctors.css';

function Doctors() {
  return (
    <section className="doctors-page container animate-fade-in-up">
      <div className="glass p-12">
        <h1 className="mb-4 text-center">Our Specialists</h1>
        <p className="mb-8 text-center text-muted">Find the right doctor for your healthcare needs with our expert team.</p>
        <DoctorTable />
      </div>
    </section>
  );
}

export default Doctors;

