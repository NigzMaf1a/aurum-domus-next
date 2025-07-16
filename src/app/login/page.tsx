'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

//Mock data imports
import mockUnits from '../utilscripts/mockUnits.json';
import mockRegistrations from '../utilscripts/mockRegistrations.json';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    alert(`Logging in with:\nEmail: ${email}\nBranch: ${branch}`);
  };

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center "
      style={{ padding: '1rem' }}
    >
      <div className="card p-4 shadow" style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">{t('login')}</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              {t('emailAddress')}
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder={t('exampleEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder={t('examplePassword')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Branch Dropdown */}
          <div className="mb-4">
            <label htmlFor="branch" className="form-label">
              {t('selectBranch')}
            </label>
            <select
              id="branch"
              className="form-select"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            >
              <option value="" disabled>
                {t('chooseBranch')}
              </option>
              <option value="north">North Branch</option>
              <option value="south">South Branch</option>
              <option value="east">East Branch</option>
              <option value="west">West Branch</option>
            </select>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">
            {t('login')}
          </button>
          <p className="mt-3 text-center">
            {t('dontHaveAccount')} <Link href="/register">{t('registerHere')}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
