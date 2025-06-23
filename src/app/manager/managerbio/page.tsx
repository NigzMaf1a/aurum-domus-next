'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagerBioPage: React.FC = () => {
  const [bio, setBio] = useState<string>('');        // Displayed bio
  const [newBio, setNewBio] = useState<string>('');  // Input field content
  const [loading, setLoading] = useState<boolean>(true);
  const [alertMsg, setAlertMsg] = useState<string>('');    // Alert content
  const [alertType, setAlertType] = useState<'success' | 'danger' | ''>(''); // Alert class

  // Fetch current bio on mount
  useEffect(() => {
    const getBio = async () => {
      try {
        const res = await axios.get('/api/managerbio');
        const fetched = res.data.bio || '';
        setBio(fetched);
        setNewBio(fetched);
      } catch (error) {
        console.error('Error fetching bio:', error);
        // Do not show alert here — only show alerts on update attempt
      } finally {
        setLoading(false);
      }
    };

    getBio();
  }, []);

  // Update bio on button click
  const handleUpdate = async () => {
    try {
      await axios.put('/api/managerbio', { bio: newBio });
      setBio(newBio);
      setAlertMsg('Bio updated successfully!');
      setAlertType('success');
    } catch (error) {
      console.error('Error updating bio:', error);
      setAlertMsg('Failed to update bio. Try again.');
      setAlertType('danger');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 textColorless">Manager Bio</h2>

      {/* Preview Current Bio */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Current Bio</h5>
          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : (
            <p className="card-text">{bio || 'No bio available yet.'}</p>
          )}
        </div>
      </div>

      {/* Bio Update Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Edit Bio</h5>
          <textarea
            className="form-control mb-3"
            rows={4}
            placeholder="Write your updated bio here..."
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
          <button
            className="btn btn-primary w-100"
            onClick={handleUpdate}
            disabled={loading || !newBio.trim()}
          >
            Update Bio
          </button>

          {/* Alert (shown only when button is clicked) */}
          {alertMsg && (
            <div className={`alert alert-${alertType} mt-3 text-center`} role="alert">
              {alertMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerBioPage;
