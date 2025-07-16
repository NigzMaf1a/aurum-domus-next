'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';                     // Live API (disabled in mock mode)
import 'bootstrap/dist/css/bootstrap.min.css';
import mockOrders from '../../../utilscripts/mockOrders.json'; // Local mock data

/* ---------- Types ---------- */
import Order from '../../../interfaces/order';

export default function ManagerOrdersPage() {
  /* ---------- State ---------- */
  const [orders, setOrders] = useState<Order[]>([]);
  const { t } = useTranslation();

  /* ---------- Fetch (mock) ---------- */
  const fetchOrders = async () => {
    /* LIVE ENDPOINT
    const response = await axios.get('/api/managerorders');
    setOrders(response.data);
    */

    // MOCK MODE: simply load local JSON
    setOrders(mockOrders as Order[]);
  };

  /* ---------- Lifecycle ---------- */
  useEffect(() => {
    fetchOrders();
  }, []);

  /* ---------- UI ---------- */
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 textColorless">{t('managerOrders')}</h2>
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <div className="row g-3">
          {orders.map(order => (
            <div key={order.OrderID} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>{t('orderId')}: {order.OrderID}</h5>
                  <h6>{t('dishID')}: {order.DishID}</h6>
                  <p><strong>{t('dishName')}:</strong> {order.DishName}</p>
                  <p><strong>{t('dishPrice')}:</strong> KES {order.DishPrice.toFixed(2)}</p>
                  <p><strong>{t('plates')}:</strong> {order.Plates}</p>
                  <p><strong>{t('orderPrice')}:</strong> KES {order.OrderPrice.toFixed(2)}</p>
                  <p><strong>{t('description')}:</strong> {order.OrderDescription}</p>
                  <p><strong>{t('date')}:</strong> {order.OrderDate} at {order.OrderTime}</p>
                  <p><strong>{t('payStatus')}:</strong> {order.PaymentStatus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
