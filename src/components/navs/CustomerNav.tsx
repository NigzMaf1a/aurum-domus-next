"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import styles from "@/styles/Sidebar.module.css";

export default function CustomerNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname           = usePathname();
  const { t }              = useTranslation();

  /* close sidebar on route change */
  useEffect(() => setIsOpen(false), [pathname]);

  const toggle = () => setIsOpen(v => !v);

  return (
    <>
      {/* burger button (fixed above header) */}
      <button
        aria-label={t("menu")}
        className={styles.toggleBtn}
        onClick={toggle}
      >
        ☰ {t("menu")}
      </button>

      {/* backdrop */}
      {isOpen && <div className={styles.overlay} onClick={toggle} />}

      {/* slide‑in nav */}
      <nav id="sidebar" className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.list}>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/customerreservations" id={styles.link}>
                {t("reservations")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/customertables" id={styles.link}>
                {t("tables")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/customerorders" id={styles.link}>
                {t("orders")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/customerpayments" id={styles.link}>
                {t("payments")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/customerfeedback" id={styles.link}>
                {t("feedback")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/customerbio" id={styles.link}>
                {t("bio")}
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}
