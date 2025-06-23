import { Request, Response } from 'express'
import Feedback from '../models/Feedback'

// CREATE - Add feedback
export const addFeedback = async (req: Request, res: Response) => {
  const { customerID, email, comments, rating = null, response = null } = req.body
  const feedback = new Feedback()

  try {
    const result = await feedback.addFeedback(customerID, email, comments, rating, response)
    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to add feedback', details: message })
  }
}

// READ - Get feedback, optional filter by customerID in query
export const getFeedback = async (req: Request, res: Response) => {
  const customerID = req.query.customerID as string | undefined
  const feedback = new Feedback()

  try {
    const result = await feedback.getFeedback(customerID)
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch feedback', details: message })
  }
}

// UPDATE - Update feedback
export const updateFeedback = async (req: Request, res: Response) => {
  const { feedbackID, comments, response, rating } = req.body
  const feedback = new Feedback()

  try {
    const result = await feedback.updateFeedback(feedbackID, comments, response, rating)
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to update feedback', details: message })
  }
}

// DELETE - Delete feedback by ID
export const deleteFeedback = async (req: Request<{ feedbackID: string }>, res: Response) => {
  const { feedbackID } = req.params
  const feedback = new Feedback()

  try {
    const result = await feedback.deleteFeedback(feedbackID)
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to delete feedback', details: message })
  }
}
