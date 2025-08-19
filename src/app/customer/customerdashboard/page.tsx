"use client";
import React from 'react';

//components
import DashCard from '@/components/cards/DashCard';
import Strip from '@/components/general/Strip';
import Stats from '@/components/general/Stats';
import DashTab from '@/components/table/DashTab';

//interfaces
import { Bar } from '@/components/general/Stats';
import {Pie} from '@/components/general/Stats';


export default function Dashboard() {
  const barChart: Bar = {
  labels: {
    label1: "Q1 Sales",
    label2: "Q2 Sales"
  },
  values: {
    value1: 150,
    value2: 200
  }
};
const pieChart: Pie = {
  labels: {
    label1: "Online Sales",
    label2: "In-store Sales"
  },
  values: {
    value1: 65,  // percentage
    value2: 35
  }
};
const tableData = [
  { id: 1, name: "John Doe", age: 28, role: "Manager", dept: "Sales", salary: 60000, status: "Active" },
  { id: 2, name: "Jane Smith", age: 34, role: "Engineer", dept: "Tech", salary: 75000, status: "Active" },
  { id: 3, name: "Sam Brown", age: 41, role: "Designer", dept: "UI/UX", salary: 50000, status: "Inactive" },
];

  return (
    <div className="container mt-4 min-vh-100">
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <Strip head='Trialz' det={"today"}/>
        <div className="row mb-1" id="cardCont">

            {/* Card 1 */}
            <DashCard head={"Reservations"} p1={"Now"} p2={"Next"} p3={"After"}/>

            {/* Card 2 */}
            <DashCard head={"Reservations"} p1={"Now"} p2={"Next"} p3={"After"}/>

            {/* Card 3 */}
            <DashCard head={"Reservations"} p1={"Now"} p2={"Next"} p3={"After"}/>

            {/* Card 4 */}
            <DashCard head={"Reservations"} p1={"Now"} p2={"Next"} p3={"After"}/>

        </div>
        <Stats bar={barChart} 
               pie={pieChart}
        />
        <DashTab
          data={tableData}
          columns={["id", "name", "age", "role", "dept", "salary", "status"]}
          columnNames={["ID", "Full Name", "Age", "Job Role", "Department", "Salary ($)", "Status"]}
        />
    </div>
  );
}
