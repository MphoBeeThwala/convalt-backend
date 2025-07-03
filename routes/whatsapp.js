import express from 'express';
// Placeholder for WhatsApp webhook integration
const router = express.Router();

router.post('/', (req, res) => {
  // Parse WhatsApp message, extract list and budget, call basket logic
  res.json({ message: 'WhatsApp integration not yet implemented.' });
});

export default router;
