"use client";
import React from 'react';

//components
import DashCard from '@/components/cards/DashCard';
import Strip from '@/components/general/Strip';
import Stats from '@/components/general/Stats';

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
        <Stats bar={barChart} 
               pie={pieChart}
        />
    </div>
  );
}
