import { Router } from 'express';
import { getAllHotels } from '../controllers/hotelController';

const router = Router();
router.post('/', getAllHotels);

export default router;