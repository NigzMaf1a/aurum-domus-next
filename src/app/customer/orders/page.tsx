'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//scripts
import Order from '@/interfaces/order';
import Dish from '@/interfaces/dish';

//components
import Skeleton from '@/components/containers/Skeleton';
import FleshVert from '@/components/containers/FleshVert';
import Ribz from '@/components/containers/Ribz';
import DynamicDiv from '@/components/containers/DynamicDiv';
import OrderItem from '@/components/cards/OrderItem';
import DynamicHead from '@/components/h/DynamicHead';
import DynamicButton from '@/components/buttons/DynamicButton';
import DynamicInput from '@/components/inputs/DynamicInput';


export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [plates, setPlates] = useState(1);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [searchPar, setSearchPar] = useState('');

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
    <Skeleton>
      <h2 className="text-center mb-4 textColorless">Customer Orders</h2>
      <FleshVert>
          <Ribz className='d-flex flex-row justify-content-between justify-content-center' style={{height:'100px', backgroundColor:'#25383C'}}>
            <DynamicDiv className='d-flex flex-column justify-content-center'>
              <DynamicHead text={"Add New Order"} className='text-center' style={{marginLeft:'20px'}}/>
            </DynamicDiv>
            <DynamicDiv className='d-flex flex-column justify-content-center' style={{width:'100px', height:'100px'}}>
              <DynamicButton label='Order' onClick={() => setShowModal(true)} style={{width:'50px', height:'30px', backgroundColor:'#AF7817'}}/>
            </DynamicDiv>
          </Ribz>
        <DynamicDiv  className='d-flex flex-column gap-2 bg-light px-2 py-2'
              style={{backgroundColor:'#46C7C7', maxHeight:'400px'}}
        >
              <DynamicInput value={searchPar}
                            onChange={setSearchPar}
                            placeholder='Search orders'
                            type='text'
              />
            <DynamicDiv className='d-flex flex-column gap-2'>
              <OrderItem DishName='Murele' Plates={2} OrderPrice={300} OrderDescription='Kukoni' OrderDate='Lelo' OrderTime='Isahinu' PaymentStatus='Paid' Served='YES' Image={"/aurum7.jpg"}/>
              <OrderItem DishName='Murele' Plates={2} OrderPrice={300} OrderDescription='Kukoni' OrderDate='Lelo' OrderTime='Isahinu' PaymentStatus='Paid' Served='YES'Image={"/aurum9.jpg"}/>
            </DynamicDiv>
        </DynamicDiv>

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
      </FleshVert>
    </Skeleton>
  );
}
