'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

interface Reservation {
  ReservationID: number;
  TableID: number;
  OrderID: number;
  DishID: number;
  DishName: string;
  Plates: number;
  OrderPrice: number;
  PaymentStatus: 'Paid' | 'Not Paid';
  ReservationDate: string;
  ReservationTime: string;
  ReservationStatus: 'Attended' | 'Pending';
}

export default function ManagerReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchReservations = async () => {
    const response = await axios.get('/api/managerreservations');
    setReservations(response.data);
  };

  const markAsAttended = async (reservationId: number) => {
    await axios.put(`/api/managerreservations/${reservationId}/attend`);
    fetchReservations();
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="container py-4 ">
      <h2 className="text-center mb-4 textColorless">Manager Reservations</h2>
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <div className="row g-3">
          {reservations.map(res => (
            <div key={res.ReservationID} className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5>Reservation ID: {res.ReservationID}</h5>
                  <h6>Table ID: {res.TableID}</h6>
                  <h6>Order ID: {res.OrderID}</h6>
                  <h6>Dish ID: {res.DishID}</h6>
                  <p><strong>Dish Name:</strong> {res.DishName}</p>
                  <p><strong>Plates:</strong> {res.Plates}</p>
                  <p><strong>Order Price:</strong> KES {res.OrderPrice.toFixed(2)}</p>
                  <p><strong>Payment Status:</strong> {res.PaymentStatus}</p>
                  <p><strong>Reservation Date:</strong> {res.ReservationDate}</p>
                  <p><strong>Reservation Time:</strong> {res.ReservationTime}</p>
                  <Button
                    variant={res.ReservationStatus === 'Attended' ? 'success' : 'warning'}
                    disabled={res.ReservationStatus === 'Attended'}
                    onClick={() => res.ReservationStatus === 'Pending' && markAsAttended(res.ReservationID)}
                  >
                    {res.ReservationStatus === 'Attended' ? 'Attended' : 'Mark as Attended'}
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
