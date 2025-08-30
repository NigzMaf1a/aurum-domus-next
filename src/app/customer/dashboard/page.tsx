"use client";
import React, {useEffect} from 'react';
import { useRouter } from 'next/navigation';

//components
import Skeleton from '../../../components/containers/Skeleton';
import DashCard from '@/components/cards/DashCard';
import Strip from '@/components/general/Strip';
import Stats from '@/components/general/Stats';
import DashTab from '@/components/table/DashTab';
import { Bar } from '@/components/general/Stats';
import {Pie} from '@/components/general/Stats';

//interfaces
import User from '@/interfaces/user';

//scripts
import getUnits from '@/scripts/api/getUnits';
import thisUnit from '@/scripts/utilz/thisUnit';

//class import
import Customer from '@/scripts/classes/customer';


export default function Dashboard() {

  const router = useRouter();

  useEffect(()=>{
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const unitName = localStorage.getItem("unit");
    console.log(`User String: ${userString} Token:${token}, Unit Name:${unitName}`);
    const user:User = userString ? JSON.parse(userString) : null;
    const customer = new Customer(user.RegID);
    if(!token) router.push('/login');
  },[router]);

  const barChart: Bar = {
  labels: {
    label1: "",
    label2: ""
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
    value1: 65,
    value2: 35
  }
};
const tableData = [
  { id: 1, name: "John Doe", age: 28, role: "Manager", dept: "Sales", salary: 60000, status: "Active" },
  { id: 2, name: "Jane Smith", age: 34, role: "Engineer", dept: "Tech", salary: 75000, status: "Active" },
  { id: 3, name: "Sam Brown", age: 41, role: "Designer", dept: "UI/UX", salary: 50000, status: "Inactive" },
];

  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <Strip head='Dashboard' det={"today"}/>
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
               barTitle='Sales'
               pieTitle='Bar Sales'
        />
        <DashTab
          data={tableData}
          columns={["id", "name", "age", "role", "dept", "salary", "status"]}
          columnNames={["ID", "Full Name", "Age", "Job Role", "Department", "Salary ($)", "Status"]}
        />
    </Skeleton>
  );
}
