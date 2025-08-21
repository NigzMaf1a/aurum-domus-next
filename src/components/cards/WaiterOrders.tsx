import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

//Interfaces
import Order from '@/interfaces/order';
export interface Props{
    orderz:Order[];
    callback:(orderID:number)=>void;
}

export default function WaiterOrders({props}:{props:Props}) {
  const {t} = useTranslation();
  return (
    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <div className="row g-3">
          {props.orderz.map(order => (
            <div key={order.OrderID} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>{t('orderId')}: {order.OrderID}</h5>
                  <h6>{t('dishID')}: {order.DishID}</h6>
                  <p><strong>{t('dishName')}:</strong> {order.DishName}</p>
                  <p><strong>{t('dishPrice')}:</strong> KES {order.DishPrice.toFixed(2)}</p>
                  <p><strong>{t('plates')}:</strong> {order.Plates}</p>
                  <p><strong>{t('orderPrice')}:</strong> KES {order.OrderPrice.toFixed(2)}</p>
                  <p><strong>{t('description')}:</strong> {order.OrderDescription}</p>
                  <p><strong>{t('date')}:</strong> {order.OrderDate} at {order.OrderTime}</p>
                  <p><strong>{t('payStatus')}:</strong> {order.PaymentStatus}</p>
                  <Button
                    variant={order.Served === 'YES' ? 'success' : 'warning'}
                    disabled={order.Served === 'YES'}
                    onClick={() => order.Served === 'NO' && props.callback(order.OrderID)}
                  >
                    {order.Served === 'YES' ? 'Served' : 'Mark as Served'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}