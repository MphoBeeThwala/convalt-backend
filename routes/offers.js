import express from 'express';
import { PurchaseHistory, Product } from '../models/index.js';
import authMiddleware from './authMiddleware.js';

const router = express.Router();

// GET /api/offers/suggested
router.get('/suggested', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    // Find most bought products
    const history = await PurchaseHistory.findAll({
      where: { user_id: userId },
      include: [{ model: Product }],
      order: [['date', 'DESC']],
      limit: 10
    });
    const items = history
      .map(h => ({
        product: h.Product ? h.Product.name : undefined,
        price: h.price,
        date: h.date
      }))
      .filter(item => item.product !== undefined);
    res.json({ suggested: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
