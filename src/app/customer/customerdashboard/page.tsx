import React from 'react';
import CustDash from '@/components/cards/CustDash';

export default function Dashboard() {
  return (
    <div className="container mt-4">
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <div className="row" id="cardCont">

            {/* Card 1 */}
            <CustDash head={"Reservations"} p1={"Now"} p2={"Next"} p3={"After"}/>

            {/* Card 2 */}
            <CustDash head={"Reservations"} p1={"Now"} p2={"Next"} p3={"After"}/>

            {/* Card 3 */}
            <CustDash head={"Reservations"} p1={"Now"} p2={"Next"} p3={"After"}/>

            {/* Card 4 */}
            <CustDash head={"Reservations"} p1={"Now"} p2={"Next"} p3={"After"}/>

        </div>
    </div>
  );
}
