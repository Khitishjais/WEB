import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Fuse from 'fuse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data');

// Mock initialization to preserve server.js compatibility without loading heavy transformer pipelines
export async function initAiService() {
  console.log('[AI] Local Deterministic Rule Engine initialized (Zero Hallucination Mode).');
  return Promise.resolve();
}

export async function processQuery(query) {
  const rawInput = query.trim();
  const input = rawInput.toLowerCase();

  // Load verified local databases dynamically to ensure real-time accuracy
  let doctors = [];
  let depts = [];
  let pkgs = [];
  try {
    doctors = JSON.parse(await fs.readFile(path.join(DATA_PATH, 'doctors.json'), 'utf8'));
    depts = JSON.parse(await fs.readFile(path.join(DATA_PATH, 'departments.json'), 'utf8'));
    pkgs = JSON.parse(await fs.readFile(path.join(DATA_PATH, 'packages.json'), 'utf8'));
  } catch (err) {
    console.error('[AI] Error reading database files:', err);
  }

  // Set up Fuse instances with very strict thresholds to prevent false positive matches
  const fuseDocs = new Fuse(doctors, { 
    keys: ['name', 'department', 'qualification'], 
    threshold: 0.25 // Highly strict match
  });
  
  const fuseDepts = new Fuse(depts, { 
    keys: ['name'], 
    threshold: 0.25 
  });

  const fusePkgs = new Fuse(pkgs, { 
    keys: ['name', 'description'], 
    threshold: 0.3 
  });

  // 1. Core Safety Guardrails (Priority 1)
  if (input.match(/(emergency|urgent|accident|bleeding|severe pain|dying|ambulance|icu|ccu|trauma)/)) {
    return `🚨 **EMERGENCY MEDICAL SUPPORT (24/7)**\n\nIf you are experiencing a life-threatening medical situation, do not wait for a chat response! Please contact our critical care teams immediately:\n\n* 📞 **Emergency Helpline**: 0674 297 2222\n* 🚑 **Ambulance Services**: +91 91234 56789\n* 🏥 **Trauma Branch**: Visit our specialized **Kantabada Trauma & Orthopedics Center** immediately.`;
  }

  // 2. Precise Specific Match Search (Doctors, Departments, Packages) - HIGHEST RESOLUTION
  // If the user specifies a particular name or clinical branch, match it immediately
  const docMatch = fuseDocs.search(input)[0];
  if (docMatch) {
    const d = docMatch.item;
    return `🩺 **Specialist Profile Found**\n\n* **Name**: ${d.name}\n* **Specialty**: ${d.department}\n* **Qualification**: ${d.qualification}\n* **OPD Schedule**: ${d.timings}\n* **Branch Location**: ${d.branch}\n\n*📅 Would you like to consult with ${d.name}? Click the green **"Book Appointment"** button on the top right or call our desk at 0674-6626666.*`;
  }

  const deptMatch = fuseDepts.search(input)[0];
  if (deptMatch) {
    const dep = deptMatch.item;
    const matchingDocs = doctors.filter(d => d.department.toLowerCase().includes(dep.name.toLowerCase()));
    let docSnippet = matchingDocs.length > 0 
      ? matchingDocs.map(d => `• **${d.name}** (${d.qualification}) - OPD: *${d.timings}* at *${d.branch}*`).join('\n')
      : "No doctors cataloged currently. Please call our help desk.";
    return `🏥 **Department: ${dep.name}**\n\nOur ${dep.name} unit at SPARSH Healthcare provides world-class, premium clinical care. Active senior consultants in this specialty:\n\n${docSnippet}\n\n*📅 To schedule an appointment with one of our ${dep.name} specialists, click the "Book Appointment" button at the top right of the page.*`;
  }

  const pkgMatch = fusePkgs.search(input)[0];
  if (pkgMatch) {
    const p = pkgMatch.item;
    const items = p.tests || p.services;
    return `📦 **Health Package Details: ${p.name}**\n\n* **Special Price**: ₹${p.price} (Original Value: ~~₹${p.originalPrice}~~)\n* **Summary**: ${p.description}\n\n**Included Services & Scans**:\n${items.map(t => `• ${t}`).join('\n')}\n\n*📅 To purchase or schedule this package, please navigate to the **Health Packages** page in the main menu.*`;
  }

  // 3. General Keyword/Intent Handlers

  // Doctor List Inquiries
  if (input.match(/(doctor|doctors|physician|physicians|specialist|specialists|surgeon|surgeons|consultant|consultants|best doctor)/)) {
    return `🩺 **SPARSH Healthcare Specialists**\n\nWe have world-class consultants across multiple departments. Type a doctor's name or choose a specialty to view timetables:\n\n* **Oncology**: Prof. Dr. Ghanashyam Biswas, Dr. Swaraj Shankar Satpathy\n* **Cardiology**: Dr. Pratap Kumar Pradhan, Dr. Gurudatta Maharana\n* **Neurology**: Dr. Suryaprakhash S. Choudhary, Dr. Manisha Mohanty\n* **Neuro-Spine Surgery**: Dr. Sanatan Satpathy\n* **Gastroenterology**: Dr. Sarat Chandra Panigrahi, Dr. Gadadhar Panda\n* **Urology**: Dr. Sukanta Kumar Padhi, Dr. Jagmohan Mishra\n* **Nephrology**: Dr. Debaprasad Kar, Dr. Lalat Baruna Patra\n* **Orthopedics**: Dr. Abhimanyu Madhual, Dr. Abhisekh Sahoo\n* **OB & Gynecology**: Dr. Mrinal Kanti Dash, Dr. Swati Sucharita Sahoo\n* **ENT**: Prof. Dr. Rajesh Kumar Padhy\n\n*💡 Try typing a doctor's name (e.g. "Dr. Sanatan") or a department name (e.g. "Cardiology") to get direct schedule details!*`;
  }

  // Blogs & Updates
  if (input.match(/(blog|blogs|update|updates|news|article|articles)/)) {
    return `📚 **SPARSH Healthcare Blog & Medical Updates**\n\nStay informed with verified health insights, clinical articles, and recent updates from our senior consultants:\n\n• **Understanding Dentistry**: Learn about the symptoms, diagnosis, and modern treatments for gum and dental diseases.\n• **Latest Medical Technology**: Coverage of SPARSH's advanced clinical treatments and trauma care updates.\n\n*👉 Click on the **'Blogs'** link in the main navigation bar at the top of the page to explore our complete health articles library!*`;
  }

  // Timings
  if (input.match(/(timing|timings|schedule|hours|open|close|opd hours)/)) {
    return `🕒 **OPD Consultation Hours**\n\nOur clinics operate daily under strict international quality guidelines:\n\n* 📅 **Days**: Monday to Saturday\n* ⏰ **Standard Hours**: 09:00 AM – 08:00 PM\n* 🏥 **Emergencies & Trauma Center (Kantabada)**: Open **24 Hours / 7 Days a week**\n\n*To verify when a specific doctor is available, just type their name (e.g., "Dr. Sanatan Satpathy").*`;
  }

  // Emergency Services
  if (input === 'emergency services' || input === 'emergency') {
    return `🚨 **24/7 Critical Care & Emergency Services**\n\nSPARSH provides top-tier critical care and high-end ambulance support:\n\n* 📞 **Emergency Desk**: 0674 297 2222\n* 🚑 **Advanced Cardiac Ambulance**: +91 91234 56789\n* 📍 **Kantabada Branch**: Fully dedicated 24/7 Trauma, Joint Replacements, and Critical ICU services.`;
  }

  // Booking Inquiry
  if (input.match(/(book|booking|appointment|appointments|schedule appointment|consultation)/)) {
    return `📅 **Schedule Your Consultation**\n\nBooking a clinical consultation at SPARSH is seamless:\n\n1. **Online**: Click the green **"Book Appointment"** button on the top right corner of the website.\n2. **By Phone**: Speak directly to our booking desk at 📞 **0674-6626666**.\n3. **Walk-in**: You can visit our Sahid Nagar Main Branch registration desk during OPD hours.`;
  }

  // Health Packages
  if (input.match(/(package|packages|health package|health packages|checkup|checkups)/)) {
    let pkgList = pkgs.map((p, idx) => {
      return `${idx + 1}. **${p.name}**\n   * **Special Price**: ₹${p.price} (Original: ~~₹${p.originalPrice}~~)\n   * *Description*: ${p.description}\n   * *Includes*: ${p.tests ? p.tests.slice(0, 4).join(', ') + '... (+ more)' : p.services.slice(0, 4).join(', ') + '...'}`;
    }).join('\n\n');

    return `📦 **SPARSH Premium Health Packages**\n\nWe offer specialized screening packages at highly subsidized rates:\n\n${pkgList}\n\n*💡 To book or see the full breakdown of tests included in a package, please navigate to the **Health Packages** page in our main navigation bar.*`;
  }

  // Address & Branch Locations
  if (input.match(/(location|where|address|branch|situated|based|bhubaneswar|sahid nagar|kantabada)/)) {
    return `📍 **SPARSH Healthcare Branches**\n\nWe have two main branches in Bhubaneswar, Odisha offering state-of-the-art diagnostics and inpatient care:\n\n1. 🏥 **SPARSH Hospital (Main Multi-Specialty Branch)**\n   * **Address**: Plot No. 184, Sahid Nagar, Bhubaneswar.\n   * **OPD Desk**: 0674-6626666\n   * **Focus**: Comprehensive Out-patient clinics, Diagnostics, General Surgeries.\n\n2. 🚨 **SPARSH Trauma & Orthopedics Center**\n   * **Address**: Kantabada, Near Chandaka Forest, Bhubaneswar.\n   * **Hotline**: 0674 297 2222\n   * **Focus**: 24/7 Trauma Emergency, Orthopedic Surgeries, Joint Replacements, and high-end ICU/CCU care.`;
  }

  // OPD Fees
  if (input.match(/(fee|fees|price|cost|charges|charge|how much|rate|rates)/)) {
    return `💵 **OPD Consultation Fees**\n\nWe maintain complete transparency in our pricing structure:\n\n* 🩺 **Specialist OPD Consultation**: **₹590** (Inclusive of all institutional taxes)\n* 🌟 **Senior / Super Specialty Consultation**: **₹790** (Inclusive of taxes)\n* 📅 **Validity**: Follow-up consultations are free within **7 days** of the initial visit.\n\n*Payments are accepted via UPI, credit/debit cards, and cash at all billing desks.*`;
  }

  // 4. Natural Conversational Fillers (Empathy & Friendliness)
  if (input.match(/(hi|hello|hey|greetings|good morning|good afternoon|good evening|yo)/)) {
    return `👋 **Hello! Welcome to SPARSH Healthcare.**\n\nI am your verified digital health assistant. I can help you immediately with:\n\n* 🩺 Finding our top **doctors** and checking schedules\n* 🕒 Checking OPD **timings** and consultation **fees**\n* 📍 Direct **locations** and branch directions\n* 📦 Exploring special **health packages**\n\n*Please type your question or click one of our quick reply buttons below!*`;
  }

  if (input.match(/(thank|thanks|great|cool|awesome|perfect|ok|okay|bye)/)) {
    return `✨ You are very welcome! At SPARSH Healthcare, your health and comfort are our absolute priority. \n\nIf you have any other questions, feel free to ask, or click **"Book Appointment"** to secure a slot. Have a wonderful day!`;
  }

  // 5. World-Class Fallback (Absolutely Zero Hallucination)
  return `❓ **I want to make sure you get 100% accurate information.**\n\nI couldn't locate a exact match for that query in our verified hospital database. To prevent any inaccurate details (hallucinations), I only answer confirmed queries.\n\nCould you please rephrase your query, or click one of the **Quick Reply** buttons below to view:\n\n* 🩺 **Find a Doctor** (e.g. *"Who is Dr. Sanatan?"*)\n* 🕒 **OPD Timings**\n* 🚨 **Emergency Services**\n* 📅 **Book Appointment**\n\nAlternatively, call our direct reception desk at 📞 **0674-6626666** to speak with a human coordinator immediately.`;
}
