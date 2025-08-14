import { Router } from 'express';
import { getUnits } from '../controllers/unitController'

const router = Router();
router.get('/', getUnits);
export default router;