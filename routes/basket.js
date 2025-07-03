import express from 'express';
import { Retailer, RetailerProduct, Product } from '../models/index.js';
import authMiddleware from './authMiddleware.js';

const router = express.Router();

// POST /api/basket/match
router.post('/match', authMiddleware, async (req, res) => {
  const { shoppingList, budget, radius = 5, latitude, longitude } = req.body;
  if (!Array.isArray(shoppingList) || !budget || !latitude || !longitude)
    return res.status(400).json({ error: 'Missing required fields.' });

  // Find retailers within radius (mock: return all for now)
  const retailers = await Retailer.findAll();
  let best = null;
  for (const retailer of retailers) {
    // Check if retailer has all items
    const items = await RetailerProduct.findAll({
      where: { retailer_id: retailer.id },
      include: [{ model: Product }]
    });
    const basket = [];
    let total = 0;
    let foundAll = true;
    for (const reqItem of shoppingList) {
      const match = items.find(i => i.Product.name.toLowerCase() === reqItem.name.toLowerCase());
      if (!match) { foundAll = false; break; }
      basket.push({ ...reqItem, price: match.price });
      total += match.price * (reqItem.quantity || 1);
    }
    if (foundAll && total <= budget) {
      if (!best || total < best.total) {
        best = { retailer, basket, total };
      }
    }
  }
  if (!best) return res.status(404).json({ error: 'No retailer can fulfill your list within budget.' });
  res.json({ retailer: best.retailer, basket: best.basket, total: best.total });
});

export default router;
