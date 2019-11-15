import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import ReceiptController from './controllers/ReceiptController';

// Populate env vars from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/receipts', ReceiptController);

app.get('/*', (req, res) => {
  res.send('pongsss');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
