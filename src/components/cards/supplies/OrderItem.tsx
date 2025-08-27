import React, {useState} from 'react';

//components
import DynamicP from '@/components/p/DynamicP';
import DynamicDiv from '@/components/containers/DynamicDiv';
import LabelledP from '@/components/p/LabelledP';
import FleshHor from '@/components/containers/FleshHor';
import RoundedImage from '@/components/images/RoundedImage';
import GlobalModal from '@/components/modals/GlobalModal';

interface SupplyItemProps{
    name:string;
    price:number;
    quantity:number;
    payment:string;
    image:File;
    date:string;
    time:string;
}

export default function SupplyItem({name, price, available, quantity,image}:SupplyItemProps) {
    const [showModal, setShowModal] = useState(false);
    function openModal(){
        setShowModal(true);
    }
    function closeModal(){
        setShowModal(false);
    }
  return (
    <div>
        <FleshHor style={{cursor:'pointer', height:'70px'}} className='justify-content-between align-items-center border'
                  onClick={openModal}
        >
            <DynamicDiv style={{marginLeft:'10px'}} className='d-flex flex-row justify-content-center align-items-center'>
                <RoundedImage src={image} style={{width:'50px', height:'50px'}}/>
                <DynamicDiv className='d-flex flex-column ms-3'>
                    <LabelledP label={"Supply Name:"} text={name}/>
                    <LabelledP label={"Price:"} text={`Kshs ${price}`}/>
                </DynamicDiv>
            </DynamicDiv>
            <DynamicDiv className='d-flex align-items-center justify-content-center bg-success'
                        style={{width:'50px', height:'30px', marginRight:'10px'}}
            >
                <DynamicP text={`${available}`} className='text-light m-0' style={{fontSize:'12px'}}/>
            </DynamicDiv>
        </FleshHor>
        {showModal && (<GlobalModal>
                       </GlobalModal>)
        }
    </div>
  )
}

