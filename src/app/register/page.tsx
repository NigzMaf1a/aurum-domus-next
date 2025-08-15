'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

//components
import LoginInput2 from '@/components/inputs/LoginInput2';
import Gender from '@/components/dropdowns/Gender';
import RegType from '@/components/dropdowns/RegType';

//scripts
import validateFields from '../../utilscripts/validateFields';

export default function RegisterPage() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    regType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = validateFields(
        formData.name1,
        formData.name2,
        formData.phone,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.gender,
        formData.regType
      );

      // If validation passes, do something with validated fields
      alert(`Validation Passed! 🚀\n\n${JSON.stringify(validated, null, 2)}`);

      // Optional: Proceed to send data to backend here

    } catch (error) {
      alert(`⚠️ Validation Error:\n${error}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '1rem' }}>
      <div
        className="card shadow p-4"
        id="register-form"
        style={{
          minWidth: '320px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <h2 className="mb-4 text-center">{t('register')}</h2>
        <form onSubmit={handleSubmit}>
          {/* Name1 */}
          <LoginInput2 labelFor={"name1"}
                       label={t('firstName')}
                       type={"text"}
                       value={formData.name1}
                       placeholder={t('firstName')}
                       onChange={handleChange}
          />

          {/* Name2 */}
          <LoginInput2 labelFor={"name2"}
                       label={t('lastName')}
                       type={"text"}
                       value={formData.name2}
                       placeholder={t('lastName')}
                       onChange={handleChange}
          />          

          {/* Phone */}
          <LoginInput2 labelFor={"phone"}
                       label={t('phoneNo')}
                       type={"tel"}
                       value={formData.phone}
                       placeholder={t('phoneNo')}
                       onChange={handleChange}
          />  

          {/* Email */}
          <LoginInput2 labelFor={"email"}
                       label={t('emailAddress')}
                       type={"email"}
                       value={formData.email}
                       placeholder={t('emailAddress')}
                       onChange={handleChange}
          />

          {/* Password */}
          <LoginInput2 labelFor={"password"}
                       label={t('password')}
                       type={"password"}
                       value={formData.password}
                       placeholder={t('password')}
                       onChange={handleChange}
          />          

          {/* Confirm Password */}
          <LoginInput2 labelFor={"confirmPassword"}
                       label={t('confirmPassword')}
                       type={"password"}
                       value={formData.confirmPassword}
                       placeholder={t('confirmPassword')}
                       onChange={handleChange}
          /> 

          {/* Gender Dropdown */}
          <Gender value={formData.gender} onChange={handleChange}/>

          {/* RegType Dropdown */}
          <RegType value={formData.regType} onChange={handleChange}/>

          <button type="submit" className="btn btn-success w-100">{t('register')}</button>
          <p className="mt-3 text-center">
            {t('alreadyHaveAccount')} <Link href="/login">{t('loginHere')}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
