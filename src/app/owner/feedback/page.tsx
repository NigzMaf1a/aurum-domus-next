"use client";
import React, {useState} from 'react';

//components
import Skeleton from '@/components/containers/Skeleton';
import Strip from '@/components/general/Strip';
import FleshVert from '@/components/containers/FleshVert';
import DynamicInput from '@/components/inputs/DynamicInput';
import DynamicDiv from '@/components/containers/DynamicDiv';
import OwnerFeedback from '@/components/cards/feedback/owner/OwnerFeedback';

export default function Feedback() {
  const [searchFeed, setSearchFeed] = useState("");
  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <Strip head={"Feedback"} det={""}/>
        <FleshVert>
            <DynamicInput type='text'
                          placeholder='Search feedback'
                          value={searchFeed}
                          onChange={()=>setSearchFeed}
                          className='bg-light'
            />
            <DynamicDiv className='d-flex flex-column gap-2 bg-light px-2 py-2'
                        style={{backgroundColor:'#46C7C7', maxHeight:'400px'}}
            >
                <OwnerFeedback unitID={1}
                               email={"Blah@gmail.com"}
                               comments='Crazy'
                               response='Indeed'
                               rating={4}
                               feedbackDate='07/08/2025'
                />
                <OwnerFeedback unitID={1}
                               email={"Blah@gmail.com"}
                               comments='Crazy'
                               response='Indeed'
                               rating={4}
                               feedbackDate='07/08/2025'
                />
            </DynamicDiv>
        </FleshVert>
    </Skeleton>
  );
}