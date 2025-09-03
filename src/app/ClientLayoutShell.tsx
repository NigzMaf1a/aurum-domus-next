"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/sections/Header";
import { startColorChange } from "../utilscripts/colorChange";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

// services
import { readUsers } from "@/scripts/api/user";

// interfaces
import User from "../interfaces/user";

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const storedUser: User | null = userString ? JSON.parse(userString) : null;

    // redirect to login if no token
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const users = await readUsers();
        if (storedUser?.RegID) {
          const matchedUser = users.find(
            (u: User) => u.RegID === storedUser.RegID
          );
          setCurrentUser(matchedUser || null);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    startColorChange();
  }, []);

  return (
    <>
      <Header user={currentUser} />
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
