import React from 'react';

//interfaces and types
import { StringOrNumber } from '@/types/customer';

interface Props{
    text:StringOrNumber
    callback:()=>void;
}

export default function ButtonP1({text, callback}:Props) {
  return (
    <p className='mb-4 fs-2 text-end text-primary fw-bold'
       style={{cursor: "pointer"}}
       onClick={()=>callback()}
    >
        {text}
    </p>
  );
}