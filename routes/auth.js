import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const router = express.Router();

// South African ID validation (13 digits + Luhn checksum)
function isValidSAID(id) {
  if (!/^\d{13}$/.test(id)) return false;
  // Luhn algorithm
  let sum = 0, alt = false;
  for (let i = id.length - 1; i >= 0; i--) {
    let n = parseInt(id[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

// Signup endpoint
router.post('/signup', async (req, res) => {
  const { name, email, phone, national_id, password } = req.body;
  if (!name || !email || !phone || !national_id || !password)
    return res.status(400).json({ error: 'All fields required.' });
  if (!isValidSAID(national_id))
    return res.status(400).json({ error: 'Invalid South African ID.' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, national_id, password: hash });
    res.status(201).json({ message: 'User registered', user: { id: user.id, name, email, phone, national_id } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required.' });
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, national_id: user.national_id } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
