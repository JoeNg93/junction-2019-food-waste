import express from 'express';
import db from '../db';
import { PurchaseHistory } from '../types';

const router = express.Router();

// @GET /purchase-history/{productId}
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { product_history } = await db.getData();
    const purchase_history = Object.values(
      product_history[productId].reduce((obj, purchase) => {
        const purchaseDay = purchase.purchase_date.split('/')[0];
        if (obj[purchaseDay]) {
          obj[purchaseDay].quantity += purchase.quantity;
          return obj;
        }
        obj[purchaseDay] = purchase;
        obj[purchaseDay].purchase_date = purchaseDay;
        return obj;
      }, {} as PurchaseHistory)
    );
    return res.status(200).send({
      productName: purchase_history[0].name,
      purchaseHistory: purchase_history.map(ph => ({
        date: ph.purchase_date,
        qty: ph.quantity,
      })),
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
