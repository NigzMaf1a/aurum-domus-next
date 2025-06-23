'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

type Feedback = {
  email: string;
  comment: string;
  response: string;
  rating: number;
  date: string;
};

export default function CustomerFeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get('/api/feedback');
      setFeedbackList(res.data);
    } catch {
      console.error('Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async () => {
    if (!newComment || newRating < 1) return alert('Please provide a comment and rating.');
    const newFeedback = {
      email: 'guest@example.com', // Replace with actual user email from session or input
      comment: newComment,
      response: 'Pending...',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      await axios.post('/api/feedback', newFeedback);
      setFeedbackList([newFeedback, ...feedbackList]);
      setNewComment('');
      setNewRating(0);
    } catch {
      alert('Failed to submit feedback.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 textColorless">Customer Feedback</h2>

      {/* Feedback List Section */}
      <div
        className="mb-4 p-2"
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      >
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : feedbackList.length === 0 ? (
          <p className="text-center text-muted">No feedback yet.</p>
        ) : (
          feedbackList.map((fb, idx) => (
            <div className="card mb-3 shadow-sm" key={idx}>
              <div className="card-body">
                <h6 className="card-subtitle mb-1 text-muted">
                  {fb.email} • {fb.date}
                </h6>
                <p className="card-text">{fb.comment}</p>
                <p className="card-text">
                  <strong>Response:</strong> {fb.response}
                </p>
                <div className="d-flex align-items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < fb.rating ? '#ffc107' : '#e4e5e9'}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Feedback Section */}
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
        <button className="btn btn-primary" onClick={submitFeedback}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
