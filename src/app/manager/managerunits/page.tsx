'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';                       //Live API (disabled in mock mode)
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import mockUnits from '../../../utilscripts/mockUnits.json';   //Local mock data

/* ---------- Types ---------- */
interface Unit {
  UnitID: number;
  UnitName: string;
  UnitEmail: string;
  UnitPhone: string;
  UnitLocation: string;
  UnitBalance: number;
  Employees: number;
}

export default function ManagerUnitsPage() {
  /* ---------- State ---------- */
  const [units, setUnits] = useState<Unit[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [unitName, setUnitName] = useState('');
  const [unitEmail, setUnitEmail] = useState('');
  const [unitPhone, setUnitPhone] = useState('');
  const [unitLocation, setUnitLocation] = useState('');
  const [unitBalance, setUnitBalance] = useState<number>(0);
  const [employees, setEmployees] = useState<number>(0);
  const { t } = useTranslation();

  /* ---------- Fetch (mock) ---------- */
  const fetchUnits = async () => {
    /* LIVE ENDPOINT
    try {
      const response = await axios.get('/api/managerunits');
      setUnits(response.data);
    } catch {
      alert('Failed to load units.');
    }
    */

    // MOCK MODE: load local JSON
    setUnits(mockUnits as Unit[]);
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  /* ---------- Add Unit ---------- */
  const handleAddUnit = async () => {
    /* LIVE ENDPOINT
    try {
      const newUnit = {
        UnitName: unitName,
        UnitEmail: unitEmail,
        UnitPhone: unitPhone,
        UnitLocation: unitLocation,
        UnitBalance: unitBalance,
        Employees: employees
      };
      await axios.post('/api/managerunits', newUnit);
      alert('Unit added successfully!');
      setShowModal(false);
      fetchUnits();
    } catch {
      alert('Error adding unit. Please check your input and try again.');
    }
    */

    // MOCK SUCCESS
    const newUnit: Unit = {
      UnitID: units.length ? Math.max(...units.map(u => u.UnitID)) + 1 : 1,
      UnitName: unitName,
      UnitEmail: unitEmail,
      UnitPhone: unitPhone,
      UnitLocation: unitLocation,
      UnitBalance: unitBalance,
      Employees: employees
    };
    setUnits(prev => [...prev, newUnit]);
    setShowModal(false);
  };

  /* ---------- UI ---------- */
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 textColorless">{t('managerUnits')}</h2>

      <div style={{ maxHeight: '500px', overflowY: 'auto' }} className="mb-4">
        <div className="row g-3">
          {units.map(unit => (
            <div key={unit.UnitID} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>{t('unitID')}: {unit.UnitID}</h5>
                  <p><strong>{t('name')}:</strong> {unit.UnitName}</p>
                  <p><strong>{t('email')}:</strong> {unit.UnitEmail}</p>
                  <p><strong>{t('phone')}:</strong> {unit.UnitPhone}</p>
                  <p><strong>{t('location')}:</strong> {unit.UnitLocation}</p>
                  <p><strong>{t('balance')}:</strong> {t('kshs')} {unit.UnitBalance.toFixed(2)}</p>
                  <p><strong>{t('employees')}:</strong> {unit.Employees}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          {t('addNewUnit')}
        </Button>
      </div>

      {/* ---------- Modal ---------- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('addNewUnit')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t('unitName')}</Form.Label>
              <Form.Control
                type="text"
                value={unitName}
                onChange={e => setUnitName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('unitEmail')}</Form.Label>
              <Form.Control
                type="email"
                value={unitEmail}
                onChange={e => setUnitEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('unitPhone')}</Form.Label>
              <Form.Control
                type="text"
                value={unitPhone}
                onChange={e => setUnitPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('unitLocation')}</Form.Label>
              <Form.Control
                type="text"
                value={unitLocation}
                onChange={e => setUnitLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('unitBalance')}</Form.Label>
              <Form.Control
                type="number"
                value={unitBalance}
                onChange={e => setUnitBalance(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('employees')}</Form.Label>
              <Form.Control
                type="number"
                value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t('cancel')}
          </Button>
          <Button variant="success" onClick={handleAddUnit}>
            {t('submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
