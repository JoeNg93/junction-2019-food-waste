import express from 'express';

const router = express.Router();

// @GET /home
router.get('/', async (req, res) => {
  return res.send('Home route');
});

export default router;
