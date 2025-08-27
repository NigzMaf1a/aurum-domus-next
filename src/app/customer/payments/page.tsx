'use client';

import { useEffect, useState, useMemo } from 'react';
import { payments } from '@/utilscripts/payments';

//interfaces
import Payment from '@/interfaces/payment';

//components
import Skeleton from '@/components/containers/Skeleton';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicInput from '@/components/inputs/DynamicInput';
import PaymentItem from '@/components/cards/payments/customer/PaymentItem';

export default function CustomerPaymentsPage() {
  const [disPayments, setDisPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPar, setSearchPar] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDisPayments(payments);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtered payments with memoization for performance
  const filteredPayments = useMemo(() => {
    const query = searchPar.trim().toLowerCase();
    if (!query) return disPayments;

    return disPayments.filter((pay) => {
      return (
        pay.Name1.toLowerCase().includes(query) ||
        pay.Name2.toLowerCase().includes(query) ||
        pay.PaymentType.toLowerCase().includes(query) ||
        pay.PaymentAmount.toString().includes(query) ||
        pay.PaymentDate.toLowerCase().includes(query)
      );
    });
  }, [searchPar, disPayments]);

  return (
    <Skeleton className="py-5">
      <h2 className="text-center mb-4 textColorless">Customer Payments</h2>

      {/* Search Input */}
      <DynamicInput
        value={searchPar}
        onChange={setSearchPar}
        placeholder="Search payment"
        className="col-12 col-sm-6 col-md-6 col-lg-12"
      />

      {loading ? (
        <DynamicDiv className="text-center mt-3">
          <div className="spinner-border text-primary" role="status" />
        </DynamicDiv>
      ) : (
        <DynamicDiv
          style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '10px' }}
        >
          {filteredPayments.length > 0 ? (
            filteredPayments.map((pay) => (
              <PaymentItem key={pay.PaymentID} pay={pay} />
            ))
          ) : (
            <p className="text-center text-muted w-100">
              No payments found.
            </p>
          )}
        </DynamicDiv>
      )}
    </Skeleton>
  );
}
