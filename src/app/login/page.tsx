'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

//components
import UserType from '@/components/dropdowns/UserType';
import LoginInput from '@/components/inputs/LoginInput';
import Branch from '@/components/dropdowns/Branch';
import Head1 from '@/components/h/Head1';
import Skeleton from '@/components/containers/Skeleton';

//Scripts
import { RegType } from '../../enums/RegTypeEnum';
import { returnUnitNames, loginUser, LoginResponse } from '../../scripts/api/login';
import getUnits from '@/scripts/api/getUnits';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [branch, setBranch] = useState('');
  const [unitNames, setUnitNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const names = returnUnitNames(await getUnits());
      setUnitNames(names);
    })();
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate input
  if (!email || !password || !type || !branch) {
    toast.error('All fields are required!');
    return;
  }

  // Show cooking toast
  const toastId = toast.loading('Hold tight G, things are cooking... 🍳');
  setLoading(true);

  try {
    const logz:LoginResponse = await loginUser({ email, password });
    const { token, user } = logz;
    const role = user?.RegType;

    // Save session
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Route based on role
    switch (role) {
      case RegType.Admin:
        router.push('/admin/dashboard');
        break;
      case RegType.Manager:
        router.push('/manager/dashboard');
        break;
      case RegType.Customer:
        router.push('/customer/dashboard');
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
        toast.update(toastId, {
          render: `Unsupported user role: ${role}`,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
        return;
    }

    // Update toast on success
    toast.update(toastId, {
      render: 'Login Successful! 🔥',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });

  } catch (err) {
    console.error(`Error logging in user:`, err);
    toast.update(toastId, {
      render: 'Login Failed ',
      type: 'error',
      isLoading: false,
      autoClose: 3000,
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <Skeleton
      className="d-flex justify-content-center align-items-center mt-6"
      style={{ padding: '1rem' }}
    >
      <div
        className="card p-4 shadow "
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
          {type.toLowerCase() === 'customer' && (
            <Branch labelFor={"branch"}
                    label={t('selectBranch')}
                    value={branch}
                    optionLabel={t('chooseBranch')}
                    branches={unitNames}
                    onChange={setBranch}
            />
          )}

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
    </Skeleton>
  );
}
