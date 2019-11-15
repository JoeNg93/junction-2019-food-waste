import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import HomeController from './controllers/HomeController';

// Populate env vars from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/home', HomeController);

app.get('/ping', (req, res) => {
  res.send('pong');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
