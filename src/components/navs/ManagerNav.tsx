"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Sidebar.module.css';

export default function ManagerNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Auto-close sidebar on route change
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleSidebar} className="btn btn-primary m-2 d-md-none">
        ☰ Menu
      </button>

      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''} d-md-none`}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/manager/dashboard" className={styles.link}>
              Dashboard
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/manager/orders" className={styles.link}>
              Orders
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/manager/settings" className={styles.link}>
              Settings
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/manager/reports" className={styles.link}>
              Reports
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
