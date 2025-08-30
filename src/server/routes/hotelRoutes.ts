import express from 'express';
import {
  createHotel,
  getAllHotels,
  getHotelByID,
  updateHotel,
  deleteHotel
} from '../controllers/hotelController';

const router = express.Router();

// Create a new hotel
router.post('/add', createHotel);

// Get all hotels
router.get('/get', getAllHotels);

// Get a single hotel by ID
router.get('/:id', getHotelByID);

// Update a hotel by ID
router.put('/:id', updateHotel);

// Delete a hotel by ID
router.delete('/:id', deleteHotel);

export default router;
