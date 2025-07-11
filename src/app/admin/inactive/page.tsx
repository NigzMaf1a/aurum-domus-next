'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios'; // ❌ Commented out for mock usage
import 'bootstrap/dist/css/bootstrap.min.css';
import { inactiveUsers as mockInactiveUsers } from '../../utilscripts/mockUsers'; // ✅ Mock data import

interface InactiveUser {
  id: number;
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  gender: string;
  regType: string;
}

const InactivePage: React.FC = () => {
  const [inactiveUsers, setInactiveUsers] = useState<InactiveUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  // Load mock inactive users
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setInactiveUsers(mockInactiveUsers);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Reactivate user (mocked locally)
  const reactivateUser = async (id: number) => {
    try {
      // await axios.put(`/api/reactivate/${id}`, { status: 'Approved' }); // ❌ Backend skipped
      setInactiveUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Error reactivating user:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 textColorless">{t('inactiveUsers')}</h2>
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
          <thead className="table-danger sticky-top">
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
            ) : inactiveUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  {t('noInactiveUsers')}
                </td>
              </tr>
            ) : (
              inactiveUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.secondName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.regType}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => reactivateUser(user.id)}
                    >
                      {t('reactivate')}
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

export default InactivePage;
