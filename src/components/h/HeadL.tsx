import React from 'react';
import { StringOrNumber } from '@/types/customer';

//Props interface
interface Head1Props{
    text:StringOrNumber;
}

export default function Head1({text}:Head1Props) {
  return (
    <h2 className="mb-2 text-start text-light">
        {text}
    </h2>
  );
}