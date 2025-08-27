import React from 'react';

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import LabelledP from '@/components/p/LabelledP';
import ButtonP1 from '@/components/buttonp/ButtonP1';
import StarDisplay from '@/components/stars/StarRating';

interface OwnerFeedbackDetailsProps{
    unitID:number;
    email:string;
    comments:string;
    response:string;
    rating:number;
    feedbackDate:string;
    callback:()=>void;
}

export default function OwnerFeedbackDetails({unitID, email, comments, response, rating, feedbackDate ,callback}:OwnerFeedbackDetailsProps) {
  return (
    <DynamicDiv style={{width:'300px', height:'400px', backgroundColor:'#EDDA74'}}>
        <ButtonP1 text={"X"} callback={callback} style={{marginRight:'10px'}}/>
        <DynamicDiv className='px-3 gap-4'>
            <LabelledP label={"Unit ID:"} text={unitID}/>
            <LabelledP label={"Email:"} text={email}/>
            <LabelledP label={"Comments:"} text={comments}/>
            <LabelledP label={"Response:"} text={response}/>
            <LabelledP label={"Date:"} text={feedbackDate}/>
            <DynamicDiv>
                <StarDisplay rating={rating}/>
            </DynamicDiv>
        </DynamicDiv>
    </DynamicDiv>
  )
}