'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

//scripts
import Feedback from '@/interfaces/feedback';
import FeedList from '@/components/cards/FeedList';
import AddFeed from '@/components/cards/AddFeed';
import NoteP from '@/components/loading/NoteP';
import LoadingAnimation from '@/components/loading/LoadingAnimation';


export default function CustomerFeedbackPage() {
  const [feed, setFeedbackList] = useState<Feedback[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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

  const submitFeedback = async ({email, comments, response, rating}:Feedback) => {
    if (!newComment || newRating < 1) return alert('Please provide a comment and rating.');
    const newFeedback = {
      email: email, // Replace with actual user email from session or input
      comments: comments,
      response: response,
      rating: rating,
      feedbackDate: new Date().toISOString().split('T')[0],
    };

    try {
      await axios.post('/api/feedback', newFeedback);
      setFeedbackList([newFeedback, ...feed]);
      setNewComment('');
      setNewRating(0);
    } catch {
      alert('Failed to submit feedback.');
    }
  };

  return (
    <div className="container py-5 w-100 h-100">
      <h2 className="text-center mb-4 textColorless">Customer Feedback</h2>

      {/* Feedback List Section */}
      <div
        className="mb-4 p-2"
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      >
        {loading ? (
          <LoadingAnimation/>
        ) : feed.length === 0 ? (
          <NoteP text={'No feedback yet.'}/>
        ) : (
          feed.map((fb) => (
            <FeedList key={fb.feedbackID} email={fb.email} feedbackDate={fb.feedbackDate} comments={fb.comments} response={fb.response} rating={fb.rating}/>
          ))
        )}
      </div>
      <button className="btn btn-primary mx-auto my-auto"
              onClick={() => setShowForm(prev => !prev)}
      >
        Add
      </button>

      {/* Add Feedback Section */}
      {showForm && <AddFeed callback={() => submitFeedback()} />}
    </div>
  );
}
