'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface StockItem {
  StockID: number;
  ItemName: string;
  ItemDescription: string;
  Quantity: number;
  Cost: number;
  Total: number;
}

export default function ManagerStockPage() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);

  const total = quantity * cost;

  const fetchStock = async () => {
    try {
      const response = await axios.get('/api/managerstock');
      setStock(response.data);
    } catch {
      alert('Failed to fetch stock.');
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleAddStock = async () => {
    try {
      const newStock = {
        ItemName: itemName,
        ItemDescription: itemDescription,
        Quantity: quantity,
        Cost: cost,
        Total: total,
      };
      await axios.post('/api/managerstock', newStock);
      alert('Stock added successfully!');
      setShowModal(false);
      fetchStock();
    } catch {
      alert('Failed to add stock.');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 textColorless">Manager Stock</h2>

      <div style={{ maxHeight: '500px', overflowY: 'auto' }} className="mb-4">
        <div className="row g-3">
          {stock.map(item => (
            <div key={item.StockID} className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5>Stock ID: {item.StockID}</h5>
                  <p><strong>Name:</strong> {item.ItemName}</p>
                  <p><strong>Description:</strong> {item.ItemDescription}</p>
                  <p><strong>Quantity:</strong> {item.Quantity}</p>
                  <p><strong>Cost per unit:</strong> KES {item.Cost.toFixed(2)}</p>
                  <p><strong>Total:</strong> KES {item.Total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button variant="primary" onClick={() => setShowModal(true)}>Add Stock</Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Stock Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                type="text"
                value={itemDescription}
                onChange={e => setItemDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                value={cost}
                onChange={e => setCost(Number(e.target.value))}
              />
            </Form.Group>
            <p><strong>Total:</strong> KES {total.toFixed(2)}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddStock}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
