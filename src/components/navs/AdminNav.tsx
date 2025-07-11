"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import styles from "@/styles/Sidebar.module.css";

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname           = usePathname();
  const { t }              = useTranslation();

  /* auto‑close after route change */
  useEffect(() => setIsOpen(false), [pathname]);

  const toggle = () => setIsOpen(v => !v);

  return (
    <>
      {/* 🟦 burger button — fixed top‑left, floats above Header */}
      <button
        aria-label={t("menu")}
        className={styles.toggleBtn}
        onClick={toggle}
      >
        ☰ {t("menu")}
      </button>

      {/* dim backdrop */}
      {isOpen && <div className={styles.overlay} onClick={toggle} />}

      {/* slide‑in nav */}
      <nav id="sidebar" className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.list}>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/dashboard" id={styles.link}>
                <i className="bi bi-speedometer2 me-2 fs-4" />
                {t("dashboard")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/pending" id={styles.link}>
                <i className="bi bi-hourglass-split me-2 fs-4" />
                {t("pending")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/approved" id={styles.link}>
                <i className="bi bi-check-circle me-2 fs-4" />
                {t("approved")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/inactive" id={styles.link}>
                <i className="bi bi-person-x me-2 fs-4" />
                {t("inactive")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/support" id={styles.link}>
                <i className="bi bi-life-preserver me-2 fs-4" />
                {t("support")}
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}
