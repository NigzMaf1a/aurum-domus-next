import { Request, Response } from 'express'
import Faqs from '../models/Faqs'

// CREATE - Add new FAQ
export const addFaq = async (req: Request, res: Response) => {
  const { question, answer } = req.body
  const faqs = new Faqs()

  try {
    const result = await faqs.addFaq(question, answer)
    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to add FAQ', details: message })
  }
}

// READ - Get all FAQs
export const getFaqs = async (_req: Request, res: Response) => {
  const faqs = new Faqs()

  try {
    const result = await faqs.getFaqs()
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch FAQs', details: message })
  }
}

// UPDATE - Update a FAQ
export const updateFaq = async (req: Request, res: Response) => {
  const { faqID, question, answer } = req.body
  const faqs = new Faqs()

  try {
    const result = await faqs.updateFaq(faqID, question, answer)
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to update FAQ', details: message })
  }
}

// DELETE - Delete a FAQ
export const deleteFaq = async (req: Request<{ faqID: string }>, res: Response) => {
  const { faqID } = req.params
  const faqs = new Faqs()

  try {
    const result = await faqs.deleteFaq(faqID)
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to delete FAQ', details: message })
  }
}
