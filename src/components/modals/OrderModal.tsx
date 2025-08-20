import React from 'react';

//components
import ButtonP1 from '../buttonp/ButtonP1';

//interface
interface Props{
    callback:()=>void;
}

export default function OrderModal({callback}:Props) {
  return (
    <div className='rounded-2'
         style={{width:"300px", height:"400px", backgroundColor:"#FFFFFF"}}
    >
        <div className='me-2'>
            <ButtonP1 text={"X"} callback={()=>callback()}/>
        </div>
    </div>
  );
}