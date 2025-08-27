import React, {useState} from 'react';

//interfaces
import Reservation from '@/interfaces/reservation';

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import GlobalModal from '@/components/modals/GlobalModal';
import FleshHor from '@/components/containers/FleshHor';
import RoundedImage from '@/components/images/RoundedImage';
import LabelledP from '@/components/p/LabelledP';
import ReservationDetails from './ReservationDetails';
import DynamicP from '@/components/p/DynamicP';

export default function ReservationItem({res}:{res:Reservation}) {
    const [showModal, setShowModal] = useState(false);

    function openModal(){
        setShowModal(true);
    }

    function closeModal(){
        setShowModal(false);
    } 

  return (
        <DynamicDiv className="card shadow-sm my-1 mx-1">
            <FleshHor style={{cursor:'pointer', height:'70px'}} onClick={openModal}>
                <DynamicDiv style={{marginLeft:'10px'}} className='d-flex flex-row justify-content-center align-items-center'>
                    <RoundedImage src={res.Image} style={{width:'50px', height:'50px'}}/>
                    <DynamicDiv className='d-flex flex-row justify-content-between align-items-center'>
                      <DynamicDiv className='d-flex flex-column'>
                        <LabelledP label={"Dish Name:"} text={res.DishName}/>
                        <LabelledP label={"Order Price"} text={res.OrderPrice}/>
                      </DynamicDiv>
                      <DynamicDiv style={{height:'30px', width:'70px'}}>
                        <DynamicP text={res.ReservationStatus} className='m-0'/>
                      </DynamicDiv>
                    </DynamicDiv>
                </DynamicDiv>

                {/* <h2 className="fs-5">Res ID: {res.ReservationID}</h2>
                <h3 className="fs-6">Unit: {res.UnitID}</h3>
                <h4 className="fs-6">Table: {res.TableID}</h4>
                <p>Dish: {res.DishName}</p>
                <p>Plates: {res.Plates}</p>
                <p>Price: {res.OrderPrice.toFixed(2)}</p>
                <p>
                      Status:{' '}
                      <span className={res.PaymentStatus === 'Paid' ? 'text-success' : 'text-danger'}>
                        {res.PaymentStatus}
                      </span>
                </p>
                <p>
                      Date/Time: {res.ReservationDate} {res.ReservationTime}
                </p> */}
                {showModal && (<GlobalModal>
                                    <ReservationDetails res={res} callback={closeModal}/>
                               </GlobalModal>)
                }
            </FleshHor>
        </DynamicDiv>
  )
}

