"use client";
import React, {useState} from 'react';

//components
import Skeleton from '@/components/containers/Skeleton';
import FleshVert from '@/components/containers/FleshVert';
import DynamicInput from '@/components/inputs/DynamicInput';
import DynamicDiv from '@/components/containers/DynamicDiv';
import GlobalModal from '@/components/modals/GlobalModal';
import Ribz from '@/components/containers/Ribz';
import DynamicHead from '@/components/h/DynamicHead';
import DynamicButton from '@/components/buttons/DynamicButton';
import NewHotelModal from '@/components/modals/NewHotelModal';

export default function Units() {
  const [searchUnits, setSearchUnits] = useState("");
  const [showModal, setShowModal] = useState(false);
  function openModal(){
    setShowModal(true);
  }
  function closeModal(){
    setShowModal(false);
  }
  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <FleshVert>
          <Ribz className='d-flex flex-row justify-content-between justify-content-center' style={{height:'100px', backgroundColor:'#25383C'}}>
            <DynamicDiv className='d-flex flex-column justify-content-center'>
              <DynamicHead text={"Add New Hotel"} className='text-center' style={{marginLeft:'20px'}}/>
            </DynamicDiv>
            <DynamicDiv className='d-flex flex-column justify-content-center' style={{width:'100px', height:'100px'}}>
              <DynamicButton label='Add' onClick={openModal} style={{width:'50px', height:'30px', backgroundColor:'#AF7817'}}/>
            </DynamicDiv>
          </Ribz>
          <DynamicInput type='text'
                        placeholder='Search units'
                        value={searchUnits}
                        onChange={()=>setSearchUnits}
                        className='bg-light'
          />
          <DynamicDiv className='bg-light'>
              <div className='text-dark'>Blah Blah Blah</div>
          </DynamicDiv>
          {showModal && <GlobalModal>
                            <NewHotelModal func={closeModal} />
                        </GlobalModal>
          }
        </FleshVert>
    </Skeleton>
  );
}