'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

// Define types
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

export default function CustomerReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [unitID, setUnitID] = useState<number>(0);
  const [tableID, setTableID] = useState<number>(0);
  const [dishID, setDishID] = useState<number>(0);
  const [plates, setPlates] = useState<number>(1);
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Not Paid'>('Not Paid');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  // Fetch reservations and dishes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRes, resDish] = await Promise.all([
          axios.get('/api/reservations'),
          axios.get('/api/dishes'),
        ]);
        setReservations(resRes.data);
        setDishes(resDish.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedDish = dishes.find(d => d.DishID === dishID);
  const totalPrice = selectedDish ? selectedDish.DishPrice * plates : 0;

  // Simulate MPESA STK push before saving reservation
  const handleReserve = async () => {
    if (!unitID || !tableID || !dishID || plates < 1 || !reservationDate || !reservationTime) {
      return alert('Please fill all fields.');
    }

    try {
      // simulate MPESA push
      await axios.post('/api/pay', { amount: totalPrice });
      setPaymentStatus('Paid');

      const newRes: Omit<Reservation, 'ReservationID'> = {
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

      const res = await axios.post('/api/reservations', newRes);
      setReservations([res.data, ...reservations]);

      setShowModal(false);
    } catch (e) {
      alert('Payment or reservation failed.');
      console.error(e);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 textColorless">Customer Reservations</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <div className="row g-3">
            {reservations.map(res => (
              <div key={res.ReservationID} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h2 className="fs-5">Res ID: {res.ReservationID}</h2>
                    <h3 className="fs-6">Unit: {res.UnitID}</h3>
                    <h4 className="fs-6">Table: {res.TableID}</h4>
                    <p>Dish: {res.DishName}</p>
                    <p>Plates: {res.Plates}</p>
                    <p>Price: {res.OrderPrice.toFixed(2)}</p>
                    <p>Status: <span className={res.PaymentStatus === 'Paid' ? 'text-success' : 'text-danger'}>{res.PaymentStatus}</span></p>
                    <p>Date/Time: {res.ReservationDate} {res.ReservationTime}</p>
                  </div>
                </div>
              </div>
            ))}
            {reservations.length === 0 && <p className="text-center text-muted w-100">No reservations found.</p>}
          </div>
        </div>
      )}

      {/* Reserve Button */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          New Reservation
        </button>
      </div>

      {/* Reservation Modal */}
      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label>UnitID</label>
            <input type="number" className="form-control" value={unitID} onChange={e => setUnitID(+e.target.value)} />
          </div>
          <div className="mb-3">
            <label>TableID</label>
            <input type="number" className="form-control" value={tableID} onChange={e => setTableID(+e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Dish</label>
            <select className="form-select" value={dishID} onChange={e => setDishID(+e.target.value)}>
              <option value={0}>-- Select --</option>
              {dishes.map(d => <option key={d.DishID} value={d.DishID}>{d.DishName}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label>Plates</label>
            <input type="number" min={1} className="form-control" value={plates} onChange={e => setPlates(+e.target.value)} />
          </div>
          <p><strong>OrderPrice:</strong> {totalPrice.toFixed(2)}</p>
          <p><strong>PaymentStatus:</strong> {paymentStatus}</p>
          <div className="mb-3">
            <label>Date</label>
            <input type="date" className="form-control" value={reservationDate} onChange={e => setReservationDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Time</label>
            <input type="time" className="form-control" value={reservationTime} onChange={e => setReservationTime(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleReserve}>Reserve & Pay</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
