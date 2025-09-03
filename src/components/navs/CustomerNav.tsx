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

  useEffect(() => setIsOpen(false), [pathname]);

  const toggle = () => setIsOpen(v => !v);

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

      <nav id="sidebar" className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.list}>
          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/reservations" id={styles.link}>
                {t("reservations")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/tables" id={styles.link}>
                {t("tables")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/orders" id={styles.link}>
                {t("orders")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/payments" id={styles.link}>
                {t("payments")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/feedback" id={styles.link}>
                {t("feedback")}
              </Link>
            </li>
          </div>

          <div className={styles.sidebarDiv}>
            <li className={styles.listItem}>
              <Link href="/customer/bio" id={styles.link}>
                {t("bio")}
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}
