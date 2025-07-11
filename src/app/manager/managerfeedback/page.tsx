'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation} from 'react-i18next';
// import axios from 'axios';                          
import mockFeedback from '../../utilscripts/mockFeedback.json'; 
import 'bootstrap/dist/css/bootstrap.min.css';

declare global {
  interface Window {
    bootstrap?: {
      Modal: new (el: HTMLElement) => { show: () => void; hide: () => void };
    };
  }
}

/* ----------  Types ---------- */
interface Feedback {
  FeedbackID: number;
  Email: string;
  Comments: string;
  Response: string | null;
  Rating: number;
  FeedbackDate: string;
}

const ManagerFeedbackPage: React.FC = () => {
  /* ----------  State ---------- */
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [responseInput, setResponseInput] = useState('');
  const { t } = useTranslation();

  /* ----------  Fetch (mock) ---------- */
  useEffect(() => {
    /* 
    (async () => {
      try {
        const res = await axios.get('/api/managerfeedback');
        setFeedbackList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch feedback', err);
        setFeedbackList([]);
      } finally {
        setLoading(false);
      }
    })();
    */

    // MOCK MODE: instant load from local JSON
    setFeedbackList(mockFeedback as Feedback[]);
    setLoading(false);
  }, []);

  /* ----------  Modal helpers ---------- */
  const showModal = (id: string) => {
    const el = document.getElementById(id);
    if (el && window.bootstrap?.Modal) new window.bootstrap.Modal(el).show();
  };

  const hideModal = (id: string) => {
    const el = document.getElementById(id);
    if (el && window.bootstrap?.Modal) new window.bootstrap.Modal(el).hide();
  };

  /* ----------  Respond ---------- */
  const handleRespondClick = (fb: Feedback) => {
    setSelectedFeedback(fb);
    setResponseInput('');
    showModal('responseModal');
  };

  const handleSubmitResponse = async () => {
    if (!selectedFeedback) return;

    try {
      /* 
      await axios.put(`/api/managerfeedback/${selectedFeedback.FeedbackID}`, {
        Response: responseInput,
      });
      */

      // MOCK SUCCESS: update local state only
      setFeedbackList(prev =>
        prev.map(fb =>
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

  /* ----------  Render ---------- */
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 textColorless">{t('managerFeed')}</h2>

      {loading ? (
        <p className="text-center text-muted">{t('loading')}</p>
      ) : feedbackList.length === 0 ? (
        <p className="text-center text-muted">{t('noFeedback')}</p>
      ) : (
        <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
          {feedbackList.map(fb => (
            <div key={fb.FeedbackID} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{fb.Email}</h5>
                <p className="card-text">
                  <strong>{t('comments')}:</strong> {fb.Comments}
                </p>
                <p className="card-text">
                  <strong>{t('rating')}:</strong> {fb.Rating}/5
                </p>
                <p className="card-text">
                  <strong>{t('date')}:</strong>{' '}
                  {new Date(fb.FeedbackDate).toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>{t('response')}:</strong>{' '}
                  {fb.Response ? (
                    <span>{fb.Response}</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleRespondClick(fb)}
                    >
                      {t('addResponse')}
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------  Modal ---------- */}
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
              <h5 className="modal-title" id="responseModalLabel">
                {t('addResponse')}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                rows={4}
                placeholder={t('typeResponse')}
                value={responseInput}
                onChange={e => setResponseInput(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                {t('cancel')}
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitResponse}
                disabled={!responseInput.trim()}
              >
                {t('addResponse')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerFeedbackPage;
