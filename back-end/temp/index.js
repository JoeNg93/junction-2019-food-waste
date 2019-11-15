const fs = require('fs').promises;
const axios = require('axios');
const csv = require('csvtojson');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const receiptId = '420021025138844';

async function main() {
  const receipts = await csv({ delimiter: ';' }).fromFile(
    path.resolve(__dirname, 'recept_data.csv')
  );
  const receiptInfo = receipts.filter(receipt => receipt.Receipt === receiptId);
  console.log('TCL: main -> receiptInfo', receiptInfo);
  const eans = receiptInfo.map(r => r.EAN);

  let res = await axios({
    method: 'GET',
    url: 'https://kesko.azure-api.net/v2/products',
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.KESKO_API_KEY,
    },
    params: { ean: eans.join(',') },
  });

  console.log(eans);

  const storeId = res.data[0].stores[0].id;
  console.log('TCL: main -> storeId', storeId);

  res = await axios({
    method: 'POST',
    url: `https://kesko.azure-api.net/products/${storeId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.KESKO_API_KEY,
      'Content-Type': 'application/json',
    },
    data: { eans },
  });

  console.log('Products: ', res.data);
}

main();
