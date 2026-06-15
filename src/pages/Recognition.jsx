import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { awardPhotos, awards } from '../data/aboutData';
import './About.css';

function AwardPhotoCard({ photo, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`award-photo-card ${index === 0 ? 'award-photo-card--tall' : ''}`}
      style={{ animationDelay: `${index * 0.1}s`, '--award-color': photo.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={photo.photo} alt={photo.title} className="award-photo-img" loading="lazy" />
      <div className="award-photo-year">{photo.year}</div>
      <div className={`award-photo-overlay ${hovered ? 'award-photo-overlay--visible' : ''}`}>
        <div className="award-photo-label">
          <h4 className="award-photo-title">{photo.title}</h4>
          <p className="award-photo-org">{photo.org}</p>
          <p className="award-photo-desc">{photo.desc}</p>
        </div>
      </div>
      <div className="award-photo-bottom-bar" />
    </div>
  );
}

export default function Recognition() {
  return (
    <div className="about-page">
      <section className="sub-page-hero">
        <div className="sub-page-breadcrumb">
          <Link to="/about">About</Link>
          <span>/</span>
          <span>Recognition</span>
        </div>
        <span className="sub-title-lux">Recognised Excellence</span>
        <h1 className="sub-page-title">Accreditations &amp; Awards</h1>
        <p className="sub-page-sub">
          Over a decade of consistent recognition from national and international bodies —
          validating our unwavering commitment to clinical excellence, patient care, and ethical governance.
        </p>
      </section>

      <div className="about-section-inner" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>

        {/* HD Photo Gallery */}
        <div className="award-photos-grid">
          {awardPhotos.map((p, i) => (
            <AwardPhotoCard key={p.title} photo={p} index={i} />
          ))}
        </div>

        {/* Award chips */}
        <div style={{ textAlign: 'center', margin: '3rem 0 1.5rem' }}>
          <span className="sub-title-lux">All Recognitions</span>
          <h2 className="about-section-title">Awards at a Glance</h2>
        </div>
        <div className="award-chips-strip">
          {awards.map((a, i) => (
            <div
              key={a.title}
              className="award-stat-chip"
              style={{ animationDelay: `${i * 0.08}s`, '--award-color': a.color }}
            >
              <span className="award-stat-icon">{a.icon}</span>
              <div className="award-stat-info">
                <span className="award-stat-year">{a.year}</span>
                <strong className="award-stat-title">{a.title}</strong>
                <span className="award-stat-org">{a.org}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="awards-marquee-wrap">
          <div className="awards-marquee">
            {[...awardPhotos, ...awardPhotos].map((p, i) => (
              <span key={i} className="marquee-item">
                🏆 {p.title} — {p.org} &nbsp;&nbsp;•&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
