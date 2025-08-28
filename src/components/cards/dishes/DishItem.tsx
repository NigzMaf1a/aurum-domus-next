import React, {useState} from 'react';

//interfaces
import Dish from '@/interfaces/dish';

//components
import Ribz from '@/components/containers/Ribz';
import DynamicDiv from '@/components/containers/DynamicDiv';
import GlobalModal from '@/components/modals/GlobalModal';
import DishDetails from './DishDetails';
import RoundedImage from '@/components/images/RoundedImage';
import LabelledP from '@/components/p/LabelledP';
import DynamicP from '@/components/p/DynamicP';

export default function DishItem({dish}:{dish:Dish}) {
    const [showModal, setShowModal] =useState<boolean>(false);
    function openModal(){
        setShowModal(true);
    }
    function closeModal(){
        setShowModal(false);
    }
  return (
    <Ribz style={{height:'70px', backgroundColor:'#FFFFFF', cursor:'pointer'}}
          className='justify-content-between align-items-center border my-1'
          onClick={openModal}
    >
        <DynamicDiv className='d-flex flex-row align-items-center ms-2'>
            <RoundedImage src={dish.DishImage}
                          style={{width:'50px', height:'50px'}}
            />
            <DynamicDiv className='d-flex flex-column ms-1'>
                <LabelledP label={"Dish Name:"} text={dish.DishName}/>
                <LabelledP label={"Dish Price:"} text={dish.DishPrice}/>
            </DynamicDiv>
        </DynamicDiv>
        <DynamicDiv className='d-flex flex-column justify-content-center align-items-center me-2'
                    style={{backgroundColor:'#347C17', height:'30px', width:'40px'}}
        >
            <DynamicP text={dish.Available} className='text-white' style={{fontSize:'12px'}}/>
        </DynamicDiv>
        {showModal && <GlobalModal>
                        <DishDetails dish={dish} callback={()=>closeModal}/>
                      </GlobalModal>
        }
    </Ribz>
  );
}