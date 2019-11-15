import express from 'express';
import axios from 'axios';
import csv from 'csvtojson';
import path from 'path';

interface Store {
  id: string,
}
interface Availability {
  stores: Store[],
}

interface Product {
  quantity: number,
  name: string,
  ean: string,
}

interface ProductsData {
  [key: string]: Product,
}

const router = express.Router();

// @GET /receipts/:receiptId
router.get('/:receiptId', async (req, res) => {
  try {
    const { receiptId } = req.params;
    const receipts = await csv({ delimiter: ';' }).fromFile(
      path.resolve(__dirname, '../data/recept_data.csv')
    );
    const receiptInfo = receipts.filter(receipt => receipt.Receipt === receiptId);
    const eans = receiptInfo.map(r => r.EAN);
    const eanQuantityMapping = receiptInfo.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.EAN]: Number(curr.Quantity.split(',')[0]),
      }),
      {}
    );

    const availability = await axios({
      method: 'GET',
      url: 'https://kesko.azure-api.net/v2/products',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.KESKO_API_KEY,
      },
      params: { ean: eans.join(',') },
    }).then(res => res.data[0] as Availability);

    const storeId = availability.stores[0].id;

    const productsData = await axios({
      method: 'POST',
      url: `https://kesko.azure-api.net/products/${storeId}`,
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.KESKO_API_KEY,
        'Content-Type': 'application/json',
      },
      data: { eans },
    }).then(res => res.data as ProductsData);

    const products: Product[] = Object.values(productsData).map(p => ({
      ...p,
      quantity: eanQuantityMapping[p.ean],
    }));
    return res.status(200).send({ products });
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
