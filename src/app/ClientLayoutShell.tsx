"use client";

import React, { useEffect } from "react";
import Header from "@/components/sections/Header";
import { startColorChange } from "../utilscripts/colorChange";
import { startThemeCycle } from "../utilscripts/themeSwitcher";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// scripts/interfaces/enums
import User from "../interfaces/user";

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
    RegType: "Manager", // ← switch this to "Manager" or "Customer"
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
