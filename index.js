import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import basketRoutes from './routes/basket.js';
import whatsappRoutes from './routes/whatsapp.js';
import offersRoutes from './routes/offers.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Convergence backend is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/offers', offersRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
