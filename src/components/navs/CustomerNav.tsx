"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Sidebar.module.css';

export default function CustomerNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Auto-close sidebar when navigating
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
            <Link href="/customer/customerreservations" className={styles.link}>
              Reservations
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/customer/customertables" className={styles.link}>
              Tables
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/customer/customerorders" className={styles.link}>
              Orders
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/customer/customerpayments" className={styles.link}>
              Payments
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/customer/customerfeedback" className={styles.link}>
              Feedback
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/customer/customerbio" className={styles.link}>
              Bio
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
