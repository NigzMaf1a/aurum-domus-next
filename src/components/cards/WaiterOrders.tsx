import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


//components
import DynamicDiv from '../containers/DynamicDiv';
import WaiterOrderItem from '../WaiterOrderItem';
import NoteOne from '../notes/NoteOne';

//Interfaces
import Order from '@/interfaces/order';

export interface Props {
  orderz: Order[];
}

export default function WaiterOrders({ orderz }: Props) {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(()=>{
    if(orderz){
      (async ()=>{
        await setOrders(orderz);
        console.log(`Orders: ${orders}`);
      })();
    }
  }, [orderz, orders]);

  return (
    <DynamicDiv style={{ height: '400px', overflowY: 'auto', marginTop:'10px' }}>
      <DynamicDiv className="col-12 bg-white border gap-2 pb-2 px-2">
        {orderz.length === 0 ? (
          <NoteOne text="No current orders" />
        ) : (
          orderz.map((order) => (
            <WaiterOrderItem
              key={order.OrderID}
              order={order}
            />
          ))
        )}
      </DynamicDiv>
    </DynamicDiv>
  );
}
