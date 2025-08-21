"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

//components
import AddPayForm from '@/components/forms/AddPayForm';

export default function AddPayment() {
  const { t } = useTranslation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted");
    // Add logic here
    toast.success(t("paymentAddedSuccess"));
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <AddPayForm submit={()=>handleSubmit}/>
    </div>
  );
}
