import { Request, Response, RequestHandler } from 'express';
import Customer from '../models/customer';
import { CustomerPayload } from '../interfaces/customer';

const customerService = new Customer();

// CREATE - Add a new customer
export const createCustomer: RequestHandler = async (req: Request, res: Response) => {
  const customer: CustomerPayload = req.body;
  console.log("Incoming data:", req.body);

  try {
    const result = await customerService.createCustomer(customer);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.log(`Error ${err} occurred while creating customer`);
    res.status(500).json({ error: 'Failed to create customer', details: message });
  }
};

// READ - Get all customers
export const getAllCustomers: RequestHandler = async (_req, res) => {
  try {
    const rows = await customerService.getAllCustomers();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch customers', details: message });
  }
};

// READ - Get single customer by ID
export const getCustomerByID: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid customer ID' });
    return;
  }

  try {
    const customer = await customerService.getCustomerByID(id);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    res.status(200).json(customer);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch customer', details: message });
  }
};

// UPDATE - Update customer by ID
export const updateCustomer: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid customer ID' });
    return;
  }

  const customer: CustomerPayload = req.body;

  try {
    const result = await customerService.updateCustomer(id, customer);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Customer not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update customer', details: message });
  }
};

// DELETE - Remove customer by ID
export const deleteCustomer: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid customer ID' });
    return;
  }

  try {
    const result = await customerService.deleteCustomer(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete customer', details: message });
  }
};
