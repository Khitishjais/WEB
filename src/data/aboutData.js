// ── Shared data for Mission, Directors & Recognition pages ──
import director1 from '../assets/images/director_debabrata.jpg';
import director2 from '../assets/images/director_satyabrata.jpg';
import director3 from '../assets/images/director_bb_nayak.jpg';
import director4 from '../assets/images/director_ghanashyam.jpg';
import director5 from '../assets/images/director_5.jpg';

export const directors = [
  {
    id: 1,
    name: 'Dr. Priyabrata Dhir',
    title: 'Founder & Chairman',
    image: director1,
    badge: 'Visionary Leader',
    short: 'A distinguished visionary who has redefined healthcare in Odisha across nearly two decades, building a compassionate ecosystem that transcends geography and affordability.',
    highlights: ['Founded Sparsh Healthcare', 'Pioneer in Oncology & Neurology', 'Launched GERIA-X Home Care', 'Expanded to 300+ Bed Super-Specialty'],
  },
  {
    id: 2,
    name: 'Mr. Debabrata Dhir',
    title: 'Director',
    image: director2,
    badge: 'Strategic Governance',
    short: "A leader blending strategic foresight with operational discipline, ensuring every board decision translates into better care and deeper patient trust across Sparsh's growing ecosystem.",
    highlights: ['Multi-Hospital Governance', 'Digital Health Integration', 'Patient-First Policy Design', 'Community Health Initiatives'],
  },
  {
    id: 3,
    name: 'Er. Satyabrata Dhir',
    title: 'Director',
    image: director3,
    badge: 'Innovation & Growth',
    short: 'Combining engineering acumen with compassionate leadership, he champions modernization, infrastructure expansion, and the integration of advanced medical technologies at Sparsh.',
    highlights: ['Infrastructure Expansion', 'Advanced Tech Integration', 'Operational Excellence', 'Continuous Transformation'],
  },
  {
    id: 4,
    name: 'Dr. Ghanashyam Biswas',
    title: 'Executive Director & Sr. Consultant – Medical Oncology',
    image: director4,
    badge: 'Clinical Excellence',
    short: "A European Certified Medical Oncologist with 20+ years of expertise, recognized as one of Eastern India's leading voices in cancer care, committed to accessible world-class oncology.",
    highlights: ['European Certified Oncologist', 'Abdul Kalam Award Recipient', 'Best Oncologist – Times Health Icons', 'Member: ASCO, ICON & API'],
  },
  {
    id: 5,
    name: 'CA Bidhu Bhusan Nayak',
    title: 'Director – Finance',
    image: director5,
    badge: 'Financial Stewardship',
    short: "With two decades of visionary financial leadership, he has built a transparent fiscal ecosystem enabling Sparsh's expansion while upholding the highest standards of ethics and quality.",
    highlights: ['ET Industry Leaders EAST 2025', 'Indo Global Leaders Meet – Dubai', 'Times Business Awards Odisha 2023', '20+ Years Financial Expertise'],
  },
];

export const awardPhotos = [
  {
    photo: 'https://sparshhospitals.com/wp-content/uploads/2024/05/2-1-2.png',
    title: 'Certificate of Excellence',
    org: 'International Healthcare Awards 2016',
    desc: 'Dr. Ghanashyam Biswas honoured as Best Oncologist in Bhubaneswar by TIME CyberMedia Pvt. Ltd.',
    year: '2016',
    color: '#2d8e40',
  },
  {
    photo: 'https://sparshhospitals.com/wp-content/uploads/2024/05/3-1-2.png',
    title: 'Best Oncology Services',
    org: 'Times of India Health Awards',
    desc: 'Eight consecutive years of recognition as Eastern India\'s premier cancer care facility.',
    year: '2016–2024',
    color: '#1e6b2e',
  },
  {
    photo: 'https://sparshhospitals.com/wp-content/uploads/2024/05/4-1-2.png',
    title: 'OSOCON 2016 Recognition',
    org: 'Odisha Society of Oncology',
    desc: 'Sparsh Healthcare felicitated for outstanding contribution to cancer care and clinical excellence in Odisha.',
    year: '2016',
    color: '#2d8e40',
  },
  {
    photo: 'https://sparshhospitals.com/wp-content/uploads/2024/05/5-1-2.png',
    title: 'Best Gynaecology Services',
    org: 'Times of India Health Awards',
    desc: 'National training hub in laparoscopic surgery awarded for pioneering surgical innovation.',
    year: '2016–2024',
    color: '#1e6b2e',
  },
  {
    photo: 'https://sparshhospitals.com/wp-content/uploads/2024/05/6-1-2.png',
    title: 'Ambrosia Medical Excellence',
    org: 'Ambrosia Healthcare Awards',
    desc: 'Sparsh leadership recognised for transformative impact on healthcare delivery across Eastern India.',
    year: '2019',
    color: '#2d8e40',
  },
  {
    photo: 'https://sparshhospitals.com/wp-content/uploads/2024/05/IMG_77171-Copy-2.jpg',
    title: 'Abdul Kalam Award',
    org: 'National Medical Excellence',
    desc: 'Dr. Ghanashyam Biswas receives the Abdul Kalam Award for exceptional contributions to cancer care.',
    year: '2023',
    color: '#1e6b2e',
  },
];

export const awards = [
  { icon: '🏆', title: 'Best Oncology Services', org: 'Times of India Health Awards', desc: 'Recognised for eight consecutive years as Eastern India\'s premier cancer care facility.', color: '#2d8e40', year: '2016–2024' },
  { icon: '🥇', title: 'Best Gynaecology Services', org: 'Times of India Health Awards', desc: 'National training hub in laparoscopic surgery, earning this award for eight consecutive years.', color: '#1e6b2e', year: '2016–2024' },
  { icon: '🌟', title: 'Abdul Kalam Award', org: 'National Medical Excellence', desc: 'Awarded to Dr. Ghanashyam Biswas for exceptional contributions to cancer care.', color: '#2d8e40', year: '2023' },
  { icon: '💼', title: 'Gamechanger – Financial Advisory', org: 'Economic Times Industry Leaders EAST 2025', desc: 'CA B.B. Nayak honoured for structured financial strategies and regulatory excellence.', color: '#1e6b2e', year: '2025' },
  { icon: '🌐', title: 'Global Excellence Award', org: 'Indo Global Leaders Meet, Dubai', desc: 'Times of India recognition for trailblazing excellence at the global healthcare leadership summit.', color: '#2d8e40', year: '2025' },
  { icon: '🔬', title: 'Centre of Excellence', org: 'High-End Laparoscopy & Neuroscience', desc: 'Nationally acclaimed for high-end laparoscopic and neuroscience replacement surgeries.', color: '#1e6b2e', year: '2024' },
];
