import express from 'express';
import axios from 'axios';
import csv from 'csvtojson';
import path from 'path';
import db from '../db';
import { Availability, ProductsData, Product } from '../types';

const router = express.Router();

// @GET /receipts/:receiptId
router.get('/:receiptId', async (req, res) => {
  try {
    const dbData = await db.getData();
    const { receiptId } = req.params;
    const { storeId } = req.query;

    // Check if receipt has already been scanned
    // if (dbData.receipts.find(id => id === receiptId)) {
    //   // Receipt id already existed
    //   return res
    //     .status(400)
    //     .send({ error: `Receipt id ${receiptId} has already been scanned.` });
    // }

    // Save receipt id to db
    dbData.receipts.push(receiptId);

    // Get info of products inside receipt
    const receipts = await csv({ delimiter: ';' }).fromFile(
      path.resolve(__dirname, '../data/recept_data.csv')
    );
    const receiptInfo = receipts.filter(
      receipt => receipt.Receipt === receiptId
    );
    console.log('TCL: receiptInfo', receiptInfo);
    const eans = receiptInfo.map(r => r.EAN);
    const eanQuantityMapping = receiptInfo.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.EAN]: Number(curr.Quantity.split(',')[0]),
      }),
      {}
    );

    console.log('TCL: storeId', storeId);

    const productsData = await axios({
      method: 'POST',
      url: `https://kesko.azure-api.net/products/${storeId}`,
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.KESKO_API_KEY,
        'Content-Type': 'application/json',
      },
      data: { eans },
    }).then(res => res.data);

    console.log('TCL: productsData', productsData);

    const products = Object.values(productsData).map((p: any) => ({
      name: p.name,
      ean: p.ean,
      quantity: eanQuantityMapping[p.ean],
      purchase_date:
        receiptInfo[0].TransactionDate + '/' + receiptInfo[0].BeginHour,
    }));

    // Save product history
    for (let product of products) {
      if (dbData.product_history[product.name]) {
        dbData.product_history[product.name].history.push({
          quantity: product.quantity,
          purchase_date: product.purchase_date,
        });
      } else {
        dbData.product_history[product.name] = {
          name: product.name,
          ean: product.ean,
          history: [
            {
              quantity: product.quantity,
              purchase_date: product.purchase_date,
            },
          ],
        };
      }
    }

    // Update database
    await db.writeData(dbData);

    return res.status(200).send(products);
  } catch (e) {
    console.log('error', e);
    return res.status(500).send(e);
  }
});

export default router;
