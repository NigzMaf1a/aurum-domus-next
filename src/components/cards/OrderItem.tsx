import React from 'react';
import Order from '@/interfaces/order';

export default function OrderItem({OrderID, DishName, Plates, OrderPrice, OrderDescription, OrderDate, OrderTime, PaymentStatus, Served}:Order) {
  return (
    <div key={OrderID} className="col-12">
        <div className="card">
            <div className="card-body">
                <h5>Order ID: {OrderID}</h5>
                <p><strong>Dish:</strong> {DishName} ({Plates} plates)</p>
                <p><strong>Price:</strong> KES {OrderPrice.toFixed(2)}</p>
                <p><strong>Description:</strong> {OrderDescription}</p>
                <p><strong>Date:</strong> {OrderDate} at {OrderTime}</p>
                <p><strong>Payment:</strong> {PaymentStatus} | <strong>Served:</strong> {Served}</p>
            </div>
        </div>
    </div>
  )
}