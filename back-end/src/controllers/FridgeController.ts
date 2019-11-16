import express from 'express';
import db from '../db';

const router = express.Router();

// @GET /fridge
router.get('/', async (req, res) => {
  try {
    const { fridge } = await db.getData();
    return res.status(200).send(fridge);
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
