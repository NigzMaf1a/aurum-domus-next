'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios'; // ❌ Commented out for mock usage
import 'bootstrap/dist/css/bootstrap.min.css';
// import APILinks from '@/app/utilscripts/apiLinks'; // ❌ Commented out for mock usage

import { pendingUsers as mockPendingUsers } from '../../../utilscripts/mockUsers'; // ✅ Import mock data

interface PendingUser {
  RegID: number;
  Name1: string;
  Name2: string;
  PhoneNo: string;
  Email: string;
  Gender: string;
  RegType: string;
}

const PendingPage: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  // Fetch mock pending users
  useEffect(() => {
    // Simulate async fetch delay
    const timer = setTimeout(() => {
      setPendingUsers(mockPendingUsers);
      setLoading(false);
    }, 500); // Simulate 500ms load time

    return () => clearTimeout(timer);
  }, []);

  // Approve user (mock)
  const approveUser = async (regId: number) => {
    try {
      // await axios.put(`/api/approve/${regId}`, { status: 'Approved' }); // ❌ Skipped in mock mode
      setPendingUsers((prev) => prev.filter((user) => user.RegID !== regId));
    } catch (err) {
      console.error('Error approving user:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 textColorless">{t('pendingRegistrations')}</h2>
      <div
        className="table-responsive"
        style={{
          maxHeight: '70vh',
          overflowY: 'auto',
          border: '1px solid #dee2e6',
          borderRadius: '0.25rem',
        }}
      >
        <table className="table table-striped table-hover table-bordered mb-0">
          <thead className="table-success sticky-top">
            <tr>
              <th>{t('firstName')}</th>
              <th>{t('secondName')}</th>
              <th>{t('phoneNo')}</th>
              <th>{t('email')}</th>
              <th>{t('gender')}</th>
              <th>{t('regType')}</th>
              <th>{t('action')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center">
                  {t('loading')}
                </td>
              </tr>
            ) : pendingUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  {t('noPendingUsers')}
                </td>
              </tr>
            ) : (
              pendingUsers.map((user) => (
                <tr key={user.RegID}>
                  <td>{user.Name1}</td>
                  <td>{user.Name2}</td>
                  <td>{user.PhoneNo}</td>
                  <td>{user.Email}</td>
                  <td>{user.Gender}</td>
                  <td>{user.RegType}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => approveUser(user.RegID)}
                    >
                      {t('approve')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingPage;
