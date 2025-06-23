import React from 'react';
import AdminNav from '@/components/navs/AdminNav';
import ManagerNav from '@/components/navs/ManagerNav';
import CustomerNav from '@/components/navs/CustomerNav';


interface User {
  RegID: number;
  Name1: string;
  Name2: string;
  PhoneNo: number;
  Email: string;
  Gender: "Male" | "Female";
  RegType: "Customer" | "Manager" | "Admin";
  accStatus: "Pending" | "Approved" | "Inactive";
}

interface HeaderProps {
  user?: User;
}

export default function Header({ user }: HeaderProps) {
  const renderNav = () => {
    switch (user?.RegType) {
      case "Admin":
        return <AdminNav />;
      case "Manager":
        return <ManagerNav />;
      case "Customer":
        return <CustomerNav />;
    }
  };

  return (
    <header className="fixed-top shadow-sm top-strip" id="top-strip">
      <div className="container py-3 text-center text-white bg-dark">
        <h2 className="m-0">Aurum Domus ✨</h2>
      </div>
      {renderNav()}
    </header>
  );
}
