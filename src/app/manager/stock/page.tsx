'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import mockStock from '../../../utilscripts/mockStock.json';
import StockItem from '@/interfaces/stockItem';

//components
import Skeleton from '@/components/containers/Skeleton';
import ManagerStock from '@/components/cards/manager/ManagerStock';

export default function ManagerStockPage() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const { t } = useTranslation();

  const total = quantity * cost;

  const fetchStock = async () => {
    setStock(mockStock as StockItem[]);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  /* ---------- Add Stock ---------- */
  const handleAddStock = async () => {
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

  return (
    <Skeleton className="container py-4">
      <h2 className="text-center mb-4 textColorless">{t('managerStock')}</h2>

      <ManagerStock props={stock}/>

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
    </Skeleton>
  );
}
