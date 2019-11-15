const fs = require('fs').promises;
const axios = require('axios');
const csv = require('csvtojson');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

async function getReceiptProducts(receiptId) {
  const receipts = await csv({ delimiter: ';' }).fromFile(
    path.resolve(__dirname, 'recept_data.csv')
  );
  const receiptInfo = receipts.filter(receipt => receipt.Receipt === receiptId);
  const eans = receiptInfo.map(r => r.EAN);

  let httpRes;
  httpRes = await axios({
    method: 'GET',
    url: 'https://kesko.azure-api.net/v2/products',
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.KESKO_API_KEY,
    },
    params: { ean: eans.join(',') },
  });

  const storeId = httpRes.data[0].stores[0].id;

  httpRes = await axios({
    method: 'POST',
    url: `https://kesko.azure-api.net/products/${storeId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.KESKO_API_KEY,
      'Content-Type': 'application/json',
    },
    data: { eans },
  });

  const products = Object.values(httpRes.data);

  return products;
}

async function main() {
  const receiptId = '420021025138844';
  const products = await getReceiptProducts(receiptId);
  console.log(products);
}

main();
