'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap Modal typing
declare global {
  interface Window {
    bootstrap?: {
      Modal: new (element: HTMLElement) => {
        show: () => void;
        hide: () => void;
      };
    };
  }
}

interface Feedback {
  FeedbackID: number;
  Email: string;
  Comments: string;
  Response: string | null;
  Rating: number;
  FeedbackDate: string;
}

const ManagerFeedbackPage: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [responseInput, setResponseInput] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get('/api/managerfeedback');
        console.log("Fetched data:", res.data); // Debug log
        if (Array.isArray(res.data)) {
          setFeedbackList(res.data);
        } else {
          console.warn("Invalid feedback data:", res.data);
          setFeedbackList([]);
        }
      } catch (err) {
        console.error('Failed to fetch feedback', err);
        setFeedbackList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const showModal = (modalId: string) => {
    const modalEl = document.getElementById(modalId);
    if (modalEl && window.bootstrap?.Modal) {
      const modal = new window.bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  const hideModal = (modalId: string) => {
    const modalEl = document.getElementById(modalId);
    if (modalEl && window.bootstrap?.Modal) {
      const modal = new window.bootstrap.Modal(modalEl);
      modal.hide();
    }
  };

  const handleRespondClick = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setResponseInput('');
    showModal('responseModal');
  };

  const handleSubmitResponse = async () => {
    if (!selectedFeedback) return;

    try {
      await axios.put(`/api/managerfeedback/${selectedFeedback.FeedbackID}`, {
        Response: responseInput,
      });

      setFeedbackList((prev) =>
        prev.map((fb) =>
          fb.FeedbackID === selectedFeedback.FeedbackID
            ? { ...fb, Response: responseInput }
            : fb
        )
      );

      hideModal('responseModal');
    } catch (err) {
      console.error('Failed to submit response', err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 textColorless">Manager Feedback</h2>

      {loading ? (
        <p className="text-center text-muted">Loading feedback...</p>
      ) : feedbackList.length === 0 ? (
        <p className="text-center text-muted">No feedback found.</p>
      ) : (
        <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
          {feedbackList.map((fb) => (
            <div key={fb.FeedbackID} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{fb.Email}</h5>
                <p className="card-text">
                  <strong>Comments:</strong> {fb.Comments}
                </p>
                <p className="card-text">
                  <strong>Rating:</strong> {fb.Rating}/5
                </p>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(fb.FeedbackDate).toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Response:</strong>{' '}
                  {fb.Response ? (
                    <span>{fb.Response}</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleRespondClick(fb)}
                    >
                      Add Response
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <div
        className="modal fade"
        id="responseModal"
        tabIndex={-1}
        aria-labelledby="responseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="responseModalLabel">Add Response</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                rows={4}
                placeholder="Type your response here..."
                value={responseInput}
                onChange={(e) => setResponseInput(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitResponse}
                disabled={!responseInput.trim()}
              >
                Submit Response
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerFeedbackPage;
