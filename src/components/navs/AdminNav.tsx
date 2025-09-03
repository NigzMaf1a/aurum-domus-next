"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import styles from "@/styles/Sidebar.module.css";

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  // auto-close after route change
  useEffect(() => setIsOpen(false), [pathname]);

  const toggle = () => setIsOpen(v => !v);

  return (
    <>
      {/* burger button — fixed top-left */}
      <button
        aria-label={t("menu")}
        className={styles.toggleBtn}
        onClick={toggle}
      >
        <i className="bi bi-list me-2 fs-4"></i> {t("menu")}
      </button>

      {/* dim backdrop */}
      {isOpen && <div className={styles.overlay} onClick={toggle} />}

      {/* slide-in nav */}
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
              <Link href="/admin/accounts" id={styles.link}>
                <i className="bi bi-people-fill me-2 fs-4" />
                {t("accounts")}
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

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/payments" id={styles.link}>
                <i className="bi bi-credit-card me-2 fs-4" />
                {t("payments")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/admin/feedback" id={styles.link}>
                <i className="bi bi-chat-dots me-2 fs-4" />
                {t("feedback")}
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}
