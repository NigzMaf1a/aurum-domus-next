"use client";

import React, { useEffect } from "react";
import Header from "@/components/sections/Header";
import { startColorChange } from "../utilscripts/colorChange";
//import { startThemeCycle } from "../utilscripts/themeSwitcher";
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
  }, []);

  // Mock user
  const mockUser: User = {
    RegID: 2,
    Name1: "Nigel",
    Name2: "Khasiani",
    PhoneNo: 759736096,
    Email: "manager@gmail.com",
    Gender: "Male",
    RegType: "Manager",
    accStatus: "Approved",
    image: "/aurum-domus/public/aurum13.jpg"
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
