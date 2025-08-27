"use client";
import React, {useState} from 'react';

//components
import Skeleton from '@/components/containers/Skeleton';
import Strip from '@/components/general/Strip';
import FleshVert from '@/components/containers/FleshVert';
import DynamicInput from '@/components/inputs/DynamicInput';
import DynamicDiv from '@/components/containers/DynamicDiv';
import OwnerPayment from '@/components/cards/payments/owner/OwnerPayment';

export default function Payments() {
  const [searchPay, setSearchPay] = useState("");
  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <Strip head={"Payments"} det={""}/>
        <FleshVert>
            <DynamicInput type='text'
                          placeholder='Search payments'
                          value={searchPay}
                          onChange={()=>setSearchPay}
                          className='bg-light'
            />
            <DynamicDiv className='d-flex flex-column gap-2 bg-light px-2 py-2'
                        style={{backgroundColor:'#46C7C7', maxHeight:'400px'}}
            >
                <OwnerPayment unitID={1} orderID={34} name1='Nigel' name2='Khasiani' paymentType='Cash' paymentAmount={5000} paymentDate='02/05/2025' paymentTime='01:00 PM'/>
            </DynamicDiv>
        </FleshVert>
    </Skeleton>
  );
}