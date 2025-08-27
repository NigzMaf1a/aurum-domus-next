import React from 'react';

//interfaces
import Payment from '@/interfaces/payment';

//components
import FleshHor from '@/components/containers/FleshHor';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicP from '@/components/p/DynamicP';
import LabelledP from '@/components/p/LabelledP';

export default function PaymentItem({pay}:{pay:Payment}) {
  return (
    <FleshHor style={{height:'70px', paddingTop:'5px'}} 
              className='d-flex flex-row justify-content-between align-items-center bg-light rounded py-1 border'
    >
        <DynamicDiv className='ms-2'>
            <LabelledP label={"Amount:"} text={pay.PaymentAmount}/>
            <LabelledP label={"Date:"} text={pay.PaymentDate}/>
        </DynamicDiv>
        <DynamicDiv style={{backgroundColor:'#254117', width:'50px', height:'30px'}} 
                    className='d-flex flex-column justify-content-center align-items-center me-2'
        >
            <DynamicP text={pay.PaymentType} 
                      className='m-0 text-light'
                      style={{fontSize:'14px'}}
            />
        </DynamicDiv>
    </FleshHor>
  )
}

