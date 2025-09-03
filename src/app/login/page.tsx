'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Components
import UserType from '@/components/dropdowns/UserType';
import LoginInput from '@/components/inputs/LoginInput';
import Branch from '@/components/dropdowns/Branch';
import Head1 from '@/components/h/Head1';
import Skeleton from '@/components/containers/Skeleton';
import DynamicButton from '@/components/buttons/DynamicButton';
import NoteOne from '@/components/notes/NoteOne';

// Scripts
import { RegType } from '../../enums/RegTypeEnum';
import { returnUnitNames, loginUser, LoginResponse } from '../../scripts/api/login';
import getUnits from '@/scripts/api/getUnits';
import getHotels from '@/scripts/api/getHotels';
import Unit from '@/interfaces/unit';

export default function LoginPage() {
  const [Email, setEmail] = useState('');
  const [UserPassword, setPassword] = useState('');
  const [type, setType] = useState('');
  const [branch, setBranch] = useState('');
  const [unitNames, setUnitNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [allUnits, setAllUnits] = useState<Unit[]>([]);

  const router = useRouter();
  const { t } = useTranslation();

  // Load units and hotels
  useEffect(() => {
    (async () => {
      try {
        const units = await getUnits();
        setAllUnits(units);
        localStorage.setItem('units', JSON.stringify(units));

        const hotels = await getHotels();
        console.log(`Hotels: ${JSON.stringify(hotels)}`);

        setUnitNames(returnUnitNames(units));
      } catch (err) {
        console.error('Error fetching units or hotels:', err);
        toast.error('Failed to load units or hotels');
      }
    })();
  }, []);

  // Handle login submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Email || !UserPassword || !type) {
      toast.error('All fields are required!');
      return;
    }

    if (type.toLowerCase() === 'customer' && !branch) {
      toast.error('Please select a branch!');
      return;
    }

    const toastId = toast.loading('Logging in ....');
    setLoading(true);

    try {
      const logz: LoginResponse = await loginUser({ Email, UserPassword });
      const { token, user } = logz;
      const role = user?.RegType;

      // Save session
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Save selected unit if branch is chosen
      if (branch && allUnits.length > 0) {
        const thisUnit = allUnits.find(
          (unit) => unit.UnitName.toLowerCase().trim() === branch.toLowerCase().trim()
        );
        if (thisUnit) {
          localStorage.setItem('unit', JSON.stringify(thisUnit));
        }
      }

      // Redirect based on role
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
        case RegType.Owner:
          router.push('/owner/dashboard');
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

      toast.update(toastId, {
        render: t('loginSuccess'),
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Error logging in user:', err);
      toast.update(toastId, {
        render: 'Login Failed',
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
      {loading ? (
        <NoteOne text="Loading....." />
      ) : (
        <div
          className="card p-4 shadow"
          style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}
        >
          <Head1 text={t('login')} />
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-center"
          >
            {/* Email */}
            <LoginInput
              labelFor="email"
              label={t('emailAddress')}
              type="email"
              value={Email}
              placeholder={t('exampleEmail')}
              onChange={setEmail}
            />

            {/* Password */}
            <LoginInput
              labelFor="password"
              label={t('password')}
              type="password"
              value={UserPassword}
              placeholder={t('examplePassword')}
              onChange={setPassword}
            />

            <UserType value={type} onChange={setType} />

            {/* Branch Dropdown */}
            {type.toLowerCase() === 'customer' && (
              <Branch
                labelFor="branch"
                label={t('selectBranch')}
                value={branch}
                optionLabel={t('chooseBranch')}
                branches={unitNames}
                onChange={setBranch}
              />
            )}

            {/* Login Button */}
            <DynamicButton
              type="submit"
              label={t('login')}
              className="w-100"
              style={{ height: '40px' }}
            />

            <p className="mt-3 text-center">
              {t('dontHaveAccount')}{' '}
              <Link href="/register">{t('registerHere')}</Link>
            </p>
          </form>
        </div>
      )}
    </Skeleton>
  );
}
