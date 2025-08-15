'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

//components
import UserType from '@/components/dropdowns/UserType';
import LoginInput from '@/components/inputs/LoginInput';
import Branch from '@/components/dropdowns/Branch';
import Head1 from '@/components/h/Head1';

//Scripts
import { RegType } from '../../enums/RegTypeEnum';
import { returnUnitNames, loginUser } from '../../scripts/api/login';
import getUnits from '@/scripts/api/getUnits';

// Mock data
import mockRegistrations from '../../utilscripts/mockRegistrations.json';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
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

    // allow regtype to be overridden from URL
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
        <Head1 text={t('login')}/>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <LoginInput labelFor={"email"}
                      label={t('emailAddress')}
                      type={"email"}
                      value={email}
                      placeholder={t('exampleEmail')}
                      onChange={setEmail}
          />

          {/* Password */}
          <LoginInput labelFor={"password"}
                      label={t('password')} 
                      type={"password"}  
                      value={password} 
                      placeholder={t('examplePassword')}
                      onChange={setPassword}    
          />

          <UserType value={type} onChange= {setType}/>

          {/* Branch Dropdown */}
          <Branch labelFor={"branch"}
                  label={t('selectBranch')}
                  value={branch}
                  optionLabel={t('chooseBranch')}
                  branches={unitNames}
                  onChange={setBranch}
          />

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
