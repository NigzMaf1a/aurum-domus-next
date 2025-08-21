'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import mockOrders from '../../../utilscripts/mockOrders.json';

//components
import WaiterOrders from '@/components/cards/WaiterOrders';
import Skeleton from '@/components/containers/Skeleton';

//interfaces
import Order from '../../../interfaces/order';
import { Props } from '../../../components/cards/WaiterOrders';

export default function WaiterOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { t } = useTranslation();

  const fetchOrders = async () => {
    setOrders(mockOrders as Order[]);
  };

  const markAsServed = async (orderId: number) => {
    setOrders(prev =>
      prev.map(o => (o.OrderID === orderId ? { ...o, Served: 'YES' } : o))
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const propsObject: Props = {
    orderz:orders,     
    callback: markAsServed 
  };

  return (
    <Skeleton>
      <h2 className="text-center mb-4 textColorless">{t('managerOrders')}</h2>
      <WaiterOrders props={propsObject}/>
    </Skeleton>
  );
}
