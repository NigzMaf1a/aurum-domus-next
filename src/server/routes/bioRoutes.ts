// routes/bioRoutes.ts
import { Router } from 'express'
import {
  addBio,
  getAllBios,
  getBio,
  updateBio,
  deleteBio
} from '../controllers/bioController'

const router = Router()

// CREATE
router.post('/add', addBio)

// READ
router.get('/all', getAllBios)         // Get all bios
router.get('/:unitID', getBio)         // Get bio for specific unit

// UPDATE
router.put('/update', updateBio)

// DELETE
router.delete('/:bioID', deleteBio)

export default router
