'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation'; // 🧭 track route
import i18n, { locales, defaultLocale } from '@/lib/i18n';

import AdminNav from '@/components/navs/AdminNav';
import ManagerNav from '@/components/navs/ManagerNav';
import CustomerNav from '@/components/navs/CustomerNav';

/* ---------- types ---------- */
interface User {
  RegID: number;
  Name1: string;
  Name2: string;
  PhoneNo: number;
  Email: string;
  Gender: 'Male' | 'Female';
  RegType: 'Customer' | 'Manager' | 'Admin';
  accStatus: 'Pending' | 'Approved' | 'Inactive';
}

interface HeaderProps {
  user?: User;
}

/* ---------- component ---------- */
export default function Header({ user }: HeaderProps) {
  const pathname = usePathname(); // 🔎 current route
  const { t } = useTranslation();

  const [currentLang, setCurrentLang] = useState(
    (i18n.language as typeof locales[number]) || defaultLocale
  );
  const [open, setOpen] = useState(false);

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  // 🔁 Update language from external change
  useEffect(() => {
    const onChange = (lng: string) =>
      setCurrentLang(lng as typeof locales[number]);
    i18n.on('languageChanged', onChange);
    return () => i18n.off('languageChanged', onChange);
  }, []);

  // 🧱 Close language menu on outside click
  useEffect(() => {
    if (!open) return;

    const close = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        btnRef.current &&
        !btnRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  // 🌐 Switch language
  const handleSelect = (lng: typeof locales[number]) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  // 🧭 Routes to skip rendering nav
  const hideNavRoutes = ['/login', '/register', '/auth/login', '/auth/register'];
  const shouldShowNav = !hideNavRoutes.includes(pathname);

  // 📦 Role-based nav
  const renderNav = () => {
    if (!shouldShowNav) return null;

    switch (user?.RegType) {
      case 'Admin':
        return <AdminNav />;
      case 'Manager':
        return <ManagerNav />;
      case 'Customer':
        return <CustomerNav />;
      default:
        return null;
    }
  };

  return (
    <header className="fixed-top shadow-sm" id="top-strip" style={{ zIndex: 1020 }}>
      {/* 🟦 Top bar with brand and language switcher */}
      <div className="container py-3 text-white position-relative">
        <div className='title mx-auto'>
          <h2 className="m-0 text-center">
            {t('brand', { defaultValue: 'Aurum Domus ✨' })}
          </h2>
        </div>

        <div className="position-absolute end-0 top-50 translate-middle-y me-2">
          <button
            ref={btnRef}
            onClick={() => setOpen((v) => !v)}
            className="btn btn-sm text-white border-0"
            style={{ backgroundColor: '#0d6efd' }}
          >
            🌐 {currentLang.toUpperCase()}
          </button>

          {open && (
            <ul
              ref={menuRef}
              onClick={(e) => e.stopPropagation()}
              className="dropdown-menu show p-0 border-0 shadow-sm position-absolute"
              style={{
                right: 0,
                left: 'auto',
                backgroundColor: '#0d6efd',
                zIndex: 9999,
                pointerEvents: 'auto',
              }}
            >
              {locales.map((lng) => (
                <li key={lng}>
                  <button
                    className={`dropdown-item text-white${
                      lng === currentLang ? ' active fw-bold' : ''
                    }`}
                    style={{ backgroundColor: 'transparent' }}
                    type="button"
                    onClick={() => handleSelect(lng)}
                  >
                    {lng.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/*  Conditional nav based on route and user role */}
      {renderNav()}
    </header>
  );
}
