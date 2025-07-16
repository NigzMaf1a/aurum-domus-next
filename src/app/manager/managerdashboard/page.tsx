'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ManagerCardData {
  title: string;
  theme: string;
  messages: string[];
}

export default function ManagerDashboardPage() {
  const [data, setData] = useState<ManagerCardData[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    // API fetching placeholder — replace with real API call if needed
    /*
    import axios from 'axios';
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/api/managerdashboard');
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    fetchDashboardData();
    */

    // Set hardcoded JSON data
    import('../../../utilscripts/mockManagerDashboard.json')
      .then((module) => setData(module.default))
      .catch((err) => console.error('Failed to load dashboard data', err));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 textColorless">{t('managerDashboard')}</h1>
      <div className="row" id="cardCont">
        {data.map((card, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-3 mb-4">
            <div className={`card shadow-sm h-100 ${card.theme}`}>
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                {card.messages.map((msg, i) => (
                  <p key={i} className="card-text">{msg}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
