'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//scripts
import Order from '@/interfaces/order';
import Dish from '@/interfaces/dish';
import OrderItem from '@/components/cards/OrderItem';


export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [plates, setPlates] = useState(1);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    axios.get('/api/customerorders').then(res => setOrders(res.data));
    axios.get('/api/dishes').then(res => setDishes(res.data));
  }, []);

  const handleDishChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dish = dishes.find(d => d.DishID === parseInt(e.target.value));
    if (dish) setSelectedDish(dish);
  };

  const handleSubmit = async () => {
    if (!selectedDish || !date || !time) return;

    const total = selectedDish.DishPrice * plates;
    const confirmed = await axios.post('/api/initiate-mpesa', { amount: total });

    if (confirmed.data.success) {
      await axios.post('/api/customerorders', {
        DishID: selectedDish.DishID,
        DishName: selectedDish.DishName,
        DishPrice: selectedDish.DishPrice,
        Plates: plates,
        OrderPrice: total,
        OrderDescription: description,
        OrderDate: date,
        OrderTime: time,
        PaymentStatus: 'Paid',
        Served: 'NO',
      });
      setShowModal(false);
      setPlates(1);
      setDescription('');
      setDate('');
      setTime('');
      setSelectedDish(null);
      axios.get('/api/customerorders').then(res => setOrders(res.data));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 textColorless">Customer Orders</h2>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <div className="row g-3">
          {orders.map(order => (
            <OrderItem
              key={order.OrderID}
              DishName={order.DishName}
              Plates={order.Plates}
              OrderPrice={order.OrderPrice}
              OrderDescription={order.OrderDescription}
              OrderDate={order.OrderDate}
              OrderTime={order.OrderTime}
              PaymentStatus={order.PaymentStatus}
              Served={order.Served}
            />
          ))}
          <OrderItem DishName='Murele' Plates={2} OrderPrice={300} OrderDescription='Kukoni' OrderDate='Lelo' OrderTime='Isahinu' PaymentStatus='Paid' Served='YES'/>
        </div>
      </div>

      <div className="text-center mt-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>Place New Order</Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Dish</Form.Label>
              <Form.Select onChange={handleDishChange}>
                <option value="">Select a Dish</option>
                {dishes.map(dish => (
                  <option key={dish.DishID} value={dish.DishID}>{dish.DishName}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {selectedDish && (
              <>
                <p><strong>Price per Plate:</strong> KES {selectedDish.DishPrice.toFixed(2)}</p>
                <p><strong>Total:</strong> KES {(selectedDish.DishPrice * plates).toFixed(2)}</p>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Plates</Form.Label>
              <Form.Control type="number" value={plates} onChange={e => setPlates(parseInt(e.target.value) || 1)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Order Date</Form.Label>
              <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Order Time</Form.Label>
              <Form.Control type="time" value={time} onChange={e => setTime(e.target.value)} />
            </Form.Group>

            <p><strong>Payment Status:</strong> Not Paid</p>
            <p><strong>Served:</strong> NO</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSubmit}>Submit & Pay</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
