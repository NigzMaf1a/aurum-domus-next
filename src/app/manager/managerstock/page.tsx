'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';                    //Live API (disabled in mock mode)
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import mockStock from '../../../utilscripts/mockStock.json'; //Local mock data

/* ---------- Types ---------- */
interface StockItem {
  StockID: number;
  ItemName: string;
  ItemDescription: string;
  Quantity: number;
  Cost: number;
  Total: number;
}

export default function ManagerStockPage() {
  /* ---------- State ---------- */
  const [stock, setStock] = useState<StockItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const { t } = useTranslation();

  const total = quantity * cost;

  /* ---------- Fetch (mock) ---------- */
  const fetchStock = async () => {
    /*LIVE ENDPOINT
    try {
      const response = await axios.get('/api/managerstock');
      setStock(response.data);
    } catch {
      alert('Failed to fetch stock.');
    }
    */

    // 🕹️ MOCK MODE: simply load local JSON
    setStock(mockStock as StockItem[]);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  /* ---------- Add Stock ---------- */
  const handleAddStock = async () => {
    /*LIVE ENDPOINT
    try {
      const newStock = { ItemName: itemName, ItemDescription: itemDescription,
                         Quantity: quantity, Cost: cost, Total: total };
      await axios.post('/api/managerstock', newStock);
      alert('Stock added successfully!');
      setShowModal(false);
      fetchStock();
    } catch {
      alert('Failed to add stock.');
    }
    */

    //MOCK SUCCESS: update local state only
    const newStock: StockItem = {
      StockID: stock.length ? Math.max(...stock.map(s => s.StockID)) + 1 : 1,
      ItemName: itemName,
      ItemDescription: itemDescription,
      Quantity: quantity,
      Cost: cost,
      Total: total
    };
    setStock(prev => [...prev, newStock]);
    setShowModal(false);
  };

  /* ---------- UI ---------- */
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 textColorless">{t('managerStock')}</h2>

      <div style={{ maxHeight: '500px', overflowY: 'auto' }} className="mb-4">
        <div className="row g-3">
          {stock.map(item => (
            <div key={item.StockID} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>{t('stockId')}: {item.StockID}</h5>
                  <p><strong>{t('itemName')}:</strong> {item.ItemName}</p>
                  <p><strong>{t('itemDescription')}:</strong> {item.ItemDescription}</p>
                  <p><strong>{t('quantity')}:</strong> {item.Quantity}</p>
                  <p><strong>{t('costPerUnit')}:</strong> KES {item.Cost.toFixed(2)}</p>
                  <p><strong>{t('total')}:</strong> KES {item.Total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          {t('addStock')}
        </Button>
      </div>

      {/* ---------- Modal ---------- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('addStock')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t('itemName')}</Form.Label>
              <Form.Control
                type="text"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('itemDescription')}</Form.Label>
              <Form.Control
                type="text"
                value={itemDescription}
                onChange={e => setItemDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('quantity')}</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('cost')}</Form.Label>
              <Form.Control
                type="number"
                value={cost}
                onChange={e => setCost(Number(e.target.value))}
              />
            </Form.Group>
            <p><strong>{t('total')}:</strong> {t('kshs')} {total.toFixed(2)}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t('cancel')}
          </Button>
          <Button variant="success" onClick={handleAddStock}>
            {t('submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
