'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Sidebar.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';   // <-- icons

export default function ManagerNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  /* close sidebar whenever the route changes */
  useEffect(() => setIsOpen(false), [pathname]);

  const toggle = () => setIsOpen(v => !v);

  return (
    <>
      {/* burger button (fixed above header) */}
      <button
        aria-label={t('menu')}
        className={styles.toggleBtn}
        onClick={toggle}
      >
        ☰ {t('menu')}
      </button>

      {/* backdrop */}
      {isOpen && <div className={styles.overlay} onClick={toggle} />}

      {/* slide‑in sidebar */}
      <nav
        id="sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
      >
        <ul className={styles.list}>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managerdashboard" id={styles.link}>
                <i className="bi bi-speedometer2 me-2 fs-4" /> {t('dashboard')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managerstock" id={styles.link}>
                <i className="bi bi-layers me-2 fs-4" /> {t('stock')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managerdishes" id={styles.link}>
                <i className="bi bi-egg-fried me-2 fs-4" /> {t('dishes')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managerorders" id={styles.link}>
                <i className="bi bi-cart3 me-2 fs-4" /> {t('orders')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managerpayments" id={styles.link}>
                <i className="bi bi-cash-stack me-2 fs-4" /> {t('payments')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managerreservations" id={styles.link}>
                <i className="bi bi-calendar-check me-2 fs-4" /> {t('reservations')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managerunits" id={styles.link}>
                <i className="bi bi-building me-2 fs-4" /> {t('units')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managertables" id={styles.link}>
                <i className="bi bi-table me-2 fs-4" /> {t('tables')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managerfeedback" id={styles.link}>
                <i className="bi bi-chat-dots me-2 fs-4" /> {t('feedback')}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/manager/managerbio" id={styles.link}>
                <i className="bi bi-card-text me-2 fs-4" /> {t('bio')}
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}
