import express from 'express';
import db from '../db';
import { FridgePostBody } from '../types';
import { newId, suggestDeffaultExpDate } from '../utils';

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

// @POST /fridge -> request body is a list of new products to add to the fridge
router.post('/', async (req, res) => {
    try {
        const dbData = await db.getData();
        const { products } = req.body as FridgePostBody;

        // Save items to fridge
        products.forEach(product => {
            for (let i = 0; i < product.quantity; i++) {
                const id = newId();
                const expired_date = product.expired_date || suggestDeffaultExpDate(product.purchase_date);
                dbData.fridge.push({
                    id,
                    ean: product.ean,
                    name: product.name,
                    purchase_date: product.purchase_date,
                    expired_date,
                    suggestedExpDate: !product.expired_date,
                });
            }
        });

        // Update database
        await db.writeData(dbData);

        // Return updated fridge
        return res.status(200).send(dbData.fridge);
    } catch (error) {
        return res.status(500).send({ error });
    }
});

// @DELETE /fridge/{id}
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dbData = await db.getData();
        const { fridge } = dbData;

        // Remove item from fridge
        dbData.fridge = fridge.filter(item => item.id !== id);

        // Update database
        await db.writeData(dbData);

        // Return updated fridge
        return res.status(200).send(dbData.fridge);
    } catch (error) {
        return res.status(500).send({ error });
    }
});

export default router;
