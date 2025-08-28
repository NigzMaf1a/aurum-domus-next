import React from 'react';

//interfaces
import Dish from '@/interfaces/dish';

interface DishDetailProps{
    dish:Dish;
    callback:()=>void;
}

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import RectangularImage from '@/components/images/RectangularImage';
import LabelledP from '@/components/p/LabelledP';
import DynamicButton from '@/components/buttons/DynamicButton';

export default function DishDetails({dish, callback}:DishDetailProps) {
  return (
    <DynamicDiv style={{height:'400px', width:'270px', backgroundColor:'#667C26'}}
                className='justify-content-center'
    >
        <DynamicDiv className='d-flex flex-column justify-content-between'>
            <RectangularImage src={dish.DishImage} 
                              style={{width:'250px', height:'100px', marginTop:'50px'}}
                              className='mx-auto'
            />
            <DynamicDiv style={{width:'250px', height:'200px'}}
                        className='mx-auto mt-2 px-1 gap-2'
            >
                <LabelledP label={"Dish Name:"} text={dish.DishName} className='mt-2'/>
                <LabelledP label={"Description:"} text={dish.DishDescription}/>
                <LabelledP label={"Price:"} text={dish.DishPrice}/>
                <LabelledP label={"Available:"} text={dish.Available}/>
                <DynamicDiv className='d-flex flex-row justify-content-between align-items-center mt-3 mx-auto'
                            style={{width:'200px'}}
                >
                  <DynamicButton label='Close' 
                                 onClick={()=>callback}
                                 style={{height:'30px', width:'50px', color:'green'}}
                  />
                  <DynamicButton label='Edit'
                                 style={{height:'30px', width:'50px', backgroundColor:'#4AA02C', color:'white'}}
                  />
                </DynamicDiv>
            </DynamicDiv>
        </DynamicDiv>
    </DynamicDiv>
  );
}