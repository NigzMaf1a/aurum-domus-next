"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Skeleton from "../../../components/containers/Skeleton";
import DynamicInput from "@/components/inputs/DynamicInput";
import Ribz from "@/components/containers/Ribz";
import PaymentItem from "@/components/cards/payments/customer/PaymentItem";
import NoteOne from "@/components/notes/NoteOne";

// Scripts
import User from "@/interfaces/user";
import Payment from "@/interfaces/payment";
import Admin from "@/scripts/classes/admin";

export default function Dashboard() {
  const [searchPar, setSearchPar] = useState('');
  const [customerPayments, setCustomerPayments] = useState<Payment[]>([]);
  const router = useRouter();

  // Load all users on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;

    if (!token) {
      router.push("/login");
      return;
    }

    (async () => {
      if (user) {
        const admin = new Admin(user.RegID);
        const payments = await admin.getPayments();
        console.log("Loaded Payments:", payments);
        setCustomerPayments(payments);
      }
    })();
  }, [router]);


  return (
    <Skeleton>
      <h1 className="mb-4 textColorless">Dashboard</h1>
      <DynamicInput value={searchPar}
                    onChange={setSearchPar}
                    className="col-12"
      />
      <Ribz style={{backgroundColor:'#FFFFFF'}}
            className="mt-2"
      >
        {customerPayments.length > 0 ? (customerPayments.map((pay)=> <PaymentItem key={pay.PaymentID} pay={pay}/>)) : (<NoteOne text={'No payments found'}/>)}
      </Ribz>
    </Skeleton>
  );
}
