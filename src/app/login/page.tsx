'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

// Enums & Scripts
import { RegType } from '../../enums/RegTypeEnum';
import { returnUnitNames, loginUser } from '../../scripts/login';
import getUnits from '@/scripts/getUnits';

// Mock data
import mockRegistrations from '../../utilscripts/mockRegistrations.json';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');
  const [unitNames, setUnitNames] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const names = returnUnitNames(await getUnits());
      setUnitNames(names);
    })();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login: look for matching user in mockRegistrations
    const user = mockRegistrations.find((reg) => reg.Email === email);

    if (!user) {
      toast.error('User not found');
      return;
    }

    if (user.Password !== password) {
      toast.error('Incorrect password');
      return;
    }

    toast.success(`Welcome, ${user.Name1}`);

    // 🧠 Store user in localStorage WITHOUT the password
    try {
      const { Password, ...safeUser } = user;
      localStorage.setItem('loggedUser', JSON.stringify(safeUser));
      console.log('[Login] Stored user in localStorage:', safeUser);
    } catch (err) {
      console.error('Failed to store user in localStorage:', err);
      toast.error('Session storage failed');
      return;
    }

    // Use regtype from user OR fallback to query param if present
    let role: RegType | null = user.RegType as RegType;

    // allow regtype to be overridden from URL (not necessary)
    const queryRegtype = searchParams ? (searchParams.get('regtype') as RegType) : null;
    if (queryRegtype) role = queryRegtype;

    // Route based on RegType
    switch (role) {
      case RegType.Admin:
        router.push('/admin/dashboard');
        break;
      case RegType.Manager:
        router.push('/manager/managerdashboard');
        break;
      case RegType.Customer:
        router.push('/customer/customerdashboard');
        break;
      case RegType.Chef:
        router.push('/chef/dashboard');
        break;
      case RegType.Waiter:
        router.push('/waiter/dashboard');
        break;
      case RegType.Accountant:
        router.push('/accountant/dashboard');
        break;
      default:
        toast.error(`Unsupported user role: ${role}`);
        break;
    }
  };

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{ padding: '1rem' }}
    >
      <div
        className="card p-4 shadow"
        style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}
      >
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

          {/* Password */}
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
              {unitNames.map((unitName, index) => (
                <option key={index} value={unitName}>
                  {unitName}
                </option>
              ))}
            </select>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">
            {t('login')}
          </button>
          <p className="mt-3 text-center">
            {t('dontHaveAccount')}{' '}
            <Link href="/register">{t('registerHere')}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
