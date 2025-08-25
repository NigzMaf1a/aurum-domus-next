'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

type Payment = {
  PaymentID: number;
  FinanceID: number;
  RegID: number;
  OrderID: number;
  Name1: string;
  Name2: string;
  PaymentType: 'Mpesa' | 'Cash';
  PaymentAmount: number;
  PaymentDate: string;
  PaymentTime: string;
};

export default function CustomerPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/customerpayments');
        setPayments(response.data);
      } catch (err) {
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 textColorless">Customer Payments</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <div className="row g-3">
            {payments.map(payment => (
              <div key={payment.PaymentID} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Payment ID: {payment.PaymentID}</h5>
                    <p className="card-text mb-1"><strong>Finance ID:</strong> {payment.FinanceID}</p>
                    <p className="card-text mb-1"><strong>Reg ID:</strong> {payment.RegID}</p>
                    <p className="card-text mb-1"><strong>Order ID:</strong> {payment.OrderID}</p>
                    <p className="card-text mb-1"><strong>Name:</strong> {payment.Name1} {payment.Name2}</p>
                    <p className="card-text mb-1"><strong>Type:</strong> {payment.PaymentType}</p>
                    <p className="card-text mb-1"><strong>Amount:</strong> KES {payment.PaymentAmount.toFixed(2)}</p>
                    <p className="card-text mb-1"><strong>Date:</strong> {payment.PaymentDate}</p>
                    <p className="card-text"><strong>Time:</strong> {payment.PaymentTime}</p>
                  </div>
                </div>
              </div>
            ))}
            {payments.length === 0 && (
              <p className="text-center text-muted w-100">No payments found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
