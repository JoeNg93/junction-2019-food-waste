import express from 'express';
import db from '../db';
import { PurchaseHistory } from '../types';

const router = express.Router();

// @GET /purchase-history/{productId}
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { product_history } = await db.getData();
    const purchase_history = product_history[productId]
        .reduce((obj, purchase) => {
            const purchaseDay = purchase.purchase_date.split('/')[0];
            if (obj[purchaseDay]) {
                obj[purchaseDay].quantity += purchase.quantity;
                return obj;
            }
            obj[purchaseDay] = purchase;
            obj[purchaseDay].purchase_date = purchaseDay;
            return obj;
        }, {} as PurchaseHistory);
    return res.status(200).send(Object.values(purchase_history));
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
