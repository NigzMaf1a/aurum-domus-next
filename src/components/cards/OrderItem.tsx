import React, {useState} from 'react';
import Order from '@/interfaces/order';

//components
import OrderModal from '../modals/OrderModal';

export default function OrderItem({OrderID, DishName, Plates, OrderPrice, OrderDescription, OrderDate, OrderTime, PaymentStatus, Served}:Order) {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(false);
  return (
    <div key={OrderID} className="col-12" onClick={()=> setShowModal(true)}>
        <div className="card">
            <div className="card-body">
              <h5>Order ID: {OrderID}</h5>
              <div className='d-flex flex-row'>
                <div className='d-flex flex-column'>
                  <p><strong>Dish:</strong> {DishName} ({Plates} plates)</p>
                  <p><strong>Description:</strong> {OrderDescription}</p>
                  <p><strong>Payment:</strong> {PaymentStatus} | <strong>Served:</strong> {Served}</p>
                </div>
                <div className='ms-3 d-flex flex-column'>
                  <p><strong>Price:</strong> KES {OrderPrice.toFixed(2)}</p>
                  <p><strong>Date:</strong> {OrderDate} at {OrderTime}</p>
                </div>
              </div>            
            </div>
            {showModal && 
              <div 
                className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
                onClick={()=>handleClick()}
              >
                <div onClick={e => e.stopPropagation()}> 
                  <OrderModal callback={()=>handleClick()}/>
                </div>
              </div>
            }
        </div>
    </div>
  )
}