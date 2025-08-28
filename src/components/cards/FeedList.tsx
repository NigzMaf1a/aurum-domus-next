import React from 'react';
import { FaStar } from 'react-icons/fa';
import Feedback from '@/interfaces/feedback';

//components
import DynamicDiv from '../containers/DynamicDiv';
import LabelledP from '../p/LabelledP';
import LabelledP2 from '../p/LabelledP2';
import RoundedImage from '../images/RoundedImage';

export default function FeedList({Email, FeedbackDate, Comments, Response, Rating}:Feedback) {
  return (
    <DynamicDiv className="d-flex flex-row justify-content-between align-items-center 
                           card mb-3 shadow-sm col-lg-12 col-12 col-md-6 my-0
                          "
                style={{height:"100px"}}
    >
            <DynamicDiv className='d-flex flex-row align-items-center gap-2 ms-2'>
                <RoundedImage src={"/aurum1.jpg"} style={{width:"50px", height:"50px"}}/>
                <DynamicDiv className='d-flex flex-column'>
                    <LabelledP label={"Email:"} text={Email}/>
                    <LabelledP2 label={"Comments:"} text={Comments}/>
                    <LabelledP2 label={"Response:"} text={String(Response)}/>
                </DynamicDiv>
            </DynamicDiv>
            <DynamicDiv className="d-flex align-items-center me-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                        key={i}
                        color={i < Rating ? '#ffc107' : '#e4e5e9'}
                    />
                ))}
            </DynamicDiv>
    </DynamicDiv>
  )
}
