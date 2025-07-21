'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import i18n, { locales, defaultLocale } from '@/lib/i18n';

// Components
import AdminNav from '@/components/navs/AdminNav';
import ManagerNav from '@/components/navs/ManagerNav';
import CustomerNav from '@/components/navs/CustomerNav';
import AccountantNav from '@/components/navs/AccountantNav';
import UserProfileCard from '@/components/sections/Profile';
import Mode from '@/components/sections/Mode';

// Interfaces
import User from '@/interfaces/user';

interface HeaderProps {
  user?: User;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const [currentLang, setCurrentLang] = useState((i18n.language as typeof locales[number]) || defaultLocale);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [formData, setFormData] = useState(user);

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
    const onChange = (lng: string) => setCurrentLang(lng as typeof locales[number]);
    i18n.on('languageChanged', onChange);
    return () => i18n.off('languageChanged', onChange);
  }, []);

  useEffect(() => {
    const closeDropdowns = (e: MouseEvent) => {
      const target = e.target as Node;
      if (langOpen && !langBtnRef.current?.contains(target) && !langMenuRef.current?.contains(target)) {
        setLangOpen(false);
      }
      if (profileOpen && !profileBtnRef.current?.contains(target) && !profileMenuRef.current?.contains(target)) {
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleShowProfile = () => {
    setProfileOpen(false);
    setShowProfileModal(true);
  };

  const handleShowSettings = () => {
    setProfileOpen(false);
    setShowSettingsModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSettingsSave = () => {
    console.log('Updated user:', formData);
    setShowSettingsModal(false);
  };

  const hideNavRoutes = ['/login', '/register', '/auth/login', '/auth/register'];
  const shouldShowNav = !hideNavRoutes.includes(pathname);

  const renderNav = () => {
    if (!shouldShowNav) return null;
    switch (user?.RegType) {
      case 'Admin': return <AdminNav />;
      case 'Manager': return <ManagerNav />;
      case 'Customer': return <CustomerNav />;
      case 'Accountant': return <AccountantNav />;
      case 'Chef':
      case 'Waiter': return <CustomerNav />;
      default: return null;
    }
  };

  return (
    <>
      <header className="fixed-top shadow-sm d-flex align-items-center " id='top-strip' style={{ zIndex: 1020, height: '80px' }}>
        <div className="container py-3 text-white position-relative">
          {/* <div className="title mx-auto d-none d-md-block bg-primary">
            <h2 className="m-0 text-center">{t('brand', { defaultValue: 'Aurum Domus ✨' })}</h2>
          </div> */}

          <div className="position-absolute end-0 top-50 translate-middle-y d-flex align-items-center gap-3 me-2">
            <div className="position-relative">
              <button
                ref={langBtnRef}
                onClick={() => setLangOpen((v) => !v)}
                className="btn btn-sm text-white border-0" style={{ backgroundColor: '#64748b' }}
              >
                🌐 {languageLabels[currentLang]}
              </button>

              {langOpen && (
                <ul
                  ref={langMenuRef}
                  onClick={(e) => e.stopPropagation()}
                  className="dropdown-menu show p-0 border-0 shadow-sm"
                  style={{ top: '100%', position: 'absolute', zIndex: 9999, backgroundColor: '#343a40' }}
                >
                  {locales.map((lng) => (
                    <li key={lng}>
                      <button
                        className={`dropdown-item text-white${lng === currentLang ? ' active fw-bold' : ''}`}
                        style={{ backgroundColor: 'transparent' }}
                        onClick={() => handleSelect(lng)}
                      >
                        {languageLabels[lng]}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Mode Selector */}
            <Mode />

            <div
              ref={profileBtnRef}
              onClick={() => setProfileOpen((v) => !v)}
              className="d-flex justify-content-center align-items-center rounded-circle text-white"
              style={{ width: '50px', height: '50px', cursor: 'pointer', position: 'relative', backgroundColor: '#64748b' }}
            >
              <i className="bi bi-person fs-5"></i>

              {profileOpen && (
                <ul
                  ref={profileMenuRef}
                  onClick={(e) => e.stopPropagation()}
                  className="dropdown-menu show border-0 p-0 shadow"
                  style={{
                    position: 'absolute',
                    top: '55px',
                    right: 0,
                    minWidth: '200px',
                    borderRadius: '12px',
                    backgroundColor: '#343a40',
                    zIndex: 9999,
                  }}
                >
                  <li>
                    <button className="dropdown-item text-white py-2 px-3" onClick={handleShowProfile} style={{ cursor: 'pointer' 
                      
                    }}>
                      <i className="bi bi-person-circle me-2"></i> {t('myProfile')}
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-white py-2 px-3" onClick={handleShowSettings}>
                      <i className="bi bi-gear me-2"></i> {t('settings')}
                    </button>
                  </li>
                  <li><hr className="dropdown-divider bg-secondary m-0" /></li>
                  <li>
                    <button className="dropdown-item text-danger fw-bold py-2 px-3" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> {t('logout')}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {renderNav()}
      </header>

      {/* Profile Modal */}
      {showProfileModal && user && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">{t('myProfile')}</h5>
                <button type="button" className="btn-close" onClick={() => setShowProfileModal(false)}></button>
              </div>
              <div className="modal-body">
                <UserProfileCard user={user} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && formData && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">{t('settings')}</h5>
                <button type="button" className="btn-close" onClick={() => setShowSettingsModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" name="Name1" className="form-control" value={formData.Name1} onChange={handleFormChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" name="Name2" className="form-control" value={formData.Name2} onChange={handleFormChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" name="PhoneNo" className="form-control" value={formData.PhoneNo} onChange={handleFormChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="Email" className="form-control" value={formData.Email} onChange={handleFormChange} />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSettingsSave}>
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
