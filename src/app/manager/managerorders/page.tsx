'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

interface Order {
  OrderID: number;
  DishID: number;
  DishName: string;
  DishPrice: number;
  Plates: number;
  OrderPrice: number;
  OrderDescription: string;
  OrderDate: string;
  OrderTime: string;
  PaymentStatus: 'Paid' | 'Not Paid';
  Served: 'YES' | 'NO';
}

export default function ManagerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const response = await axios.get('/api/managerorders');
    setOrders(response.data);
  };

  const markAsServed = async (orderId: number) => {
    await axios.put(`/api/managerorders/${orderId}/serve`);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 textColorless">Manager Orders</h2>
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <div className="row g-3">
          {orders.map(order => (
            <div key={order.OrderID} className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5>Order ID: {order.OrderID}</h5>
                  <h6>Dish ID: {order.DishID}</h6>
                  <p><strong>Dish Name:</strong> {order.DishName}</p>
                  <p><strong>Dish Price:</strong> KES {order.DishPrice.toFixed(2)}</p>
                  <p><strong>Plates:</strong> {order.Plates}</p>
                  <p><strong>Order Price:</strong> KES {order.OrderPrice.toFixed(2)}</p>
                  <p><strong>Description:</strong> {order.OrderDescription}</p>
                  <p><strong>Date:</strong> {order.OrderDate} at {order.OrderTime}</p>
                  <p><strong>Payment Status:</strong> {order.PaymentStatus}</p>
                  <Button
                    variant={order.Served === 'YES' ? 'success' : 'warning'}
                    disabled={order.Served === 'YES'}
                    onClick={() => order.Served === 'NO' && markAsServed(order.OrderID)}
                  >
                    {order.Served === 'YES' ? 'Served' : 'Mark as Served'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
