import React from 'react';

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import LabelledP from '@/components/p/LabelledP';
import ButtonP1 from '@/components/buttonp/ButtonP1';

interface OwnerPaymentDetailsProps{
    unitID:number;
    orderID:number;
    name1:string;
    name2:string;
    paymentType:string;
    paymentAmount:number;
    paymentDate:string;
    paymentTime:string;
    callback:()=>void;
}

function OwnerPaymentDetails({unitID, orderID, name1, name2, paymentType, paymentAmount, paymentDate, paymentTime, callback}:OwnerPaymentDetailsProps) {
  return (
    <DynamicDiv style={{width:'300px', height:'400px', backgroundColor:'#EDDA74'}}>
        <ButtonP1 text={"X"} callback={callback} style={{marginRight:'10px'}}/>
        <DynamicDiv className='px-3 gap-4'>
            <LabelledP label={"Unit ID"} text={unitID}/>
            <LabelledP label={"OrderID"} text={orderID}/>
            <LabelledP label={"Full Name"} text={`${name1} ${name2}`}/>
            <LabelledP label={"Type"} text={paymentType}/>
            <LabelledP label={"Amount"} text={paymentAmount}/>
            <LabelledP label={"Date"} text={paymentDate}/>
            <LabelledP label={"Time"} text={paymentTime}/>
        </DynamicDiv>
    </DynamicDiv>
  )
}

export default OwnerPaymentDetails