import React from 'react';
import { useParams, Link } from 'react-router-dom';
import doctors from '../data/doctors.json';
import './DepartmentDetail.css';

const departmentInfo = {
  "Cardiology": "Our Cardiology department provides comprehensive heart care, including diagnostics, interventional cardiology, and cardiac surgery. We use the latest technology to ensure the best outcomes for our patients.",
  "Neurology": "The Neurology department specializes in the diagnosis and treatment of all categories of conditions and disease involving the central and peripheral nervous systems.",
  "Orthopaedics": "Our Orthopaedics team is dedicated to the prevention, diagnosis, and treatment of disorders of the bones, joints, ligaments, tendons, and muscles.",
  "Oncology": "We offer state-of-the-art cancer care, including chemotherapy, radiation therapy, and surgical oncology, with a compassionate and holistic approach.",
  "Gastroenterology": "Our specialists provide expert care for digestive and liver diseases, using advanced endoscopic procedures for diagnosis and treatment.",
  "Pediatrics": "We provide dedicated healthcare services for children, from newborns to adolescents, ensuring a supportive and friendly environment.",
  "Emergency": "Our 24/7 emergency and trauma center is equipped to handle all critical medical situations with speed and expertise.",
  "Radiology": "We offer a wide range of diagnostic imaging services, including MRI, CT, X-ray, and Ultrasound, provided by expert radiologists.",
  "Nephrology": "Expert care for kidney-related conditions, including dialysis and kidney transplant services.",
  "Urology": "Comprehensive treatment for urinary tract conditions and male reproductive health.",
  "Dermatology": "Advanced care for skin, hair, and nail conditions, including cosmetic and medical dermatology.",
  "General Medicine": "Comprehensive primary care and management of chronic conditions by expert physicians."
};

function DepartmentDetail() {
  const { deptName } = useParams();
  
  // Filter doctors based on department name (case-insensitive and partial match)
  const filteredDoctors = doctors.filter(doctor => 
    doctor.department.toLowerCase().includes(deptName.toLowerCase()) ||
    deptName.toLowerCase().includes(doctor.department.toLowerCase())
  );

  const info = departmentInfo[deptName] || "We provide world-class medical expertise in this speciality with state-of-the-art technology and compassionate care.";

  return (
    <div className="dept-detail-page animate-fade-in">
      <div className="container">
        <div className="dept-header">
          <Link to="/departments" className="back-link">← Back to Specialities</Link>
          <h1>{deptName}</h1>
          <p className="dept-lead">{info}</p>
        </div>

        <section className="dept-doctors">
          <h2>Specialists in {deptName}</h2>
          <div className="doctors-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <div key={index} className="doctor-card-simple">
                  <div className="doc-img-wrap">
                    <img src={doctor.img} alt={doctor.name} />
                  </div>
                  <div className="doc-info">
                    <h3>{doctor.name}</h3>
                    <p className="doc-qual">{doctor.qualification}</p>
                    <p className="doc-timing">🕒 {doctor.timings}</p>
                    <Link to="/booking" state={{ doctor: doctor.name, department: deptName }} className="btn-book-sm">
                      Book Appointment
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-doctors">No specialists found for this department at the moment.</p>
            )}
          </div>
        </section>

        <div className="dept-cta">
          <h3>Need immediate assistance?</h3>
          <p>Book an appointment with our experts today and get the care you deserve.</p>
          <Link to="/booking" state={{ department: deptName }} className="btn-primary">
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DepartmentDetail;
