"use client";
import React, {useState} from 'react';

//components
import Skeleton from '@/components/containers/Skeleton';
import FleshVert from '@/components/containers/FleshVert';
import Ribz from '@/components/containers/Ribz';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicButton from '@/components/buttons/DynamicButton';
import DynamicHead from '@/components/h/DynamicHead';
import DynamicInput from '@/components/inputs/DynamicInput';
import SupplyItem from '@/components/cards/supplies/SupplyItem';

export default function Supplies() {
    const [showModal, setShowModal] = useState(false);
    const [searchPar, setSearchPar] = useState("");
    function openModal(){
        setShowModal(true)
    }
    function closeModal(){
        setShowModal(true)
    }
  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">Supplies</h1>
        <FleshVert>
          <Ribz className='d-flex flex-row justify-content-between justify-content-center' style={{height:'100px', backgroundColor:'#25383C'}}>
            <DynamicDiv className='d-flex flex-column justify-content-center'>
              <DynamicHead text={"Add New Supply"} className='text-center' style={{marginLeft:'20px'}}/>
            </DynamicDiv>
            <DynamicDiv className='d-flex flex-column justify-content-center' style={{width:'100px', height:'100px'}}>
              <DynamicButton label='Add' onClick={openModal} style={{width:'50px', height:'30px', backgroundColor:'#AF7817'}}/>
            </DynamicDiv>
          </Ribz>
          <DynamicDiv className='d-flex flex-column gap-2 bg-light px-2 py-2'
                      style={{backgroundColor:'#46C7C7', maxHeight:'400px'}}
          >
            <DynamicInput value={searchPar}
                          onChange={setSearchPar}
                          placeholder='Search supplies'
                          type='text'
            />
            <DynamicDiv className='d-flex flex-column gap-2'>
                <SupplyItem name='Unga' price={670} available='Available' quantity={8} image={"/aurum1.jpg"}/>
                <SupplyItem name='Unga' price={670} available='Available' quantity={8} image={"/aurum2.jpg"}/>
                <SupplyItem name='Unga' price={670} available='Available' quantity={8} image={"/aurum3.jpg"}/>
                <SupplyItem name='Unga' price={670} available='Available' quantity={8} image={"/aurum4.jpg"}/>
            </DynamicDiv>
          </DynamicDiv>
          {showModal && <div></div>}
        </FleshVert>
    </Skeleton>
  );
}

