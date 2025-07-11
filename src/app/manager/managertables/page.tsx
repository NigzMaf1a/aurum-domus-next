'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';                      // Live API (disabled in mock mode)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import mockTables from '../../utilscripts/mockTables.json'; // Local mock data

/* ---------- Bootstrap Modal types ---------- */
declare global {
  interface Window {
    bootstrap?: {
      Modal: new (el: HTMLElement) => { show: () => void; hide: () => void };
    };
  }
}

/* ---------- Types ---------- */
interface Table {
  TableID: number;
  UnitID: number;
  TableName: string;
  TableCapacity: number;
  TableStatus: 'Vacant' | 'Occupied';
}

const ManagerTablesPage: React.FC = () => {
  /* ---------- State ---------- */
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableName, setTableName] = useState('');
  const [tableCapacity, setTableCapacity] = useState<number>(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'danger'>('success');
  const { t } = useTranslation();

  // Dummy UnitID — replace with your real unit logic later
  const unitID = 1;

  /* ---------- Fetch (mock) ---------- */
  useEffect(() => {
    /* LIVE ENDPOINT
    const fetchTables = async () => {
      try {
        const res = await axios.get('/api/managertables');
        if (Array.isArray(res.data)) setTables(res.data);
        else throw new Error('Invalid data format');
      } catch (err) {
        console.error(err);
        showAlert('Failed to fetch tables.', 'danger');
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
    */

    // MOCK MODE
    setTables(mockTables as Table[]);
    setLoading(false);
  }, []);

  /* ---------- Helpers ---------- */
  const showModal = () => {
    const el = document.getElementById('addTableModal');
    if (el && window.bootstrap?.Modal) new window.bootstrap.Modal(el).show();
  };

  const hideModal = () => {
    const el = document.getElementById('addTableModal');
    if (el && window.bootstrap?.Modal) new window.bootstrap.Modal(el).hide();
  };

  const showAlert = (msg: string, type: 'success' | 'danger') => {
    setAlertMessage(msg);
    setAlertType(type);
    setTimeout(() => setAlertMessage(''), 3000);
  };

  /* ---------- Add Table ---------- */
  const handleAddTable = async () => {
    if (!tableName.trim() || tableCapacity <= 0) {
      showAlert('Please enter a valid table name and capacity.', 'danger');
      return;
    }

    /* LIVE ENDPOINT
    try {
      const newTable = {
        UnitID: unitID,
        TableName: tableName.trim(),
        TableCapacity: tableCapacity,
        TableStatus: 'Vacant' as const
      };
      const res = await axios.post('/api/managertables', newTable);
      setTables(prev => [...prev, res.data]);
      hideModal();
      showAlert('Table added successfully!', 'success');
    } catch (err) {
      console.error(err);
      showAlert('Failed to add table.', 'danger');
    }
    */

    // MOCK SUCCESS
    const newTable: Table = {
      TableID: tables.length ? Math.max(...tables.map(t => t.TableID)) + 1 : 1,
      UnitID: unitID,
      TableName: tableName.trim(),
      TableCapacity: tableCapacity,
      TableStatus: 'Vacant'
    };
    setTables(prev => [...prev, newTable]);
    hideModal();
    setTableName('');
    setTableCapacity(1);
    showAlert('Table added successfully!', 'success');
  };

  /* ---------- UI ---------- */
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 textColorless">{t('managerTables')}</h2>

      {alertMessage && (
        <div className={`alert alert-${alertType} text-center`} role="alert">
          {alertMessage}
        </div>
      )}

      {loading ? (
        <p className="text-center text-muted">{t('loadingTables')}</p>
      ) : (
        <>
          <div className="overflow-auto mb-3" style={{ maxHeight: '60vh' }}>
            {tables.length === 0 ? (
              <p className="text-center text-muted">{t('noTables')}</p>
            ) : (
              tables.map(table => (
                <div key={table.TableID} className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{table.TableName}</h5>
                    <p className="card-text">
                      <strong>{t('capacity')}:</strong> {table.TableCapacity}
                    </p>
                    <p className="card-text">
                      <strong>{t('status')}:</strong>{' '}
                      <span
                        className={`badge ${
                          table.TableStatus === 'Vacant' ? 'bg-success' : 'bg-danger'
                        }`}
                      >
                        {table.TableStatus}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center">
            <button className="btn btn-primary" onClick={showModal}>
              {t('addTable')}
            </button>
          </div>
        </>
      )}

      {/* ---------- Modal ---------- */}
      <div
        className="modal fade"
        id="addTableModal"
        tabIndex={-1}
        aria-labelledby="addTableModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTableModalLabel">
                {t('addTable')}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">{t('tableName')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={tableName}
                  onChange={e => setTableName(e.target.value)}
                  placeholder="e.g. Table 1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">{t('tableCapacity')}</label>
                <input
                  type="number"
                  className="form-control"
                  value={tableCapacity}
                  onChange={e =>
                    setTableCapacity(parseInt(e.target.value) || 1)
                  }
                  min={1}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                {t('cancel')}
              </button>
              <button className="btn btn-primary" onClick={handleAddTable}>
                {t('saveTable')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerTablesPage;
