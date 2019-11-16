import express from 'express';
import db from '../db';

const router = express.Router();

// @GET /purchase-history/{productId}
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { product_history } = await db.getData();
    return res.status(200).send(product_history[productId]);
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
