'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';                           //Live API (disabled in mock mode)
import 'bootstrap/dist/css/bootstrap.min.css';
import mockReservations from '../../../utilscripts/mockReservations.json'; //Local mock data
import Reservation from '@/interfaces/reservation';


export default function ManagerReservationsPage() {
  /* ---------- State ---------- */
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { t } = useTranslation();

  /* ---------- Fetch (mock) ---------- */
  const fetchReservations = async () => {
    /* LIVE ENDPOINT
    const response = await axios.get('/api/managerreservations');
    setReservations(response.data);
    */

    // MOCK MODE: simply load local JSON
    setReservations(mockReservations as Reservation[]);
  };

  /* ---------- Lifecycle ---------- */
  useEffect(() => {
    fetchReservations();
  }, []);

  /* ---------- UI ---------- */
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 textColorless">{t('managerReservations')}</h2>
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <div className="row g-3">
          {reservations.map(res => (
            <div key={res.ReservationID} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>{t('reservationId')}: {res.ReservationID}</h5>
                  <h6>{t('tableID')}: {res.TableID}</h6>
                  <h6>{t('orderId')}: {res.OrderID}</h6>
                  <h6>{t('dishID')}: {res.DishID}</h6>
                  <p><strong>{t('dishName')}:</strong> {res.DishName}</p>
                  <p><strong>{t('plates')}:</strong> {res.Plates}</p>
                  <p><strong>{t('orderPrice')}:</strong> KES {res.OrderPrice.toFixed(2)}</p>
                  <p><strong>{t('paymentStatus')}:</strong> {res.PaymentStatus}</p>
                  <p><strong>{t('reservationDate')}:</strong> {res.ReservationDate}</p>
                  <p><strong>{t('reservationTime')}:</strong> {res.ReservationTime}</p>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
