'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


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
import { useRouter } from 'next/navigation';

export default function WaiterOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [waiter, setWaiter] = useState<Waiter | null>();
  const [searchPar, setSearchPar] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;

    if (!token) {
      router.push("/login");
      return;
    }

    if (user) {
      const w = new Waiter(user.RegID);
      setWaiter(w);
    }
  }, [router]);

  useEffect(()=>{
    (async ()=>{
    if(waiter){
      const allOrders = await waiter.getOrders(1);
      console.log('All orders:', allOrders);
      setOrders(allOrders);
    }
    })();
  }, [waiter]);



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
