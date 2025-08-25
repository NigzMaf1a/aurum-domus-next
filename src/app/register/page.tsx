'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';


// components
import Skeleton from '@/components/containers/Skeleton';
import LoginInput2 from '@/components/inputs/LoginInput2';
import Gender from '@/components/dropdowns/Gender';
import DynamicDiv from '@/components/containers/DynamicDiv';

// scripts
import validateFields from '../../utilscripts/validateFields';
import register from '@/scripts/api/register';
import { gender } from '@/types/gender';
import hashPassword from '@/scripts/utilz/hash';

export default function RegisterPage() {
  const { t } = useTranslation();

  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [regType] = useState<'Customer'>('Customer');
  const [accStatus] = useState('Approved');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // validate inputs
      const validated = validateFields(
        name1,
        name2,
        phone,
        email,
        password,
        confirmPassword,
        genderValue,
        regType,
        accStatus
      );

      // prepare payload for backend
      const payload = {
        Name1: validated.name1,
        Name2: validated.name2,
        PhoneNo: validated.phone,
        Email: validated.email,
        UserPassword: await hashPassword(validated.password),
        Gender: validated.gender as gender,
        RegType: 'Customer',
        accStatus:'Approved',
        dLocation: null,
        UserImage: null
      };
      console.log(`Validated data ${validated.gender}`);
      console.log('Payload being sent:', payload);

      const result = await register(payload);
      toast.success(`✅ User registered successfully! ID: ${result.RegID || 'N/A'}`);

      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert(`⚠️ Error: ${error}`);
    }
  };

  return (
    <Skeleton
      className="d-flex justify-content-center align-items-center mt-4"
      style={{ minHeight: '100vh', padding: '1rem' }}
    >
      <DynamicDiv
        className="card shadow p-4"
        style={{
          minWidth: '320px',
          maxWidth: '360px',
          width: '360px',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <h2 className="mb-4 text-center">{t('register')}</h2>
        <form onSubmit={handleSubmit}>
          <LoginInput2
            labelFor="name1"
            label={t('firstName')}
            type="text"
            value={name1}
            placeholder={t('firstName')}
            onChange={(e) => setName1(e.target.value)}
          />
          <LoginInput2
            labelFor="name2"
            label={t('lastName')}
            type="text"
            value={name2}
            placeholder={t('lastName')}
            onChange={(e) => setName2(e.target.value)}
          />
          <LoginInput2
            labelFor="phone"
            label={t('phoneNo')}
            type="tel"
            value={phone}
            placeholder={t('phoneNo')}
            onChange={(e) => setPhone(e.target.value)}
          />
          <LoginInput2
            labelFor="email"
            label={t('emailAddress')}
            type="email"
            value={email}
            placeholder={t('emailAddress')}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoginInput2
            labelFor="password"
            label={t('password')}
            type="password"
            value={password}
            placeholder={t('password')}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginInput2
            labelFor="confirmPassword"
            label={t('confirmPassword')}
            type="password"
            value={confirmPassword}
            placeholder={t('confirmPassword')}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Gender Dropdown */}
          <Gender
            value={genderValue}
            onChange={(e) => setGenderValue(e.target.value as gender)}
          />

          <button type="submit" className="btn btn-success w-100">
            {t('register')}
          </button>
          <p className="mt-3 text-center">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login">{t('loginHere')}</Link>
          </p>
        </form>
      </DynamicDiv>
    </Skeleton>
  );
}
