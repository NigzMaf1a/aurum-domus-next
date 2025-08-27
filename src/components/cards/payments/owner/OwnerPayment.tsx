import React, {useState} from 'react';

//components
import Ribz from '../../../containers/Ribz';
import LabelledP from '../../../p/LabelledP';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicP from '@/components/p/DynamicP';
import OwnerPaymentDetails from './OwnerPaymentDetails';

interface OwnerPaymentProps{
    unitID:number;
    orderID:number;
    name1:string;
    name2:string;
    paymentType:string;
    paymentAmount:number;
    paymentDate:string;
    paymentTime:string;
}

export default function OwnerPayment({unitID, orderID, name1, name2, paymentType, paymentAmount, paymentDate, paymentTime}:OwnerPaymentProps) {
  const [showModal, setShowModal] = useState(false);
  function openModal(){
    setShowModal(true);
  }
  function closeModal(){
    setShowModal(false);
  }
  return (
    <Ribz className='justify-content-between align-items-center text-black border' 
          style={{height:'70px', cursor:'pointer', borderColor:'#000000'}}
          onClick={openModal}
    >
      <DynamicDiv style={{marginLeft:'10px'}}>
        <LabelledP label={"Full Name:"} text={`${name1} ${name2}`}/>
        <LabelledP label={"Amount:"} text={paymentAmount}/>
      </DynamicDiv>
      <DynamicDiv 
                  style={{width:'50px', height:'30px', backgroundColor:'#347C2C', marginRight:'10px'}}
      >
        <DynamicP text={paymentType} className='text-center text-white'/>
      </DynamicDiv>
      {showModal && <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                        <OwnerPaymentDetails unitID={unitID}
                                             orderID={orderID}
                                             name1={name1}
                                             name2={name2}
                                             paymentType={paymentType}
                                             paymentAmount={paymentAmount}
                                             paymentDate={paymentDate}
                                             paymentTime={paymentTime}
                                             callback={closeModal}
                        />
                    </div>
      }
    </Ribz>
  )
}