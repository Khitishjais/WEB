import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  HeartPulse, Shield, Stethoscope, Activity,
  Award, ArrowRight, Star, Users, Building2, Clock
} from 'lucide-react';
import missionIcon from '../assets/mission_icon.png';
import visionIcon from '../assets/vision_icon.png';
import './About.css';
import './MissionVision.css';

/* ── Ease ──────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

/* ── Floating ambient orb (animated) ──────────── */
function FloatOrb({ style }) {
  return (
    <motion.div
      className="mv-hero-orb"
      style={style}
      animate={{ y: [0, -18, 0], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Trust badge ───────────────────────────────── */
function TrustBadge({ icon, label, delay }) {
  return (
    <motion.div
      className="mv-trust-badge"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <span className="mv-trust-badge-icon">{icon}</span>
      {label}
    </motion.div>
  );
}

/* ── Orbital floating badge ────────────────────── */
function OrbBadge({ icon, label, className, delay }) {
  return (
    <motion.div
      className={`mv-orbital-badge ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay },
        y:       { duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }
      }}
    >
      <span className="mv-orbital-icon">{icon}</span>
      {label}
    </motion.div>
  );
}

/* ── Values data ───────────────────────────────── */
const values = [
  { emoji: '💙', word: 'Solace',      sub: 'Through the Healing Touch' },
  { emoji: '✨', word: 'Positivity',  sub: 'Celestial Contentment' },
  { emoji: '🤝', word: 'Assurance',   sub: 'Inspiring Confidence' },
  { emoji: '🌱', word: 'Rejuvenation',sub: 'Body & Mind' },
  { emoji: '⚡', word: 'Sincerity',   sub: 'In Every Response' },
  { emoji: '🏛️', word: 'Honesty',    sub: 'Our Commercial Resolve' },
];

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export default function MissionVision() {
  const heroRef = useRef(null);
  const inView  = useInView(heroRef, { once: true, margin: '-60px' });

  return (
    <div className="about-page">

      {/* ════════════════════════════════════════════
          CINEMATIC HERO — ONLY THIS SECTION IS NEW
      ════════════════════════════════════════════ */}
      <section className="mv-hero" ref={heroRef}>

        {/* Layered animated background */}
        <div className="mv-hero-bg" aria-hidden="true">
          <div className="mv-hero-mesh" />
          <div className="mv-hero-grid" />
          <FloatOrb style={{ top: '-5%', left: '-4%' }} className="mv-hero-orb-1" />
          <FloatOrb style={{ bottom: '-10%', right: '-6%' }} className="mv-hero-orb-2" />
          <FloatOrb style={{ top: '35%', left: '45%' }} className="mv-hero-orb-3" />
        </div>

        {/* Split layout */}
        <div className="mv-hero-inner">

          {/* ── LEFT: Content ─────────────────────── */}
          <div className="mv-hero-left">

            {/* Breadcrumb */}
            <motion.div
              className="mv-hero-breadcrumb"
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Link to="/about">About</Link>
              <span className="mv-hero-breadcrumb-sep">/</span>
              <span>Mission &amp; Vision</span>
            </motion.div>

            {/* Label pill */}
            <motion.div
              className="mv-hero-label"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <HeartPulse size={13} />
              <span>What Drives Us</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="mv-hero-title"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            >
              Where{' '}
              <span className="mv-hero-title-accent">Compassion</span>
              <br />Meets Clinical{' '}
              <span className="mv-hero-title-accent">Excellence.</span>
            </motion.h1>

            {/* Glowing divider */}
            <motion.div
              className="mv-hero-divider"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
            />

            {/* Subtitle */}
            <motion.p
              className="mv-hero-sub"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              For over a decade, SPARSH Healthcare Odisha has combined medical excellence,
              advanced technology, and unwavering compassion to redefine healing experiences
              for every patient — regardless of their means.
            </motion.p>

            {/* Trust badges */}
            <div className="mv-trust-badges">
              {[
                { icon: <Clock size={13} />,      label: '24/7 Critical Care',           delay: 0.50 },
                { icon: <Users size={13} />,      label: '100+ Expert Doctors',          delay: 0.58 },
                { icon: <HeartPulse size={13} />, label: '50,000+ Patients Served',      delay: 0.66 },
                { icon: <Shield size={13} />,     label: 'Advanced Medical Infrastructure', delay: 0.74 },
                { icon: <Award size={13} />,      label: '30+ National Awards',          delay: 0.80 },
              ].map(b => (
                <TrustBadge key={b.label} {...b} />
              ))}
            </div>

            {/* CTA buttons */}
            <motion.div
              className="mv-hero-ctas"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.88 }}
            >
              <a href="#mv-cards" className="mv-cta-primary">
                Explore Our Vision
                <ArrowRight size={15} />
              </a>
              <Link to="/about" className="mv-cta-secondary">
                Our Healthcare Journey
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Animated orb visual ─────────── */}
          <motion.div
            className="mv-hero-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          >
            <div className="mv-orb-scene">
              {/* Concentric rings */}
              <motion.div
                className="mv-ring mv-ring-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="mv-ring mv-ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="mv-ring mv-ring-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
              />

              {/* Center orb */}
              <motion.div
                className="mv-center-orb"
                animate={{ scale: [1, 1.04, 1], boxShadow: [
                  '0 0 60px rgba(0,209,255,0.12)',
                  '0 0 90px rgba(0,209,255,0.22)',
                  '0 0 60px rgba(0,209,255,0.12)',
                ]}}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="mv-orb-center-content">
                  <Stethoscope size={48} className="mv-orb-icon-main" />
                  <span className="mv-orb-tagline">Sparsh</span>
                  <span className="mv-orb-sub">Healthcare Odisha</span>
                </div>
              </motion.div>

              {/* Floating orbital badges */}
              <OrbBadge icon={<HeartPulse size={13} />} label="Compassionate Care"  className="mv-orbital-1" delay={0.6} />
              <OrbBadge icon={<Activity   size={13} />} label="24/7 ICU"            className="mv-orbital-2" delay={0.75} />
              <OrbBadge icon={<Building2  size={13} />} label="500+ Beds"            className="mv-orbital-3" delay={0.9} />
              <OrbBadge icon={<Star       size={13} />} label="Award Winning"        className="mv-orbital-4" delay={1.05} />
            </div>
          </motion.div>
        </div>


      </section>
      {/* ════ END CINEMATIC HERO ════ */}


      {/* ════════════════════════════════════════════
          EXISTING CONTENT — COMPLETELY UNTOUCHED
      ════════════════════════════════════════════ */}
      <div className="about-section-inner" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>

        {/* Cards */}
        <div className="mv-grid">
          {/* Mission */}
          <div className="mv-card mv-card--mission">
            <div className="mv-card-accent mv-accent-mission" />
            <div className="mv-card-icon-wrap">
              <img src={missionIcon} alt="Mission" className="mv-icon-img" />
            </div>
            <div className="mv-card-tag">MISSION | ବ୍ରତ</div>
            <h2 className="mv-card-title">Our Sacred Pledge</h2>
            <p className="mv-card-main">
              To earn the unique distinction of being the most <strong>affordable</strong>,
              <strong> accessible</strong>, and <strong>applaudable</strong> global
              healthcare destination.
            </p>
            <div className="mv-card-divider" />
            <p className="mv-card-odia">
              ସ୍ଵାସ୍ଥ୍ୟ ସେବା କ୍ଷେତ୍ରରେ ବିଶ୍ବର ଏକ ଅନନ୍ୟ, ଦେୟ ସାପେକ୍ଷ ସହଜ ପ୍ରାପ୍ୟ ତଥା
              ପ୍ରଶଂସାଯୋଗ୍ୟ ଆନ୍ତର୍ଜାତୀୟ ସ୍ତରୀୟ ଚିକିତ୍ସାଳୟର ମାନ୍ୟତା ହାସଲ କରିବା ।
            </p>
            <div className="mv-pillars">
              {['Affordable', 'Accessible', 'Applaudable'].map(p => (
                <div key={p} className="mv-pillar">{p}</div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="mv-card mv-card--vision">
            <div className="mv-card-accent mv-accent-vision" />
            <div className="mv-card-icon-wrap">
              <img src={visionIcon} alt="Vision" className="mv-icon-img" />
            </div>
            <div className="mv-card-tag">VISION | ପରିକଳ୍ପନା</div>
            <h2 className="mv-card-title">Our North Star</h2>
            <p className="mv-card-main">
              To win the <strong>confidence of the poorest and weakest</strong> strata
              of society as a <strong>safe, reliable</strong> healthcare shelter —
              providing maximum care and comfort at minimum cost.
            </p>
            <div className="mv-card-divider" />
            <p className="mv-card-odia">
              ସର୍ବନିମ୍ନ ଦେୟ ହେଲେହେଁ ସର୍ବାଧ‌ିକ ଉପଶମ ଓ ସନ୍ତୋଷ ପ୍ରଦାନ କରୁଥିବା ଏକ
              ବିଶ୍ଵସନୀୟ ଚିକିତ୍ସାଳୟ ରୂପେ ସମାଜର ଅବହେଳିତ ଓ ଆର୍ଥିକ ଦୁର୍ବଳ ଶ୍ରେଣୀ
              ଜନସାଧାରଣଙ୍କର ବିଶ୍ଵାସ ଭାଜନ ହେବା ।
            </p>
            <div className="mv-pillars">
              {['Safe Shelter', 'Reliable Care', 'Maximum Comfort'].map(p => (
                <div key={p} className="mv-pillar mv-pillar--vision">{p}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values — completely untouched */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '4rem' }}>
          <span className="sub-title-lux">What We Stand For</span>
          <h2 className="about-section-title">Our Core Values</h2>
        </div>
        <div className="values-strip">
          {values.map(v => (
            <div key={v.word} className="value-chip">
              <span className="value-emoji">{v.emoji}</span>
              <strong className="value-word">{v.word}</strong>
              <span className="value-sub">{v.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
