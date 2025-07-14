"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

function AddPayment() {
  const { t } = useTranslation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted");
    // Add logic here
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4 text-center">{t('addPayment')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">{t('amount')}</label>
            <input type="number" id="amount" name="amount" required className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">{t('type')}</label>
            <input type="text" id="type" name="type" required className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">{t('date')}</label>
            <input type="date" id="date" name="date" placeholder="YYYY-MM-DD" required className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {t('addPayment')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPayment;
