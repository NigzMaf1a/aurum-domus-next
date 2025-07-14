"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface ApprovedPayment{
    id: number;
    amount: number;
    type: string;
    date: string;
    status: string;
}

function Approved() {
  const [approvedPayments, setApprovedPayments] = useState<ApprovedPayment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
    const approvePayment = async (id: number) => {
    try {
      // await axios.put(`/api/deactivate/${id}`, { status: 'Inactive' }); // ❌ Disabled for mock
      setApprovedPayments((prev) => prev.filter((pay) => pay.id !== id));
    } catch (err) {
      console.error('Error rejecting payment:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 textColorless">{t('approvedPayments')}</h2>
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
          <thead className="table-success sticky-top">
            <tr>
              <th>{t('paymentID')}</th>
              <th>{t('amount')}</th>
              <th>{t('type')}</th>
              <th>{t('date')}</th>
              <th>{t('status')}</th>
              <th>{t('action')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center">
                  {t('loading')}
                </td>
              </tr>
            ) : approvedPayments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  {t('noApprovedPayments')}
                </td>
              </tr>
            ) : (
              approvedPayments.map((pay) => (
                <tr key={pay.id}>
                  <td>{pay.id}</td>
                  <td>{pay.amount}</td>
                  <td>{pay.type}</td>
                  <td>{pay.date}</td>
                  <td>{pay.status}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => approvePayment(pay.id)}
                    >
                      {t('reject')}
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

export default Approved;
