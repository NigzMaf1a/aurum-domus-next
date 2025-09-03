import React from 'react';

//components
import Ribz from './containers/Ribz';
import DynamicDiv from './containers/DynamicDiv';
import RoundedImage from './images/RoundedImage';
import LabelledP from './p/LabelledP';

//interfaces
import Order from '@/interfaces/order';
import DynamicP from './p/DynamicP';

interface WaiterOrderItemProps{
    order:Order;
}

function WaiterOrderItem({order}:WaiterOrderItemProps) {
  return (
    <Ribz className='border'
          style={{height:'80px', marginTop:'10px'}}
    >
        <DynamicDiv className='d-flex flex-row align-items-center justify-content-between'>
            <DynamicDiv className='d-flex flex-row align-items-center justify-content-center ms-2'
                        style={{width:'300px'}}
            >
                <RoundedImage src={order.Image} style={{height:'50px', width:'50px'}}/>
                <DynamicDiv className='ms-2'>
                    <LabelledP label={'Dish Name:'} text={order.DishName}/>
                    <LabelledP label={'Price:'} text={order.DishPrice}/>
                </DynamicDiv>
            </DynamicDiv>
            <DynamicDiv style={{height:'30px', width:'50px'}}>
                <DynamicP text={order.PaymentStatus}/>
            </DynamicDiv>

        </DynamicDiv>
    </Ribz>
  )
}

export default WaiterOrderItem