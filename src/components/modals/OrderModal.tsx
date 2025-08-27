import React from 'react';

//components
import DynamicDiv from '../containers/DynamicDiv';
import ButtonP1 from '../buttonp/ButtonP1';
import LabelledP from '../p/LabelledP';
import RectangularImage from '../images/RectangularImage';

//interface
interface Props{
  name:string;
  price:number;
  plates:number;
  orderPrice:number;
  date:string;
  time:string;
  payment:string;
  served:string;
  image:File;
  callback:()=>void;
}

export default function OrderModal({name, price, plates, orderPrice, date, time, payment, served, image,callback}:Props) {
  return (
    <DynamicDiv className='rounded-2'
         style={{width:"300px", height:"400px", backgroundColor:"#C9BE62"}}
    >
        <DynamicDiv className='d-flex flex-column me-2'>
            <ButtonP1 text={"X"} callback={()=>callback()}/>
            <DynamicDiv style={{width:'277px', height:'100px'}} className='mx-2 border'>
              <RectangularImage src={image} style={{width:'277px', height:'100px'}}/>
            </DynamicDiv>
            <DynamicDiv className='mx-2 my-2 mt-2 border gap-1 ps-2'
                        style={{borderColor:'#827839'}}
            >
              <LabelledP label={"Dish Name:"} text={name}/>
              <LabelledP label={"Dish Price:"} text={price}/>
              <LabelledP label={"Plates:"} text={plates}/>
              <LabelledP label={"Order Price:"} text={orderPrice}/>
              <LabelledP label={"Order Date:"} text={date}/>
              <LabelledP label={"Order Time:"} text={time}/>
              <LabelledP label={"Pay Status"} text={payment}/>
              <LabelledP label={"Served:"} text={served}/>
            </DynamicDiv>
        </DynamicDiv>
    </DynamicDiv>
  );
}