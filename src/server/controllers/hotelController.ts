import { Request, Response, RequestHandler } from 'express';
import Hotel from '../models/hotel';
import { HotelPayload } from '../interfaces/hotel';

const hotelService = new Hotel();

// CREATE - Add a new hotel
export const createHotel: RequestHandler = async (req: Request, res: Response) => {
  const hotel: HotelPayload = req.body;
  console.log('Incoming hotel data:', req.body);

  try {
    const result = await hotelService.createHotel(hotel);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Error ${err} occurred while creating hotel`);
    res.status(500).json({ error: 'Failed to create hotel', details: message });
  }
};

// READ - Get all hotels
export const getAllHotels: RequestHandler = async (_req, res) => {
  try {
    const rows = await hotelService.getAllHotels();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch hotels', details: message });
  }
};

// READ - Get single hotel by ID
export const getHotelByID: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid hotel ID' });
    return;
  }

  try {
    const hotel = await hotelService.getHotelByID(id);
    if (!hotel) {
      res.status(404).json({ message: 'Hotel not found' });
      return;
    }
    res.status(200).json(hotel);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch hotel', details: message });
  }
};

// UPDATE - Update hotel by ID
export const updateHotel: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid hotel ID' });
    return;
  }

  const hotel: HotelPayload = req.body;

  try {
    const result = await hotelService.updateHotel(id, hotel);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Hotel not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update hotel', details: message });
  }
};

// DELETE - Remove hotel by ID
export const deleteHotel: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid hotel ID' });
    return;
  }

  try {
    const result = await hotelService.deleteHotel(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Hotel not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete hotel', details: message });
  }
};
