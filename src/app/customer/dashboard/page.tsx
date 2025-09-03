"use client";
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

//components
import Skeleton from '../../../components/containers/Skeleton';
import DashCard from '@/components/cards/DashCard';
import DynamicDiv from '@/components/containers/DynamicDiv';
import Stats from '@/components/general/Stats';
import DashTab from '@/components/table/DashTab';
import { Bar } from '@/components/general/Stats';
import {Pie} from '@/components/general/Stats';

//interfaces
import User from '@/interfaces/user';
import Order from '@/interfaces/order';

//scripts
import thisUnit from '@/scripts/utilz/thisUnit';

//class import
import Customer from '@/scripts/classes/customer';


export default function Dashboard() {

  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

useEffect(() => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user: User | null = userString ? JSON.parse(userString) : null;


  // Redirect if token is missing
  if (!token) {
    router.push('/login');
    return;
  }

  (async () => {
    if (user) {
      const unit = localStorage.getItem('unit');
      const unitID = await thisUnit(unit);
      console.log(`Unit: ${unitID}`);
      const customer = new Customer(user.RegID);

      if(unitID){
        const allOrders = await customer.getOrders(unitID);
        console.log(`Orders: ${allOrders}`);
        setOrders(allOrders);
      }
    }
  })();
}, [router]);

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
        <DynamicDiv
          className="
            d-flex flex-column flex-lg-row  
            gap-3                       
            w-100                        
            mb-1
          "
          style={{
            maxHeight: '300px',          
            overflowY: 'auto',            
            overflowX: 'auto'              
          }}
        >

          {orders.length > 0 ? (
            orders.map((order)=> <DashCard key={order.OrderID} head={"Reservations"} p1={"Now"} p2={"Next"} p3={"After"}/>)
          ) : (<DashCard head={"No orders yet"} p1={"Select Reservation"} p2={"Or"} p3={"Select order on the side menu"}/>)}

        </DynamicDiv>
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
