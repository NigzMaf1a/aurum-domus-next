"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// Components
import Skeleton from "../../../components/containers/Skeleton";
import DashCard from "@/components/cards/DashCard";
import Stats, { Bar, Pie } from "@/components/general/Stats";
import DashTab from "@/components/table/DashTab";
import DynamicDiv from "@/components/containers/DynamicDiv";
import MinorDetails from "@/components/containers/MinorDetails";
import DynamicP from "@/components/p/DynamicP";
import FleshVert from "@/components/containers/FleshVert";

// Scripts
import User from "@/interfaces/user";
import Admin from "@/scripts/classes/admin";
import filterUsersByAccess from "@/scripts/utilz/filterUsersByAccess";
import Hotel from "@/interfaces/hotel";
import Unit from "@/interfaces/unit";

export default function Dashboard() {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [newStaff, setNewStaff] = useState<User[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

  // Chart and table data
  // const barChart: Bar = {
  //   labels: { label1: "Q1 Sales", label2: "Q2 Sales" },
  //   values: { value1: 150, value2: 200 },
  // };

  // Load all users on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;

    if (!token) {
      router.push("/login");
      return;
    }

    (async () => {
      if (user) {
        const admin = new Admin(user.RegID);
        const users = await admin.getUsers();
        const payments = await admin.getPayments();
        const feedback = await admin.getFeedback();
        const allHotels = await admin.getHotels();
        const allUnits = await admin.getUnits();
        console.log("Loaded users:", users);
        console.log("Loaded payments:", payments);
        console.log("Loaded feedback:", feedback);
        setAllUsers(users);
        setHotels(allHotels);
        setUnits(allUnits);
      }
    })();
  }, [router]);

  useEffect(() => {
    if (!allUsers || allUsers.length === 0) return;

    const processStaff = async () => {
      const allStaff = allUsers.filter(
        (user) =>
          user.RegType !== "Admin" &&
          user.RegType !== "Customer" &&
          user.RegType !== "Owner" &&
          user.RegType !== "Supplier"
      );

      const accessedToday = filterUsersByAccess(allStaff, "week");
      console.log("Accessed today:", accessedToday);

      // Set only filtered staff
      setNewStaff(accessedToday);
    };

    processStaff();
  }, [allUsers]);

  const pieChart:Pie = useMemo(()=>{
    const customers = allUsers.filter((user) => user.RegType?.toLowerCase().trim() === 'customer');
    const staff = allUsers.filter((user)=> user.RegType?.toLowerCase().trim() !== 'admin' && 
                                           user.RegType?.toLowerCase().trim() !== 'manager' &&
                                           user.RegType?.toLowerCase().trim() !== 'supplier'
    )

    const totalVal = (customers.length + staff.length);
    const custVal = (customers.length/totalVal)*100;
    const staffVal = (staff.length/totalVal)*100;
    return {
      labels: {label1:'Customers', label2:'Staff'},
      values:{value1:custVal, value2:staffVal}
    }
  }, [allUsers]);
  
  const barChart:Bar = useMemo(()=>{
    const hotelNumber = hotels.length;
    const unitNumber = units.length;
    const total = hotelNumber + unitNumber;
    const hotelValue = (hotelNumber/total)*100;
    const unitValue = (unitNumber/total)*100;
    return {
      labels:{label1:'Hotels', label2:'Units'},
      values:{value1:hotelValue, value2:unitValue}
    };
  }, [hotels, units]);



  return (
    <Skeleton>
      <h1 className="mb-4 textColorless">Dashboard</h1>

      {newStaff.length > 0 &&
        <FleshVert
          style={{ height: "200px", marginBottom: "20px", overflowY: "auto" }}
          className="border bg-white py-2 px-2"
        >
          {newStaff.length > 0 && (
            newStaff.map((staff) => (
              <MinorDetails
                key={staff.RegID}
                src={typeof staff.UserImage === "string" ? staff.UserImage : "/aurum1.jpg"}
                label1="First Name:"
                label2="Second Name:"
                text1={staff.Name1 || "N/A"}
                text2={staff.Name2 || "N/A"}
                style={{ height: "80px" }}
              >
                <DynamicP text={staff.RegType} 
                          className="text-white" 
                          style={{fontSize:'12px'}}
                />
              </MinorDetails>
            ))
          )}
        </FleshVert>
      }

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
        {allUsers.length > 0 ? (allUsers.map((user)=> <DashCard key={user.RegID} 
                                                                head={user.Email} 
                                                                p1={`${user.Name1} ${user.Name2}`}
                                                                p2={user.RegType}
                                                                p3={user.accStatus}
                                                      />
                               )) : 
                               (<DashCard head="Owners" p1="Now" p2="Next" p3="After" />)}
      </DynamicDiv>


      <Stats bar={barChart} barTitle='Hotels : Units' pie={pieChart} pieTitle='Customers : Staff' />

      <DashTab
        data={allUsers}
        columns={["RegID", "Name1", "Name2", "PhoneNo", "Gender", "RegType", "accStatus"]}
        columnNames={["ID", "First Name", "Sec Name", "Phone", "Gender", "Reg Type", "Acc Status"]}
      />
    </Skeleton>
  );
}
