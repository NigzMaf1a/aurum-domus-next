"use client";
import React, {useState} from 'react';

//components
import Skeleton from '@/components/containers/Skeleton';
import Strip from '@/components/general/Strip';
import FleshVert from '@/components/containers/FleshVert';
import DynamicInput from '@/components/inputs/DynamicInput';
import DynamicDiv from '@/components/containers/DynamicDiv';

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
            <DynamicDiv className='bg-light'>
                <div className='text-dark'>Blah Blah Blah</div>
            </DynamicDiv>
        </FleshVert>
    </Skeleton>
  );
}