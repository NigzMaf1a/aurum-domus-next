"use client";
import React, {useState} from 'react';

//components
import Skeleton from '@/components/containers/Skeleton';
import FleshVert from '@/components/containers/FleshVert';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicInput from '@/components/inputs/DynamicInput';

export default function Orders() {
    const [searchPar, setSearchPar] = useState('');
  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">Supplies</h1>
        <FleshVert>
          <DynamicDiv className='d-flex flex-column gap-2 bg-light px-2 py-2'
                      style={{backgroundColor:'#46C7C7', maxHeight:'400px'}}
          >
            <DynamicInput value={searchPar}
                          onChange={setSearchPar}
                          placeholder='Search supplies'
                          type='text'
            />
            <DynamicDiv className='d-flex flex-column gap-2'>
            </DynamicDiv>
          </DynamicDiv>
        </FleshVert>
    </Skeleton>
  )
}

