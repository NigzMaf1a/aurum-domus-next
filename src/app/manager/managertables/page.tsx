'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// Bootstrap Modal types
declare global {
  interface Window {
    bootstrap?: {
      Modal: new (element: HTMLElement) => {
        show: () => void;
        hide: () => void;
      };
    };
  }
}

interface Table {
  TableID: number;
  UnitID: number;
  TableName: string;
  TableCapacity: number;
  TableStatus: 'Vacant' | 'Occupied';
}

const ManagerTablesPage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableName, setTableName] = useState('');
  const [tableCapacity, setTableCapacity] = useState<number>(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'danger'>('success');

  // Dummy UnitID — replace this with your real unit logic (e.g. from session or context)
  const unitID = 1;

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get('/api/managertables');
        if (Array.isArray(res.data)) {
          setTables(res.data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error(err);
        showAlert('Failed to fetch tables.', 'danger');
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const showModal = () => {
    const modalEl = document.getElementById('addTableModal');
    if (modalEl && window.bootstrap?.Modal) {
      new window.bootstrap.Modal(modalEl).show();
    }
  };

  const hideModal = () => {
    const modalEl = document.getElementById('addTableModal');
    if (modalEl && window.bootstrap?.Modal) {
      new window.bootstrap.Modal(modalEl).hide();
    }
  };

  const showAlert = (message: string, type: 'success' | 'danger') => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const handleAddTable = async () => {
    if (!tableName.trim() || tableCapacity <= 0) {
      showAlert('Please enter a valid table name and capacity.', 'danger');
      return;
    }

    try {
      const newTable = {
        UnitID: unitID,
        TableName: tableName.trim(),
        TableCapacity: tableCapacity,
        TableStatus: 'Vacant' as const,
      };

      const res = await axios.post('/api/managertables', newTable);

      setTables((prev) => [...prev, res.data]);
      hideModal();
      setTableName('');
      setTableCapacity(1);
      showAlert('Table added successfully!', 'success');
    } catch (err) {
      console.error(err);
      showAlert('Failed to add table.', 'danger');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 textColorless">Manager Tables</h2>

      {alertMessage && (
        <div className={`alert alert-${alertType} text-center`} role="alert">
          {alertMessage}
        </div>
      )}

      {loading ? (
        <p className="text-center text-muted">Loading tables...</p>
      ) : (
        <>
          <div className="overflow-auto mb-3" style={{ maxHeight: '60vh' }}>
            {tables.length === 0 ? (
              <p className="text-center text-muted">No tables found.</p>
            ) : (
              tables.map((table) => (
                <div key={table.TableID} className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{table.TableName}</h5>
                    <p className="card-text">
                      <strong>Capacity:</strong> {table.TableCapacity}
                    </p>
                    <p className="card-text">
                      <strong>Status:</strong>{' '}
                      <span className={`badge ${table.TableStatus === 'Vacant' ? 'bg-success' : 'bg-danger'}`}>
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
              Add New Table
            </button>
          </div>
        </>
      )}

      {/* Modal */}
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
              <h5 className="modal-title" id="addTableModalLabel">Add New Table</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Table Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="e.g. Table 1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Table Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  value={tableCapacity}
                  onChange={(e) => setTableCapacity(parseInt(e.target.value) || 1)}
                  min={1}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddTable}>
                Save Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerTablesPage;
