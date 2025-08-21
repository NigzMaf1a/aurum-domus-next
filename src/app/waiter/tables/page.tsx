import React from 'react';

//components
import Skeleton from '@/components/containers/Skeleton';
import FleshVert from '@/components/containers/FleshVert';
import Brick from '@/components/containers/FleshHor';
import DynamicHead from '../../../components/h/DynamicHead';

export default function page() {
  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <FleshVert>
                <Brick className='col-12 col-sm-6 col-lg-12 bg-light ps-2'>
                    <DynamicHead    className='text-dark'
                                    text={"Vacant Tables"}
                    />
                </Brick>
        </FleshVert>
    </Skeleton>
  )
}

