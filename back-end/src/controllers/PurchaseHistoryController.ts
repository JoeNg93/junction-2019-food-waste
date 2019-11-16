import express from 'express';
import db from '../db';
import axios from 'axios';
import { ProductPurchaseHistoryDetail } from '../types';

const router = express.Router();

// @GET /purchase-history/{productId}
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { storeId } = req.query;

    const productInfo = await axios({
      method: 'GET',
      url: `https://kesko.azure-api.net/products/${storeId}/${productId}`,
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.KESKO_API_KEY,
      },
    }).then(res => res.data);

    console.log('TCL: productInfo', productInfo);

    const productName = productInfo.name;

    const { product_history } = await db.getData();
    const purchase_history: ProductPurchaseHistoryDetail[] = Object.values(
      product_history[productName].history.reduce((obj, his) => {
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
      productName: productName,
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
