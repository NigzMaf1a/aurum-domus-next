"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import styles from "@/styles/Sidebar.module.css";

export default function CustomerNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => setIsOpen(false), [pathname]);

  const toggle = () => setIsOpen((v) => !v);

  return (
    <>
      <button
        aria-label={t("menu")}
        className={styles.toggleBtn}
        onClick={toggle}
      >
        ☰ {t("menu")}
      </button>

      {isOpen && <div className={styles.overlay} onClick={toggle} />}

      <nav
        id="sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      >
        <ul className={styles.list}>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/waiter/dashboard" id={styles.link}>
                <i className="bi bi-speedometer2 me-2 fs-5" /> {t("dashboard")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/waiter/tables" id={styles.link}>
                <i className="bi bi-grid-3x3-gap me-2 fs-5" /> {t("tables")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/waiter/orders" id={styles.link}>
                <i className="bi bi-receipt-cutoff me-2 fs-5" /> {t("orders")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/waiter/reservations" id={styles.link}>
                <i className="bi bi-calendar-check me-2 fs-5" />{" "}
                {t("reservations")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/waiter/feedback" id={styles.link}>
                <i className="bi bi-chat-dots me-2 fs-5" /> {t("feedback")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/waiter/bio" id={styles.link}>
                <i className="bi bi-person-circle me-2 fs-5" /> {t("bio")}
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}
