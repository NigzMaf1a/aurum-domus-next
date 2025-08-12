import React from 'react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

//scripts
import { NoParamNoReturn } from '@/interfaces/functionInterfaces';

export default function AddFeed({callback}:NoParamNoReturn) {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  return (
          <div className="card p-4 shadow-sm">
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
            <button className="btn btn-primary" onClick={()=>callback()}>
              Submit
            </button>
          </div>
  )
}