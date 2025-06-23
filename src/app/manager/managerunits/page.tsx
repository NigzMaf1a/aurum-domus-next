'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [units, setUnits] = useState<Unit[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [unitName, setUnitName] = useState('');
  const [unitEmail, setUnitEmail] = useState('');
  const [unitPhone, setUnitPhone] = useState('');
  const [unitLocation, setUnitLocation] = useState('');
  const [unitBalance, setUnitBalance] = useState<number>(0);
  const [employees, setEmployees] = useState<number>(0);

  const fetchUnits = async () => {
    try {
      const response = await axios.get('/api/managerunits');
      setUnits(response.data);
    } catch {
      alert('Failed to load units.');
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleAddUnit = async () => {
    try {
      const newUnit = {
        UnitName: unitName,
        UnitEmail: unitEmail,
        UnitPhone: unitPhone,
        UnitLocation: unitLocation,
        UnitBalance: unitBalance,
        Employees: employees,
      };
      await axios.post('/api/managerunits', newUnit);
      alert('Unit added successfully!');
      setShowModal(false);
      fetchUnits();
    } catch {
      alert('Error adding unit. Please check your input and try again.');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 textColorless">Manager Units</h2>

      <div style={{ maxHeight: '500px', overflowY: 'auto' }} className="mb-4">
        <div className="row g-3">
          {units.map(unit => (
            <div key={unit.UnitID} className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5>Unit ID: {unit.UnitID}</h5>
                  <p><strong>Name:</strong> {unit.UnitName}</p>
                  <p><strong>Email:</strong> {unit.UnitEmail}</p>
                  <p><strong>Phone:</strong> {unit.UnitPhone}</p>
                  <p><strong>Location:</strong> {unit.UnitLocation}</p>
                  <p><strong>Balance:</strong> KES {unit.UnitBalance.toFixed(2)}</p>
                  <p><strong>Employees:</strong> {unit.Employees}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button variant="primary" onClick={() => setShowModal(true)}>Add Unit</Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Unit Name</Form.Label>
              <Form.Control
                type="text"
                value={unitName}
                onChange={e => setUnitName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit Email</Form.Label>
              <Form.Control
                type="email"
                value={unitEmail}
                onChange={e => setUnitEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit Phone</Form.Label>
              <Form.Control
                type="text"
                value={unitPhone}
                onChange={e => setUnitPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit Location</Form.Label>
              <Form.Control
                type="text"
                value={unitLocation}
                onChange={e => setUnitLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit Balance</Form.Label>
              <Form.Control
                type="number"
                value={unitBalance}
                onChange={e => setUnitBalance(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Employees</Form.Label>
              <Form.Control
                type="number"
                value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddUnit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
