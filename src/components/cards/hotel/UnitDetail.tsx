import React from 'react';
import DynamicDiv from '@/components/containers/DynamicDiv';
import RoundedImage from '@/components/images/RoundedImage';
import Unit from '@/interfaces/unit';
import LabelledP from '@/components/p/LabelledP';
import DynamicButton from '@/components/buttons/DynamicButton';

//interface
export interface DetailProps{
    unit:Unit,
    callback1:()=>void;
    callback2:()=>void;
}

function UnitDetail({props}:{props:DetailProps}) {
  return (
    <DynamicDiv className='d-flex flex-column'>
        <DynamicDiv className='d-flex flex-row'>
            <RoundedImage src={props.unit.UnitImage}/>
            <DynamicDiv>
                <LabelledP label={"Unit Name"} text={props.unit.UnitName}/>
                <LabelledP label={"Email"} text={props.unit.UnitEmail}/>
                <LabelledP label={"Phone"} text={props.unit.UnitPhone}/>
                <LabelledP label={"Location"} text={props.unit.UnitLocation}/>
                <LabelledP label={"Balance"} text={props.unit.UnitBalance}/>
                <LabelledP label={"Employees"} text={props.unit.Employees}/>
            </DynamicDiv>
        </DynamicDiv>
        <DynamicDiv className='d-flex flex-row justify-content-between w-100 py-3' style={{height:'60px'}}>
            <DynamicButton label={"Close"} onClick={()=>props.callback1()} className='h-full' style={{width:'50px'}}/>
            <DynamicButton label={"Edit"} onClick={()=>props.callback2()} className='h-full' style={{width:'50px'}}/>
        </DynamicDiv>  
    </DynamicDiv>
  )
}

export default UnitDetail