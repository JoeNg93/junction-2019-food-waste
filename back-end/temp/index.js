const util = require('util');
util.inspect.defaultOptions.depth = null;

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
  console.log('TCL: getReceiptProducts -> eans', eans);
  const eanQuantityMapping = receiptInfo.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.EAN]: Number(curr.Quantity.split(',')[0]),
    }),
    {}
  );

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
  console.log('TCL: getReceiptProducts -> storeId', storeId);

  httpRes = await axios({
    method: 'POST',
    url: `https://kesko.azure-api.net/products/${storeId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.KESKO_API_KEY,
      'Content-Type': 'application/json',
    },
    data: { eans },
  });

  const products = Object.values(httpRes.data).map(p => ({
    ...p,
    quantity: eanQuantityMapping[p.ean],
  }));

  return products.map(p => ({
    name: p.name,
    ean: p.ean,
    quantity: p.quantity,
  }));
}

async function main() {
  const receiptId = '420021025138844';
  const products = await getReceiptProducts(receiptId);
  console.log(products);
}

main();
