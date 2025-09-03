import React, {useState} from 'react';

//interfaces
import Payment from '@/interfaces/payment';

//components
import FleshHor from '@/components/containers/FleshHor';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicP from '@/components/p/DynamicP';
import LabelledP from '@/components/p/LabelledP';
import GlobalModal from '@/components/modals/GlobalModal';
import OwnerPaymentDetails from '../owner/OwnerPaymentDetails';

export default function PaymentItem({pay}:{pay:Payment}) {
  const [showModal, setShowModal] = useState(false);
  function openModal(){
    setShowModal(true);
  }
  function closeModal(){
    setShowModal(false);
  }
  return (
    <>
      <FleshHor style={{height:'70px', paddingTop:'5px'}} 
                className='d-flex flex-row justify-content-between align-items-center bg-light rounded py-1 border'
                onClick={openModal}
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
      {showModal && <GlobalModal>
                        <OwnerPaymentDetails callback={closeModal}
                                              name1={pay.Name1}
                                              name2={pay.Name2}
                                              paymentType={pay.PaymentType}
                                              paymentAmount={pay.PaymentAmount}
                                              paymentDate={pay.PaymentDate}
                                              paymentTime={pay.PaymentTime}
                                              unitID={pay.UnitID}
                                              orderID={pay.OrderID}
                        />
                    </GlobalModal>
      }
    </>
  )
}

