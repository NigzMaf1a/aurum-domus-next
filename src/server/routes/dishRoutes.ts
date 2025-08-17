import { Router } from 'express';
import {
  addDish,
  getDishes,
  updateDish,
  deleteDish
} from '../controllers/dishController';

const router = Router();

// CREATE
router.post('/add', addDish);

// READ
router.get('/', getDishes);

// UPDATE
router.put('/:dishID', updateDish);

// DELETE
router.delete('/:dishID', deleteDish);

export default router;
