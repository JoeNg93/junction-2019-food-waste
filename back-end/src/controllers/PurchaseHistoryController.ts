import express from 'express';
import db from '../db';
import { ProductPurchaseHistoryDetail } from '../types';

const router = express.Router();

// @GET /purchase-history/{productId}
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { product_history } = await db.getData();
    const purchase_history: ProductPurchaseHistoryDetail[] = Object.values(
      product_history[productId].history.reduce((obj, his) => {
        const purchaseDay = his.purchase_date.split('/')[0];
        if (obj[purchaseDay]) {
          obj[purchaseDay].quantity += his.quantity;
          return obj;
        }
        obj[purchaseDay] = his;
        obj[purchaseDay].purchase_date = purchaseDay;
        return obj;
      }, {})
    );
    return res.status(200).send({
      productName: product_history[productId].name,
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
