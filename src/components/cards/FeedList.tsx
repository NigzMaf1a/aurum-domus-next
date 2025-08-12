import React from 'react';
import { FaStar } from 'react-icons/fa';
import Feedback from '@/interfaces/feedback';

export default function FeedList({email, feedbackDate, comments, response, rating}:Feedback) {
  return (
    <div className="card mb-3 shadow-sm">
        <div className="card-body">
            <h6 className="card-subtitle mb-1 text-muted">
                {email} • {feedbackDate}
            </h6>
            <p className="card-text">{comments}</p>
            <p className="card-text">
                <strong>Response:</strong> {response}
            </p>
            <div className="d-flex align-items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                        key={i}
                        color={i < rating ? '#ffc107' : '#e4e5e9'}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}
