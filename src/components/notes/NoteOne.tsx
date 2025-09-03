import React from 'react';

//types
import { StringOrNumber } from '@/types/customer';

//components
import Ribz from '../containers/Ribz';
import DynamicP from '../p/DynamicP';

export default function NoteOne({text}:{text:StringOrNumber}) {
  return (
    <Ribz style={{height:'70px'}}
          className='justify-content-center align-items-center border bg-white'
    >
        <DynamicP text={text}/>
    </Ribz>
  )
}