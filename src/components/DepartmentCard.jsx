import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DepartmentCard.css';

function DepartmentCard({ department }) {
  const navigate = useNavigate();
  
  const imageMap = {
    "Cardiology": "/3d-icons/cardiology.png",
    "Neurology": "/3d-icons/neurology.png",
    "Orthopedics": "/3d-icons/orthopedics.png",
    "Orthopedics and Joint Replacement": "/3d-icons/orthopedics.png",
    "Pediatrics": "/3d-icons/pediatrics.png",
    "Paediatrics": "/3d-icons/pediatrics.png",
    "Oncology": "/3d-icons/oncology.png",
    "Onco Surgery": "/3d-icons/oncology.png",
    "Gastroenterology": "/3d-icons/gastroenterology.png",
    "GI Surgery": "/3d-icons/gastroenterology.png",
    "Emergency": "/3d-icons/emergency.png",
    "Radiology": "/3d-icons/radiology.png",
    "Radio-Diagnostics": "/3d-icons/radiology.png",
    "ENT Head and Neck Surgery": "/3d-icons/ent.png",
    "Medicine": "/3d-icons/medicine.png",
    "Pulmonology": "/3d-icons/pulmonology.png",
    "Neuro-Spine Surgery": "/3d-icons/spine.png",
    "Neuro Surgery": "/3d-icons/neurology.png",
    "Urology": "/3d-icons/urology.png",
    "Nephrology": "/3d-icons/nephrology.png",
    "Pathology": "/3d-icons/pathology.png",
    "OB and Gynecology": "/3d-icons/gynecology.png",
    "Physiotherapy": "/3d-icons/physiotherapy.png",
    "Dental Surgery": "/3d-icons/dental.png",
    "Dental": "/3d-icons/dental.png",
    "Diet and Nutrition": "/3d-icons/diet.png",
    "Surgery": "/3d-icons/surgery.png",
    "Dermatology": "✨"
  };

  const shortDescMap = {
    "Cardiology": "Comprehensive heart care, diagnostics, and advanced cardiac surgery.",
    "Neurology": "Expert diagnosis and treatment for all nervous system disorders.",
    "Orthopedics and Joint Replacement": "Advanced care for bones, joints, and musculoskeletal conditions.",
    "Oncology": "State-of-the-art cancer care with a compassionate approach.",
    "Onco Surgery": "Advanced surgical interventions for various types of cancers.",
    "Gastroenterology": "Specialized care for digestive system and liver diseases.",
    "Paediatrics": "Dedicated, child-friendly healthcare from newborns to adolescents.",
    "Emergency": "24/7 critical care and trauma center for immediate assistance.",
    "Radio-Diagnostics": "Advanced diagnostic imaging including MRI, CT, and Ultrasound.",
    "Medicine": "Comprehensive primary care and management of chronic conditions."
  };

  const isImage = (name) => {
    return imageMap[name] && imageMap[name].startsWith("/");
  };

  const handleCardClick = () => {
    navigate(`/department/${department.name}`);
  };

  return (
    <div className="dept-lux-card glass animate-fade-in-up" onClick={handleCardClick}>
      <div className="dept-lux-icon-wrap">
        {isImage(department.name) ? (
          <img src={imageMap[department.name]} alt={`${department.name} Icon`} className="dept-lux-emoji-image" />
        ) : (
          <span className="dept-lux-icon">{imageMap[department.name] || "🏥"}</span>
        )}
        <div className="dept-lux-glow"></div>
      </div>
      <h3 className="dept-lux-title">{department.name}</h3>
      <p className="dept-lux-desc">
        {shortDescMap[department.name] || "Advanced diagnostic and therapeutic procedures with state-of-the-art facilities."}
      </p>
      
      <div className="dept-lux-actions-flex">
        <Link to={`/department/${department.name}`} className="dept-lux-action" onClick={(e) => e.stopPropagation()}>
          <span>Doctors</span>
          <span className="dept-lux-arrow">→</span>
        </Link>
        <Link to="/booking" state={{ department: department.name }} className="dept-lux-btn-book" onClick={(e) => e.stopPropagation()}>
          Book Appt
        </Link>
      </div>
    </div>
  );
}

export default DepartmentCard;
