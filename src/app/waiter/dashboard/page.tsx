"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

//components
import Skeleton from "../../../components/containers/Skeleton";
import DashCard from "@/components/cards/DashCard";
import Stats from "@/components/general/Stats";
import DashTab from "@/components/table/DashTab";
import DynamicDiv from "@/components/containers/DynamicDiv";
import { Bar, Pie } from "@/components/general/Stats";

//interfaces
import User from "@/interfaces/user";
import Order from "@/interfaces/order";
import Reservation from "@/interfaces/reservation";

//scripts
import Waiter from "@/scripts/classes/waiter";

export default function Dashboard() {
  const [waiter, setWaiter] = useState<Waiter>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const router = useRouter();

  // mock chart data
  const barChart: Bar = {
    labels: { label1: "Q1 Sales", label2: "Q2 Sales" },
    values: { value1: 150, value2: 200 },
  };
  const pieChart: Pie = {
    labels: { label1: "Online Sales", label2: "In-store Sales" },
    values: { value1: 65, value2: 35 },
  };
  const tableData = [
    { id: 1, name: "John Doe", age: 28, role: "Manager", dept: "Sales", salary: 60000, status: "Active" },
    { id: 2, name: "Jane Smith", age: 34, role: "Engineer", dept: "Tech", salary: 75000, status: "Active" },
    { id: 3, name: "Sam Brown", age: 41, role: "Designer", dept: "UI/UX", salary: 50000, status: "Inactive" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;

    if (!token) {
      router.push("/login");
      return;
    }

    if (user) {
      const w = new Waiter(user.RegID);
      setWaiter(w);
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      if (waiter) {
        try {
          const allOrders = await waiter.getOrders(1);
          const allReservations = await waiter.getReservations(1);
          console.log('All reservations:', allReservations);
          setOrders(allOrders || []);
          setReservations(allReservations || []);
        } catch (err) {
          console.error("Failed to fetch orders:", err);
        }
      }
    })();
  }, [waiter]);

  // filter pending orders
  const pendingOrders = useMemo(() => {
    return orders.filter(
      (order) => order.Served?.toLowerCase().trim() === "no"
    );
  }, [orders]);

  return (
    <Skeleton>
      <h1 className="mb-4 textColorless">Dashboard</h1>

      <DynamicDiv
        className="
          d-flex flex-column flex-lg-row  
          gap-3                       
          w-100                        
          mb-1
        "
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        {pendingOrders.length > 0 ? (
          pendingOrders.map((order) => (
            <DashCard
              key={order.OrderID}
              head={`Dish: ${order.DishName}`}
              p1={`Dish Price: Kshs ${order.DishPrice}`}
              p2={`Order Price: Kshs ${order.OrderPrice}`}
              p3={`Date: ${order.OrderDate}`}
            />
          ))
        ) : (
          <DashCard head={"No current orders"} p1={"Now"} p2={"Next"} p3={"After"} />
        )}
      </DynamicDiv>

      <Stats bar={barChart} pie={pieChart} />

      <DashTab
        data={reservations}
        columns={['ReservationID', 'OrderID', 'DishName', 'OrderPrice', 'Plates', 'ReservationDate', 'ReservationTime','ReservationStatus']}
        columnNames={[
          "Res ID",
          "Order ID",
          "Dish Name",
          "Price",
          "Plates",
          "Date",
          "Time",
          "Status",
        ]}
      />
    </Skeleton>
  );
}
