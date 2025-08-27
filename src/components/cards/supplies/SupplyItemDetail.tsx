import React from 'react';

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import ButtonP1 from '@/components/buttonp/ButtonP1';
import LabelledP from '@/components/p/LabelledP';
import RectangularImage from '@/components/images/RectangularImage';

interface SupplyItemDetailProps{
   name:string;
   price:number;
   quantity:number;
   available:string; 
   image:File;
   callback1:()=>void;
}

export default function SupplyItemDetail({name, price, quantity, available, image, callback1}:SupplyItemDetailProps) {
  return (
    <DynamicDiv style={{width:'300px', height:'350px', backgroundColor:'#ECE5B6'}}>
        <ButtonP1 text={"X"} callback={callback1} style={{marginRight:'10px'}}/>
        <DynamicDiv className='d-flex flex-column align-items-center justify-content-center'>
            <DynamicDiv style={{width:'200px', height:'100px'}} className='border rounded'>
                <RectangularImage src={image} style={{width:'200px', height:'100px'}}/>
            </DynamicDiv>
            <DynamicDiv style={{marginTop:'40px', width:'200px'}} className='border'>
                <LabelledP label={"Supply Name"} text={name}/>
                <LabelledP label={"Price"} text={price}/>
                <LabelledP label={"Quantity"} text={quantity}/>
                <LabelledP label={"Available"} text={available}/>
            </DynamicDiv>
        </DynamicDiv>
    </DynamicDiv>
  )
}