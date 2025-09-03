'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

//mock data
import thisOrders from '@/utilscripts/orders';

//components
import WaiterOrders from '@/components/cards/WaiterOrders';
import Skeleton from '@/components/containers/Skeleton';
import DynamicInput from '@/components/inputs/DynamicInput';
import RoundedClickableDivOne from '@/components/containers/RoundedClickableDivOne';
import DynamicDiv from '@/components/containers/DynamicDiv';

//interfaces
import Order from '../../../interfaces/order';
import User from '@/interfaces/user';

//scripts
import Waiter from '@/scripts/classes/waiter';
import thisUnit from '@/scripts/utilz/thisUnit';

export default function WaiterOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [waiter, setWaiter] = useState<Waiter | null>();
  const [searchPar, setSearchPar] = useState('');
  const [currentUnitID, setCurrentUnitID] = useState<number>()
  const { t } = useTranslation();

  const fetchOrders = async () => {
    await setOrders(thisOrders as Order[]); 
  };


  useEffect(() => {
    (async () => {
      const rawUser = localStorage.getItem('user');
      const unitName:string = 'Skyline View';
      const unitID = await thisUnit(unitName);
      setCurrentUnitID(unitID);

      if (!rawUser) {
        console.warn('No user found in localStorage');
        return;
      }

      const user: User = JSON.parse(rawUser);

      const w = new Waiter(user.RegID);
      await setWaiter(w)
      console.log('Waiter instance created:', w);
    })();

    (async ()=>{
      if(currentUnitID && waiter){
        const realOrders = await waiter?.getOrders(currentUnitID);
        console.log(`Real orders: ${realOrders}`)
      }
    })();

    fetchOrders();
  });



  return (
    <Skeleton className='gap-3'>
      <h2 className="text-center mb-4 textColorless">{t('managerOrders')}</h2>
      <DynamicInput value={searchPar}
                    onChange={setSearchPar}
                    placeholder='Search orders: name, price....'
                    className='col-12'
      />

      <DynamicDiv className='d-flex flex-row align-items-center justify-content-between col-12 rounded-5 gap-2'
                  style={{height:'50px', marginTop:'10px'}}
      >
        <RoundedClickableDivOne label='Today'/>
        <RoundedClickableDivOne label='This Week'/>
        <RoundedClickableDivOne label='This Month'/>
      </DynamicDiv>

      <WaiterOrders orderz={orders}/>
    </Skeleton>
  );
}
