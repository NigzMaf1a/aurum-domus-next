"use client";

import React, { useEffect } from "react";
import Header from "@/components/sections/Header";
import { startColorChange } from "./utilscripts/colorChange";
import { startThemeCycle } from "./utilscripts/themeSwitcher";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🧠 Interface for user roles
interface User {
  RegID: number;
  Name1: string;
  Name2: string;
  PhoneNo: number;
  Email: string;
  Gender: "Male" | "Female";
  RegType: "Customer" | "Manager" | "Admin" | "Accountant";
  accStatus: "Pending" | "Approved" | "Inactive";
}

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    startColorChange();
    startThemeCycle();
  }, []);

  // 🔐 Replace this with real session logic later
  const mockUser: User = {
    RegID: 1,
    Name1: "Nigel",
    Name2: "Aurum",
    PhoneNo: 123456789,
    Email: "nigel@aurumdomus.com",
    Gender: "Male",
    RegType: "Manager", // ← switch this to "Manager" or "Customer" to test
    accStatus: "Approved",
  };

  return (
    <>
      <Header user={mockUser} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main className="flex-grow-1">{children}</main>
    </>
  );
}
