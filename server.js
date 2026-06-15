import express from 'express';
console.log('>>> SPARSH SERVER STARTING WITH AI INTEGRATION <<<');
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { initAiService, processQuery } from './src/services/aiService.js';
import Razorpay from 'razorpay';

dotenv.config();

// Initialize AI Knowledge Base
initAiService().catch(err => console.error('[AI] Failed to init:', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'sparsh-hospital-secret-key-2024';
const DATA_FILE = path.join(__dirname, 'src/data/mock-appointments.json');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SxE8v9vzWM08fe',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'ow7wA9X6CNHYCvIhK65WYKz6',
});

app.use(cors());
app.use(express.json());

// In-memory store for OTPs (In production, use Redis or DB)
const otpStore = new Map();
const rateLimitStore = new Map();

// Helper to read data
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { appointments: [], users: [] };
  }
}

// Helper to write data
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Authentication required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- AUTH ENDPOINTS ---

// Request OTP
app.post('/api/auth/request-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  // Rate limiting (Simple: 3 requests per 10 mins)
  const now = Date.now();
  const userRate = rateLimitStore.get(phone) || [];
  const recentRequests = userRate.filter(time => now - time < 10 * 60 * 1000);
  
  if (recentRequests.length >= 5) {
    return res.status(429).json({ message: 'Too many requests. Try again later.' });
  }
  
  recentRequests.push(now);
  rateLimitStore.set(phone, recentRequests);

  // Generate fixed OTP for development (123456)
  const otp = '123456';
  const expiry = now + 5 * 60 * 1000; // 5 mins

  otpStore.set(phone, { otp, expiry });

  console.log(`[DEVELOPMENT] OTP for ${phone} is: ${otp}`);

  res.json({ message: 'OTP sent successfully', phone });
});

// Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  
  const stored = otpStore.get(phone);
  if (!stored) return res.status(400).json({ message: 'Request a new OTP first' });
  
  if (Date.now() > stored.expiry) {
    otpStore.delete(phone);
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  // Clear OTP
  otpStore.delete(phone);

  // Get or Create User
  const data = await readData();
  if (!data.users) data.users = [];
  
  let user = data.users.find(u => u.phone === phone);
  if (!user) {
    user = { id: `user_${Date.now()}`, phone, createdAt: new Date().toISOString() };
    data.users.push(user);
    await writeData(data);
  }

  // Create JWT
  const token = jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user });
});

// --- PROTECTED ENDPOINTS ---

app.get('/api/user/profile', authenticateToken, async (req, res) => {
  const data = await readData();
  const user = data.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.put('/api/user/profile', authenticateToken, async (req, res) => {
  const { name, email, gender } = req.body;
  const data = await readData();
  const userIdx = data.users.findIndex(u => u.id === req.user.id);
  
  if (userIdx === -1) return res.status(404).json({ message: 'User not found' });
  
  data.users[userIdx] = { ...data.users[userIdx], name, email, gender };
  await writeData(data);
  
  res.json(data.users[userIdx]);
});

app.get('/api/user/appointments', authenticateToken, async (req, res) => {
  const data = await readData();
  const appointments = data.appointments.filter(a => a.userId === req.user.id || a.phone === req.user.phone);
  res.json(appointments);
});

app.get('/api/user/transactions', authenticateToken, async (req, res) => {
  const data = await readData();
  if (!data.transactions) data.transactions = [];
  const transactions = data.transactions.filter(t => t.userId === req.user.id);
  res.json(transactions);
});

app.post('/api/payment/create-order', authenticateToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Razorpay order', error });
  }
});

app.post('/api/appointments/book', authenticateToken, async (req, res) => {
  const appointmentData = req.body;
  const data = await readData();

  const newAppointment = {
    ...appointmentData,
    id: `SH-${Date.now()}`,
    userId: req.user.id,
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    paymentStatus: 'Success'
  };

  data.appointments.push(newAppointment);

  // Also record transaction
  if (!data.transactions) data.transactions = [];
  data.transactions.push({
    id: `TXN-${Date.now()}`,
    userId: req.user.id,
    appointmentId: newAppointment.id,
    amount: 590,
    status: 'Success',
    type: 'Consultation Fee',
    createdAt: new Date().toISOString()
  });

  await writeData(data);
  res.json(newAppointment);
});

// --- AI CHATBOT ENDPOINTS ---

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const reply = await processQuery(message);
    res.json({ reply });
  } catch (error) {
    console.error('[CHAT] Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin endpoint to refresh knowledge (called after manual doc uploads)
app.post('/api/admin/refresh-ai', authenticateToken, async (req, res) => {
  try {
    await initAiService();
    res.json({ message: 'AI Knowledge Base refreshed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to refresh AI knowledge' });
  }
});

app.listen(PORT, () => {
  console.log(`Sparsh Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[ERROR] Port ${PORT} is already in use.`);
    console.error(`Please close any other server running on this port and try again.\n`);
    process.exit(1);
  } else {
    console.error(err);
  }
});
