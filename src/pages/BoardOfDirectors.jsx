import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import {
  Shield, HeartPulse, Stethoscope, Building2,
  Award, BrainCircuit, TrendingUp, ChevronRight
} from 'lucide-react';
import { directors } from '../data/aboutData';
import './BoardOfDirectors.css';

/* ─── Icon map per badge ─────────────────────────────── */
const BADGE_ICONS = {
  'Visionary Leader':      <BrainCircuit size={13} />,
  'Strategic Governance':  <Shield size={13} />,
  'Innovation & Growth':   <TrendingUp size={13} />,
  'Clinical Excellence':   <Stethoscope size={13} />,
  'Financial Stewardship': <Award size={13} />,
};

/* ─── Magnetic card (mouse-tracking glow) ────────────── */
function MagneticCard({ director, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [4, -4]);
  const rotateY = useTransform(x, [-80, 80], [-4, 4]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0); y.set(0); setHovered(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1, x: 0,
      transition: { delay: i * 0.07, duration: 0.3, ease: 'easeOut' }
    })
  };

  return (
    <motion.div
      ref={ref}
      className="bod-card-outer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -12, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Ambient glow that follows mouse */}
      <motion.div
        className="bod-mouse-glow"
        style={{
          x: useTransform(x, v => v * 0.6),
          y: useTransform(y, v => v * 0.6),
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Glass card surface */}
      <div className={`bod-card ${hovered ? 'bod-card--hovered' : ''}`}>

        {/* Border glow sweep on hover */}
        <div className="bod-card-border-glow" />

        {/* ── Image zone ── */}
        <div className="bod-img-zone">
          <motion.img
            src={director.image}
            alt={director.name}
            className="bod-img"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="bod-img-overlay" />
          {/* Cinematic vignette */}
          <div className="bod-img-vignette" />

          {/* Badge top-right */}
          <motion.div
            className="bod-badge"
            animate={{ opacity: hovered ? 0 : 1, y: hovered ? -6 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {BADGE_ICONS[director.badge]}
            <span>{director.badge}</span>
          </motion.div>

          {/* Number index subtle watermark */}
          <div className="bod-index-mark">0{index + 1}</div>
        </div>

        {/* ── Info zone ── */}
        <div className="bod-info-zone">
          {/* Always visible: name + title */}
          <div className="bod-info-static">
            <h3 className="bod-name">{director.name}</h3>
            <p className="bod-title">{director.title}</p>
          </div>

          {/* Hover reveal: summary + highlights */}
          <motion.div
            className="bod-hover-reveal"
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 12,
              height: hovered ? 'auto' : 0,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="bod-divider" />
            <p className="bod-summary">{director.short}</p>
            <ul className="bod-highlights">
              {director.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={highlightVariants}
                  initial="hidden"
                  animate={hovered ? 'visible' : 'hidden'}
                >
                  <ChevronRight size={11} className="bod-bullet-icon" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Hover badge (replaces top badge) */}
          <motion.div
            className="bod-badge-bottom"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3 }}
          >
            {BADGE_ICONS[director.badge]}
            <span>{director.badge}</span>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="bod-bottom-line"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Animated ambient orb ───────────────────────────── */
function AmbientOrb({ style }) {
  return (
    <motion.div
      className="bod-orb"
      style={style}
      animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function BoardOfDirectors() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <div className="bod-page">

      {/* ── Animated background ── */}
      <div className="bod-bg" aria-hidden="true">
        <div className="bod-bg-mesh" />
        <AmbientOrb style={{ top: '8%', left: '5%', width: 500, height: 500 }} />
        <AmbientOrb style={{ top: '40%', right: '-5%', width: 600, height: 600 }} />
        <AmbientOrb style={{ bottom: '5%', left: '30%', width: 400, height: 400 }} />
        <div className="bod-grid-lines" />
      </div>

      {/* ── Hero / header ── */}
      <section className="bod-hero" ref={headerRef}>
        {/* Breadcrumb */}
        <motion.div
          className="bod-breadcrumb"
          initial={{ opacity: 0, y: -10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Link to="/about" className="bod-breadcrumb-link">About</Link>
          <span className="bod-breadcrumb-sep">/</span>
          <span>Board of Directors</span>
        </motion.div>

        {/* Label */}
        <motion.div
          className="bod-hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HeartPulse size={14} />
          <span>The Visionaries Behind Sparsh</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="bod-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Leadership <span className="bod-title-accent">&amp; Vision</span>
        </motion.h1>

        {/* Glowing divider */}
        <motion.div
          className="bod-hero-divider"
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtitle */}
        <motion.p
          className="bod-hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Meet the visionary minds driving compassionate healthcare innovation
          and transforming patient care across Odisha.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="bod-stats-row"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {[
            { icon: <Building2 size={16} />, val: '17+', label: 'Years of Excellence' },
            { icon: <HeartPulse size={16} />, val: '50K+', label: 'Lives Impacted' },
            { icon: <Award size={16} />,     val: '30+',  label: 'National Awards' },
            { icon: <Shield size={16} />,    val: '500+', label: 'Beds Across Units' },
          ].map(({ icon, val, label }) => (
            <div key={label} className="bod-stat-pill">
              <span className="bod-stat-icon">{icon}</span>
              <span className="bod-stat-val">{val}</span>
              <span className="bod-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Directors grid ── */}
      <section className="bod-grid-section" ref={gridRef}>
        <div className="bod-grid-inner">
          <div className="bod-grid">
            {directors.map((d, i) => (
              <MagneticCard key={d.id} director={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom quote strip ── */}
      <motion.section
        className="bod-quote-strip"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bod-quote-inner">
          <span className="bod-quote-mark">"</span>
          <p className="bod-quote-text">
            At Sparsh, leadership means more than governance — it means compassion at scale,
            innovation in service of humanity, and an unwavering commitment to making
            world-class healthcare accessible to every patient.
          </p>
          <span className="bod-quote-mark">"</span>
        </div>
        <p className="bod-quote-attr">— Sparsh Healthcare Leadership Council</p>
      </motion.section>
    </div>
  );
}
