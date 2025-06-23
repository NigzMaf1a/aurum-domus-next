// controllers/bioController.ts
import { Request, Response } from 'express'
import Bio from '../models/Bio'

// CREATE - Add bio
export const addBio = async (req: Request, res: Response) => {
  const { unitID, instagram, facebook, twitter, unitPhone, unitLocation, aboutUs } = req.body
  const bioService = new Bio()

  try {
    const result = await bioService.addBio(unitID, instagram, facebook, twitter, unitPhone, unitLocation, aboutUs)
    res.status(201).json(result)
  } catch (err) {
    console.error('Add Bio Error:', err)
    res.status(500).json({ error: 'Failed to add bio' })
  }
}

// READ - Get bio for a specific unit
export const getBio = async (req: Request, res: Response) => {
  const { unitID } = req.params
  const bioService = new Bio()

  try {
    const result = await bioService.getBio(unitID)
    res.status(200).json(result)
  } catch (err) {
    console.error('Get Bio Error:', err)
    res.status(500).json({ error: 'Failed to fetch bio' })
  }
}

// READ - Get all bios
export const getAllBios = async (_req: Request, res: Response) => {
  const bioService = new Bio()

  try {
    const result = await bioService.getBio()
    res.status(200).json(result)
  } catch (err) {
    console.error('Get All Bios Error:', err)
    res.status(500).json({ error: 'Failed to fetch bios' })
  }
}

// UPDATE - Update bio
export const updateBio = async (req: Request, res: Response) => {
  const { bioID, unitID, instagram, facebook, twitter, unitPhone, unitLocation, aboutUs } = req.body
  const bioService = new Bio()

  try {
    const result = await bioService.updateBio(bioID, unitID, instagram, facebook, twitter, unitPhone, unitLocation, aboutUs)
    res.status(200).json(result)
  } catch (err) {
    console.error('Update Bio Error:', err)
    res.status(500).json({ error: 'Failed to update bio' })
  }
}

// DELETE - Delete bio
export const deleteBio = async (req: Request, res: Response) => {
  const { bioID } = req.params
  const bioService = new Bio()

  try {
    const result = await bioService.deleteBio(bioID)
    res.status(200).json(result)
  } catch (err) {
    console.error('Delete Bio Error:', err)
    res.status(500).json({ error: 'Failed to delete bio' })
  }
}
