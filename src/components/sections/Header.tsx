'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import i18n, { locales, defaultLocale } from '@/lib/i18n';

// Navigation components
import AdminNav from '@/components/navs/AdminNav';
import ManagerNav from '@/components/navs/ManagerNav';
import CustomerNav from '@/components/navs/CustomerNav';
import AccountantNav from '@/components/navs/AccountantNav';

// Interfaces/Enums/Scripts
import User from '@/interfaces/user';

interface HeaderProps {
  user?: User;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const [currentLang, setCurrentLang] = useState(
    (i18n.language as typeof locales[number]) || defaultLocale
  );
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const langBtnRef = useRef<HTMLButtonElement | null>(null);
  const langMenuRef = useRef<HTMLUListElement | null>(null);
  const profileBtnRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLUListElement | null>(null);

  const languageLabels: Record<typeof locales[number], string> = {
    en: 'English',
    sw: 'Swahili',
    fr: 'Français',
    de: 'Deutsch',
    pt: 'Português',
    es: 'Español',
    it: 'Italiano',
    zh: '中文',
  };

  useEffect(() => {
    const onChange = (lng: string) =>
      setCurrentLang(lng as typeof locales[number]);
    i18n.on('languageChanged', onChange);
    return () => i18n.off('languageChanged', onChange);
  }, []);

  useEffect(() => {
    const closeDropdowns = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        langOpen &&
        langBtnRef.current &&
        !langBtnRef.current.contains(target) &&
        langMenuRef.current &&
        !langMenuRef.current.contains(target)
      ) {
        setLangOpen(false);
      }

      if (
        profileOpen &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(target) &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, [langOpen, profileOpen]);

  const handleSelect = (lng: typeof locales[number]) => {
    if (lng !== i18n.language) {
      i18n.changeLanguage(lng).then(() => {
        setLangOpen(false);
        window.location.reload();
      });
    } else {
      setLangOpen(false);
    }
  };

  const hideNavRoutes = ['/login', '/register', '/auth/login', '/auth/register'];
  const shouldShowNav = !hideNavRoutes.includes(pathname);

  const renderNav = () => {
    if (!shouldShowNav) return null;

    switch (user?.RegType) {
      case 'Admin':
        return <AdminNav />;
      case 'Manager':
        return <ManagerNav />;
      case 'Customer':
        return <CustomerNav />;
      case 'Accountant':
        return <AccountantNav />;
      case 'Chef':
      case 'Waiter':
        return <CustomerNav />;
      default:
        return null;
    }
  };

  return (
    <header className="fixed-top shadow-sm d-flex align-items-center" id="top-strip" style={{ zIndex: 1020, height: '80px' }}>
      <div className="container py-3 text-white position-relative">
        {/* 🔥 Brand title only on md+ screens */}
        <div className="title mx-auto d-none d-md-block">
          <h2 className="m-0 mx-auto text-center">
            {t('brand', { defaultValue: 'Aurum Domus ✨' })}
          </h2>
        </div>

        {/* Language + Profile controls */}
        <div className="position-absolute end-0 top-50 translate-middle-y d-flex align-items-center gap-2 me-2">
          {/* 🌐 Language dropdown */}
          <div className="position-relative">
            <button
              ref={langBtnRef}
              onClick={() => setLangOpen((v) => !v)}
              className="btn btn-sm text-white border-0"
              style={{ backgroundColor: 'slateblue' }}
            >
              🌐 {languageLabels[currentLang]}
            </button>

            {langOpen && (
              <ul
                ref={langMenuRef}
                onClick={(e) => e.stopPropagation()}
                className="dropdown-menu show p-0 border-0 shadow-sm"
                style={{
                  top: '100%',
                  position: 'absolute',
                  backgroundColor: 'slateblue',
                  zIndex: 9999,
                  overflowY: 'auto',
                  maxHeight: '250px',
                  minWidth: '150px',
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
                      {languageLabels[lng] ?? lng.toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 👤 Profile dropdown */}
          <div
            ref={profileBtnRef}
            onClick={() => setProfileOpen((v) => !v)}
            className="d-flex justify-content-center align-items-center rounded-circle position-relative"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'slateblue',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <i className="bi bi-person fs-5"></i>

            {profileOpen && (
              <ul
                ref={profileMenuRef}
                onClick={(e) => e.stopPropagation()}
                className="dropdown-menu show p-2 border-0 shadow-sm"
                style={{
                  top: '55px',
                  right: 0,
                  position: 'absolute',
                  backgroundColor: 'slateblue',
                  zIndex: 9999,
                  minWidth: '160px',
                }}
              >
                <li>
                  <button className="dropdown-item text-white" type="button">
                    {t('myProfile')}
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-white" type="button">
                    {t('settings')}
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider bg-white" />
                </li>
                <li>
                  <button className="dropdown-item text-white" type="button">
                    {t('logout')}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {renderNav()}
    </header>
  );
}
