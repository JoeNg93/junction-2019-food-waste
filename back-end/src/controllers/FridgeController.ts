import express from 'express';
import db from '../db';
import { FridgePostBody, FridgePatchBody } from '../types';
import { newId, suggestDeffaultExpDate } from '../utils';
import moment from 'moment';

const router = express.Router();

// @GET /fridge
router.get('/', async (req, res) => {
  try {
    const { fridge } = await db.getData();
    return res.status(200).send(fridge.sort((a, b) =>
        moment(a.expired_date).valueOf() - moment(b.expired_date).valueOf()
    ));
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

// @PATCH /fridge/{id} -> body {expired_date, suggestedExpDate}
router.patch('/:id', async (req, res) => {
    try {
        const { expired_date, suggestedExpDate } = req.body as FridgePatchBody;
        const { id } = req.params;
        const dbData = await db.getData();
        const { fridge } = dbData;

        // Update item info in fridge
        dbData.fridge = fridge.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    expired_date,
                    suggestedExpDate,
                };
            }
            return item;
        });

        // Update database
        await db.writeData(dbData);

        // Return updated fridge
        return res.status(200).send(dbData.fridge);
    } catch (error) {
        return res.status(500).send({ error });
    }
});

export default router;
