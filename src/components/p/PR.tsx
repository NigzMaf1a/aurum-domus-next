import React from 'react';

//interfaces and types
import { StringOrNumber } from '@/types/customer';

interface Props{
    text:StringOrNumber
}

export default function PC({text}:Props) {
  return (
    <p className='mb-4 fs-5 text-end'>
        {text}
    </p>
  );
}