import React from 'react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

//scripts
import { TwoFuncNoParamNoReturn } from '@/interfaces/functionInterfaces';

//components
import DynamicDiv from '../containers/DynamicDiv';
import DynamicButton from '../buttons/DynamicButton';

export default function AddFeed({callback1, callback2}:TwoFuncNoParamNoReturn) {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  return (
    <DynamicDiv className="card p-4 shadow-sm"
                style={{height:'300px', width:'270px', backgroundColor:'#EDDA74'}}
    >
      <h5 className="mb-3">Leave Your Feedback</h5>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Write your feedback..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rating</label>
              <div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    size={24}
                    className="me-1"
                    style={{ cursor: 'pointer' }}
                    color={
                      (hoverRating ?? newRating) > i ? '#ffc107' : '#e4e5e9'
                    }
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setNewRating(i + 1)}
                  />
                ))}
              </div>
            </div>
      <DynamicDiv className='d-flex flex-row justify-content-between align-items-center'>
        <DynamicButton label='Close' 
                       onClick={callback1}
                       style={{width:'70px', height:'30px', backgroundColor:'#FFFF00'}}
        />
        <DynamicButton label='Submit' 
                       onClick={callback2}
                       style={{width:'70px', height:'30px', backgroundColor:'#008000'}}
                       className='text-white'
        />
      </DynamicDiv>
    </DynamicDiv>
  )
}