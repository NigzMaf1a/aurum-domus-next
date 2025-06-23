'use client';

import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // ❌ Axios commented out for mock usage
import 'bootstrap/dist/css/bootstrap.min.css';

import { approvedUsers as mockApprovedUsers } from '../../utilscripts/mockUsers'; // ✅ Mock data import

interface ApprovedUser {
  id: number;
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  gender: string;
  regType: string;
}

const ApprovedPage: React.FC = () => {
  const [approvedUsers, setApprovedUsers] = useState<ApprovedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulated fetch of approved users
  useEffect(() => {
    const timer = setTimeout(() => {
      setApprovedUsers(mockApprovedUsers);
      setLoading(false);
    }, 500); // fake 500ms delay

    return () => clearTimeout(timer);
  }, []);

  // Deactivate user (mocked functionality)
  const deactivateUser = async (id: number) => {
    try {
      // await axios.put(`/api/deactivate/${id}`, { status: 'Inactive' }); // ❌ Disabled for mock
      setApprovedUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Error deactivating user:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 textColorless">Approved Users</h2>
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
          <thead className="table-warning sticky-top">
            <tr>
              <th>First Name</th>
              <th>Second Name</th>
              <th>Phone No</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Reg Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : approvedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No approved users found.
                </td>
              </tr>
            ) : (
              approvedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.secondName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.regType}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deactivateUser(user.id)}
                    >
                      Deactivate
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

export default ApprovedPage;
