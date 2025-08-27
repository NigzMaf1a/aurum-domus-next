'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';                           // Live API (disabled in mock mode)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import mockPayments from '../../../utilscripts/mockPayments.json'; // Local mock data
import Payment from '@/interfaces/payment';

//Components
import Skeleton from '@/components/containers/Skeleton';

const ManagerPaymentsPage: React.FC = () => {
  /* ---------- State ---------- */
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  /* ---------- Fetch (mock) ---------- */
  useEffect(() => {
    /* LIVE ENDPOINT
    (async () => {
      try {
        const res = await axios.get('/api/managerpayments');
        if (Array.isArray(res.data)) setPayments(res.data);
        else throw new Error('Invalid data format received');
      } catch (err) {
        console.error(err);
        setError('Failed to fetch payments. Please try again later.');
      } finally {
        setLoading(false);
      }
    })();
    */

    // MOCK MODE: instant load from local JSON
    setPayments(mockPayments as Payment[]);
    setLoading(false);
  }, []);

  /* ---------- UI ---------- */
  return (
    <Skeleton className="container my-5">
      <h2 className="text-center mb-4 textColorless">{t('managerPayments')}</h2>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center text-muted">{t('loadingPayments')}</p>
      ) : (
        <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
          {payments.length === 0 ? (
            <p className="text-center text-muted">{t('noPayments')}</p>
          ) : (
            payments.map(payment => (
              <div key={payment.PaymentID} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {payment.Name1} {payment.Name2}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>{t('paymentType')}:</strong>{' '}
                    <span
                      className={`badge ${
                        payment.PaymentType === 'Mpesa' ? 'bg-success' : 'bg-primary'
                      }`}
                    >
                      {payment.PaymentType}
                    </span>
                  </p>
                  <p className="card-text mb-1">
                    <strong>{t('amount')}:</strong> {t('kshs')} {payment.PaymentAmount.toFixed(2)}
                  </p>
                  <p className="card-text mb-1">
                    <strong>{t('date')}:</strong> {payment.PaymentDate}
                  </p>
                  <p className="card-text mb-1">
                    <strong>{t('time')}:</strong> {payment.PaymentTime}
                  </p>
                  <p className="card-text">
                    <strong>{t('financeID')}:</strong> #{payment.FinanceID}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Skeleton>
  );
};

export default ManagerPaymentsPage;
