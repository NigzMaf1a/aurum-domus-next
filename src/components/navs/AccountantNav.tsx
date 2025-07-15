'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Sidebar.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons

export default function ManagerNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  // Close sidebar on route change
  useEffect(() => setIsOpen(false), [pathname]);

  const toggle = () => setIsOpen(v => !v);

  return (
    <>
      {/* Burger button (fixed above header) */}
      <button
        aria-label={t('menu')}
        className={styles.toggleBtn}
        onClick={toggle}
      >
        <i className="bi bi-list me-2" /> {t('menu')}
      </button>

      {/* Backdrop overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggle} />}

      {/* Slide-in Sidebar */}
      <nav
        id="sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
      >
        <ul className={styles.list}>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/accountant/dashboard" id={styles.link}>
                <i className="bi bi-speedometer2 me-2 fs-5" /> {t('dashboard')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/accountant/payments/pending" id={styles.link}>
                <i className="bi bi-hourglass-split me-2 fs-5" /> {t('pending')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/accountant/payments/approved" id={styles.link}>
                <i className="bi bi-check-circle me-2 fs-5" /> {t('approved')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/accountant/payments/rejected" id={styles.link}>
                <i className="bi bi-x-octagon me-2 fs-5" /> {t('rejected')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/accountant/payments/add" id={styles.link}>
                <i className="bi bi-plus-circle me-2 fs-5" /> {t('add')}
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}
