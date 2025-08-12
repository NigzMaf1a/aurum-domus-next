import { Request, Response, RequestHandler } from 'express'
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
export const getFeedback: RequestHandler = async (req, res, next) => {
  try {
    // customerID from query is always a string, convert to number if present
    const customerID = req.query.customerID ? Number(req.query.customerID) : undefined

    if (customerID !== undefined && isNaN(customerID)) {
      res.status(400).json({ error: 'Invalid customerID' })
      return
    }

    const feedback = new Feedback()
    const result = await feedback.getFeedback(customerID)
    res.status(200).json(result)
  } catch (err) {
    next(err)
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
export const deleteFeedback: RequestHandler = async (req, res, next) => {
  try {
    const feedbackID = Number(req.params.feedbackID)
    if (isNaN(feedbackID)) {
      res.status(400).json({ error: 'Invalid feedbackID' })
      return
    }

    const feedback = new Feedback()
    const result = await feedback.deleteFeedback(feedbackID)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
