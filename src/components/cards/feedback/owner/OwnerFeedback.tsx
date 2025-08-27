import React, {useState} from 'react';

//components
import Ribz from '@/components/containers/Ribz';
import DynamicDiv from '@/components/containers/DynamicDiv';
import LabelledP from '@/components/p/LabelledP';
import StarDisplay from '@/components/stars/StarRating';
import OwnerFeedbackDetails from './OwnerFeedbackDetails';

interface OwnerFeedbackProps{
    unitID:number;
    email:string;
    comments:string;
    response:string;
    rating:number;
    feedbackDate:string;
}

export default function OwnerFeedback({unitID, email, comments, response, rating, feedbackDate}:OwnerFeedbackProps) {
    const [showModal, setShowModal] = useState(false);
    function openModal(){
        setShowModal(true);
    }
    function closeModal(){
        setShowModal(false);
    }
  return (
    <Ribz className='justify-content-between align-items-center text-black border px-4'
          style={{height:'70px', cursor:'pointer', borderColor:'#000000'}}
          onClick={openModal}
    >
        <DynamicDiv>
            <LabelledP label={"Email:"} text={email}/>
            <LabelledP label={"Comments:"} text={comments}/>
        </DynamicDiv>
        <DynamicDiv style={{width:'100px', height:'40px'}}>
            <StarDisplay rating={rating}/>
        </DynamicDiv>
        {showModal && <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                        <OwnerFeedbackDetails unitID={unitID}
                                              email={email}
                                              comments={comments}
                                              response={response}
                                              rating={rating}
                                              feedbackDate={feedbackDate}
                                              callback={closeModal}
                        />
                      </div>
        }
    </Ribz>
  )
}

