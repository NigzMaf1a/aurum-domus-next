'use client';

import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import reservationsData from '../../../utilscripts/mockReservations.json'; // <-- mock data lives here


//components
import Skeleton from '@/components/containers/Skeleton';
import Ribz from '@/components/containers/Ribz';
import Reservations from '@/components/cards/reservations/Reservations';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicHead from '@/components/h/DynamicHead';
import DynamicButton from '@/components/buttons/DynamicButton';

type Reservation = {
  ReservationID: number;
  UnitID: number;
  TableID: number;
  RegID: number;
  OrderID: number;
  DishID: number;
  DishName: string;
  Plates: number;
  OrderPrice: number;
  PaymentStatus: 'Paid' | 'Not Paid';
  ReservationDate: string;
  ReservationTime: string;
};

type Dish = {
  DishID: number;
  DishName: string;
  DishPrice: number;
};

const mockDishes: Dish[] = [
  { DishID: 1, DishName: 'Beef Burger', DishPrice: 550 },
  { DishID: 2, DishName: 'Sushi Combo', DishPrice: 850 },
  { DishID: 3, DishName: 'Veggie Pizza', DishPrice: 700 },
  { DishID: 4, DishName: 'Chicken Tikka', DishPrice: 650 },
  { DishID: 5, DishName: 'Pasta Alfredo', DishPrice: 600 },
];

export default function CustomerReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [dishes] = useState<Dish[]>(mockDishes);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [unitID, setUnitID] = useState<number>(0);
  const [tableID, setTableID] = useState<number>(0);
  const [dishID, setDishID] = useState<number>(0);
  const [plates, setPlates] = useState<number>(1);
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Not Paid'>('Not Paid');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  useEffect(() => {
    setReservations(reservationsData as Reservation[]);
    setLoading(false);
  }, []);

  const selectedDish = dishes.find(d => d.DishID === dishID);
  const totalPrice = selectedDish ? selectedDish.DishPrice * plates : 0;

  const handleReserve = async () => {
    if (!unitID || !tableID || !dishID || plates < 1 || !reservationDate || !reservationTime) {
      return alert('Please fill all fields.');
    }

    const newReservation: Reservation = {
      ReservationID: Date.now(),
      UnitID: unitID,
      TableID: tableID,
      RegID: 0,
      OrderID: 0,
      DishID: dishID,
      DishName: selectedDish!.DishName,
      Plates: plates,
      OrderPrice: totalPrice,
      PaymentStatus: 'Paid',
      ReservationDate: reservationDate,
      ReservationTime: reservationTime,
    };

    setReservations([newReservation, ...reservations]);
    setShowModal(false);
  };

  return (
    <Skeleton className='gap-3'>
      <h2 className="text-center mb-4 textColorless">Customer Reservations</h2>
      <Ribz className='d-flex flex-row justify-content-between justify-content-center' style={{height:'100px', backgroundColor:'#25383C'}}>
          <DynamicDiv className='d-flex flex-column justify-content-center'>
            <DynamicHead text={"Add Reservation"} className='text-center' style={{marginLeft:'20px'}}/>
          </DynamicDiv>
          <DynamicDiv className='d-flex flex-column justify-content-center' style={{width:'100px', height:'100px'}}>
            <DynamicButton label='Add' onClick={() => setShowModal(true)} style={{width:'50px', height:'30px', backgroundColor:'#AF7817'}}/>
          </DynamicDiv>
      </Ribz>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (<Reservations reservations={reservations}/> )}


      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label>UnitID</label>
            <input
              type="number"
              className="form-control"
              value={unitID}
              onChange={e => setUnitID(+e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>TableID</label>
            <input
              type="number"
              className="form-control"
              value={tableID}
              onChange={e => setTableID(+e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Dish</label>
            <select className="form-select" value={dishID} onChange={e => setDishID(+e.target.value)}>
              <option value={0}>-- Select --</option>
              {dishes.map(d => (
                <option key={d.DishID} value={d.DishID}>
                  {d.DishName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Plates</label>
            <input
              type="number"
              min={1}
              className="form-control"
              value={plates}
              onChange={e => setPlates(+e.target.value)}
            />
          </div>
          <p>
            <strong>OrderPrice:</strong> {totalPrice.toFixed(2)}
          </p>
          <p>
            <strong>PaymentStatus:</strong> {paymentStatus}
          </p>
          <div className="mb-3">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={reservationDate}
              onChange={e => setReservationDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              value={reservationTime}
              onChange={e => setReservationTime(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReserve}>
            Reserve & Pay
          </Button>
        </Modal.Footer>
      </Modal>
    </Skeleton>
  );
}
