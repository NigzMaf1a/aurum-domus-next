"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface Payment{
    id: number;
    amount: number;
    type: string;
    date: string;
    status: string;
}

function Rejected() {
  const [rejectedPayments, setRejectedPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
    const rejectPayment = async (id: number) => {
    try {
      // await axios.put(`/api/deactivate/${id}`, { status: 'Inactive' }); // ❌ Disabled for mock
      setRejectedPayments((prev) => prev.filter((pay) => pay.id !== id));
    } catch (err) {
      console.error('Error rejecting payment:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 textColorless">Pending Payments</h2>
      <div
        className="table-responsive"
        style={{
          maxHeight: '70vh',
          overflowY: 'auto',
          border: '1px solid #dee2e6',
          borderRadius: '0.25rem',
        }}
      >
        <table className="table table-striped table-hover table-bordered mb-0">
          <thead className="table-danger sticky-top">
            <tr>
              <th>Payment ID</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center">
                  {t('loading')}
                </td>
              </tr>
            ) : rejectedPayments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  {t('noApprovedUsers')}
                </td>
              </tr>
            ) : (
              rejectedPayments.map((pay) => (
                <tr key={pay.id}>
                  <td>{pay.id}</td>
                  <td>{pay.amount}</td>
                  <td>{pay.type}</td>
                  <td>{pay.date}</td>
                  <td>{pay.status}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => rejectPayment(pay.id)}
                    >
                      {t('deactivate')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Rejected;
