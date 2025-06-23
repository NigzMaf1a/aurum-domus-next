"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Sidebar.module.css';

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <>
      {/* Toggle Button (top-left) */}
      <button
        onClick={toggleSidebar}
        className="btn btn-primary m-2 position-fixed d-md-none"
        style={{ zIndex: 1050 }}
        aria-label="Toggle Sidebar"
      >
        ☰ Menu
      </button>

      {/* Overlay (visible only when open on mobile) */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <nav id="sidebar" className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.list}>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/dashboard" id={styles.link}>
                <i className="bi bi-speedometer2 me-2 fs-4"></i>Dashboard
              </Link>
            </li>
          </div>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/pending" id={styles.link}>
                <i className="bi bi-hourglass-split me-2 fs-4"></i>Pending
              </Link>
            </li>
          </div>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/approved" id={styles.link}>
                <i className="bi bi-check-circle me-2 fs-4"></i>Approved
              </Link>
            </li>
          </div>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/inactive" id={styles.link}>
                <i className="bi bi-person-x me-2 fs-4"></i>Inactive
              </Link>
            </li>
          </div>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/support" id={styles.link}>
                <i className="bi bi-life-preserver me-2 fs-4"></i>Support
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}
