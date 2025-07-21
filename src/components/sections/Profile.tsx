'use client';

import { useTranslation } from 'react-i18next';
import React from 'react';
import { Card } from 'react-bootstrap';
import Image from 'next/image';

import { User, UserProfileCardProps } from '../../interfaces/profile';


const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
    const { t } = useTranslation();
  return (
    <Card className="text-center shadow-lg rounded-4 p-4 mb-4 mx-auto" style={{ maxWidth: '400px' }}>
      <div className="d-flex justify-content-center mb-3">
        <div
          className="rounded-circle border border-3 border-primary"
          style={{
            width: '120px',
            height: '120px',
            overflow: 'hidden',
            objectFit: 'cover',
          }}
        >
          <Image
            src={user.image}
            alt={`${user.Name1} ${user.Name2}`}
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
            width={120}
            height={120}
          />
        </div>
      </div>
      <Card.Body>
        <Card.Title className="fw-bold fs-4">{user.Name1} {user.Name2}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{user.RegType}</Card.Subtitle>
        <Card.Text className="mb-1">
          <strong>{t('email')}:</strong> {user.Email}
        </Card.Text>
        <Card.Text className="mb-1">
          <strong>{t('phone')}:</strong> {user.PhoneNo}
        </Card.Text>
        <Card.Text className="mb-1">
          <strong>{t('gender')}:</strong> {user.Gender}
        </Card.Text>
        <Card.Text className={`fw-semibold ${getStatusClass(user.accStatus)}`}>
          <strong>{t('status')}:</strong> {user.accStatus}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Helper to style status text
const getStatusClass = (status: User['accStatus']): string => {
  switch (status) {
    case 'Approved':
      return 'text-success';
    case 'Pending':
      return 'text-warning';
    case 'Inactive':
      return 'text-danger';
    default:
      return '';
  }
};

export default UserProfileCard;
