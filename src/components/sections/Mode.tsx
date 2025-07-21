'use client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { startThemeCycle } from '@/utilscripts/themeSwitcher';

export default function Mode() {
  const { t } = useTranslation();  
  const [mode, setMode] = useState<string>(() => {
    // Load saved theme from localStorage or default to 'light'
    return typeof window !== 'undefined'
      ? localStorage.getItem('themeMode') || 'light'
      : 'light';
  });

  useEffect(() => {
    // Save the selected theme mode
    localStorage.setItem('themeMode', mode);

    // Reset class and styling
    document.body.className = '';
    const sidebar = document.getElementById('sidebar');
    const topStrip = document.getElementById('top-strip');

    if (sidebar) sidebar.style.backgroundImage = '';
    if (topStrip) topStrip.style.backgroundColor = '';

    // Apply theme mode
    if (mode === 'light') {
      document.body.classList.add('light');
    } else if (mode === 'dark') {
      document.body.classList.add('dark');
    } else if (mode === 'picture') {
      document.body.classList.add('picture'); // if you're styling by class too
      startThemeCycle();
    }
  }, [mode]);

  return (
    <select
      value={mode}
      onChange={(e) => setMode(e.target.value)}
      className="form-select form-select-sm text-white border-0"
      style={{ width: '110px', backgroundColor: '#64748b'}}
    >
      <option value="light">{t('light')}</option>
      <option value="dark">{t('dark')}</option>
      <option value="picture">{t('picture')}</option>
    </select>
  );
}
