'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';        //  Real API commented out for mock mode
import managerBioData from '../../utilscripts/mockBio.json'; //  Local mock data
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagerBioPage: React.FC = () => {
  /* ---------- state ----------- */
  const [bio, setBio]             = useState<string>('');               // Displayed bio
  const [newBio, setNewBio]       = useState<string>('');               // Textarea content
  const [loading, setLoading]     = useState<boolean>(true);            // Spinner toggle
  const [alertMsg, setAlertMsg]   = useState<string>('');               // Alert message
  const [alertType, setAlertType] =
    useState<'success' | 'danger' | ''>('');                            // Alert colour
  const { t } = useTranslation(); // i18n translation hook

  /* ---------- fetch (mock) ----------- */
  useEffect(() => {
    /* 
    (async () => {
      try {
        const res     = await axios.get('/api/managerbio');
        const fetched = res.data.bio || '';
        setBio(fetched);
        setNewBio(fetched);
      } catch (err) {
        console.error('Error fetching bio:', err);
      } finally {
        setLoading(false);
      }
    })();
    */

    //MOCK MODE: instant grab from JSON
    const fetched = managerBioData.bio ?? '';
    setBio(fetched);
    setNewBio(fetched);
    setLoading(false);
  }, []);

  /* ---------- update (still mock) ----------- */
  const handleUpdate = async () => {
    try {
      /* 
      await axios.put('/api/managerbio', { bio: newBio });
      */

      // Pretend it worked:
      setBio(newBio);
      setAlertMsg('Bio updated locally (mock mode) ');
      setAlertType('success');
    } catch (error) {
      console.error('Error updating bio:', error);
      setAlertMsg('Failed to update bio. Try again.');
      setAlertType('danger');
    }
  };

  /* ---------- UI ----------- */
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 textColorless">{t('managerBio')}</h2>

      {/* Current Bio Preview */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">{t('currentBio')}</h5>
          {loading ? (
            <p className="text-muted">{t('loading')}</p>
          ) : (
            <p className="card-text">{bio || t('noBioAvailable')}</p>
          )}
        </div>
      </div>

      {/* Edit Bio */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{t('editBio')}</h5>
          <textarea
            className="form-control mb-3"
            rows={4}
            placeholder={t('typeBio')}
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
          <button
            className="btn btn-primary w-100"
            onClick={handleUpdate}
            disabled={loading || !newBio.trim()}
          >
            {t('updateBio')}
          </button>

          {/* Alert */}
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
