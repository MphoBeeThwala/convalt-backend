import express from 'express';
import twilio from 'twilio';
import { Retailer, RetailerProduct, Product } from '../models/index.js';

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post('/', async (req, res) => {
  const { body } = req;
  const { From, Body } = body;

  try {
    const [list, budget] = Body.split(';');
    const shoppingList = list.split(',').map(item => ({ name: item.trim(), quantity: 1 }));
    const budgetAmount = parseFloat(budget);

    const retailers = await Retailer.findAll();
    let best = null;
    for (const retailer of retailers) {
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
      if (foundAll && total <= budgetAmount) {
        if (!best || total < best.total) {
          best = { retailer, basket, total };
        }
      }
    }

    let message;
    if (best) {
      message = `*${best.retailer.name}* can fulfill your list for *R${best.total.toFixed(2)}*.`;
      best.basket.forEach(item => {
        message += `\n- ${item.name} (x${item.quantity}): R${item.price.toFixed(2)}`;
      });
    } else {
      message = 'No retailer can fulfill your list within budget.';
    }

    await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: From
    });

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export default router;
