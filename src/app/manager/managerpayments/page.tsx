'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface Payment {
  PaymentID: number;
  FinanceID: number;
  Name1: string;
  Name2: string;
  PaymentType: 'Mpesa' | 'Cash';
  PaymentAmount: number;
  PaymentDate: string; // YYYY-MM-DD
  PaymentTime: string; // HH:MM:SS
}

const ManagerPaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('/api/managerpayments');
        if (Array.isArray(res.data)) {
          setPayments(res.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch payments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 textColorless">Manager Payments</h2>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center text-muted">Loading payments...</p>
      ) : (
        <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
          {payments.length === 0 ? (
            <p className="text-center text-muted">No payments found.</p>
          ) : (
            payments.map((payment) => (
              <div key={payment.PaymentID} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {payment.Name1} {payment.Name2}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Payment Type:</strong>{' '}
                    <span className={`badge ${payment.PaymentType === 'Mpesa' ? 'bg-success' : 'bg-primary'}`}>
                      {payment.PaymentType}
                    </span>
                  </p>
                  <p className="card-text mb-1">
                    <strong>Amount:</strong> KES {payment.PaymentAmount.toFixed(2)}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Date:</strong> {payment.PaymentDate}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Time:</strong> {payment.PaymentTime}
                  </p>
                  <p className="card-text">
                    <strong>Finance ID:</strong> #{payment.FinanceID}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManagerPaymentsPage;
