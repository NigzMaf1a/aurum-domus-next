import React, {useState} from 'react';
import Order from '@/interfaces/order';

//components
import DynamicDiv from '../containers/DynamicDiv';
import OrderModal from '../modals/OrderModal';
import GlobalModal from '../modals/GlobalModal';
import LabelledP from '../p/LabelledP';
import DynamicP from '../p/DynamicP';


export default function OrderItem({OrderID, DishName, DishPrice, Plates, OrderPrice, OrderDescription, OrderDate, OrderTime, PaymentStatus, Served, Image}:Order) {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(false);
  return (
    <DynamicDiv key={OrderID} className="col-12" onClick={()=> setShowModal(true)}>
        <DynamicDiv className="d-flex flex-row card justify-content-between align-items-center">
            <DynamicDiv className="card-body"> 
               <LabelledP label={"Dish Name:"} text={DishName}/>   
               <LabelledP label={"Plates:"} text={Plates}/>       
            </DynamicDiv>
            <DynamicDiv style={{width:'50px', height:'30px', backgroundColor:'#348781'}}
                        className='d-flex flex-column justify-content-center align-items-center me-2'
            >
               <DynamicP text={Served} className='m-0 text-light'/>
            </DynamicDiv>
        </DynamicDiv>
            {showModal && 
              (<GlobalModal>
                  <div onClick={()=>handleClick()}>
                    <div onClick={e => e.stopPropagation()}> 
                      <OrderModal name={DishName} 
                                  orderPrice={OrderPrice}
                                  price={DishPrice}
                                  date={OrderDate}
                                  time={OrderTime}
                                  plates={Plates}
                                  payment={PaymentStatus}
                                  served={Served}
                                  image={Image}
                                  callback={()=>handleClick()}
                      />
                    </div>
                  </div>
               </GlobalModal>
              )
            }
    </DynamicDiv>
  )
}