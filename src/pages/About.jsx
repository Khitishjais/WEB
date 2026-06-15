import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const sections = [
  {
    icon: '🎯',
    label: 'Mission & Vision',
    desc: 'Our founding pledge — to deliver affordable, accessible and world-class healthcare to every strata of society in Odisha and beyond.',
    link: '/mission',
    cta: 'Explore Mission & Vision',
    accent: '#2d8e40',
    highlights: ['Affordable Healthcare', 'Accessible to All', 'Applaudable Standards'],
  },
  {
    icon: '👥',
    label: 'Board of Directors',
    desc: 'Meet the visionary leaders who built Sparsh from the ground up — their stories, expertise, and the values that guide our institution every day.',
    link: '/directors',
    cta: 'Meet the Directors',
    accent: '#1e6b2e',
    highlights: ['5 Distinguished Leaders', 'Two Decades of Service', 'Multi-Specialty Governance'],
  },
  {
    icon: '🏆',
    label: 'Accreditations & Awards',
    desc: 'Over a decade of consistent national and international recognition for clinical excellence, oncology leadership, and ethical patient care.',
    link: '/recognition',
    cta: 'View All Awards',
    accent: '#2d8e40',
    highlights: ['8 Consecutive Years TOI Award', 'Abdul Kalam Award', 'Global Excellence – Dubai 2025'],
  },
];

const stats = [
  { value: '500+', label: 'Hospital Beds' },
  { value: '50+', label: 'Specialist Doctors' },
  { value: '16+', label: 'Years of Excellence' },
  { value: '5L+', label: 'Patients Treated' },
];

export default function About() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="sub-page-hero sub-page-hero--hub">
        <span className="sub-title-lux">Our Story</span>
        <h1 className="sub-page-title">About Sparsh Healthcare</h1>
        <p className="sub-page-sub">
          Founded on the belief that world-class healthcare should reach every corner of society —
          explore our mission, meet our leadership, and discover our journey of recognition.
        </p>
      </section>

      {/* Stats band */}
      <div className="about-stats-band">
        {stats.map(s => (
          <div key={s.label} className="about-stat-card">
            <div className="about-stat-number">{s.value}</div>
            <div className="about-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section Cards */}
      <section style={{ background: '#f7faf8', padding: '80px 0' }}>
        <div className="about-section-inner">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="sub-title-lux">Explore</span>
            <h2 className="about-section-title">What Would You Like to Know?</h2>
            <p className="about-section-subtitle">
              Choose a section below to dive deeper into Sparsh Healthcare's story.
            </p>
          </div>

          <div className="about-hub-grid">
            {sections.map((s) => (
              <Link to={s.link} key={s.label} className="about-hub-card" style={{ '--hub-accent': s.accent }}>
                <div className="hub-card-top-bar" />
                <div className="hub-icon-wrap">
                  <span className="hub-icon">{s.icon}</span>
                </div>
                <h3 className="hub-card-title">{s.label}</h3>
                <p className="hub-card-desc">{s.desc}</p>
                <ul className="hub-highlights">
                  {s.highlights.map(h => (
                    <li key={h}><span className="hub-dot">◆</span>{h}</li>
                  ))}
                </ul>
                <div className="hub-card-cta">
                  {s.cta} <span className="hub-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="about-cta">
        <div className="about-cta-content">
          <h2 className="about-cta-title">Experience the Sparsh Difference</h2>
          <p className="about-cta-sub">
            Join thousands of patients who trust Sparsh for compassionate, world-class
            healthcare — right here in Odisha.
          </p>
          <div className="about-cta-btns">
            <a href="/booking" className="btn-lux">Book an Appointment</a>
            <a href="/contact" className="btn-outline-lux">Contact Us</a>
          </div>
        </div>
      </section>

    </div>
  );
}
