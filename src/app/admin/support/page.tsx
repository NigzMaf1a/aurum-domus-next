'use client';

import React, { useState } from 'react';
import { Accordion, Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';

export default function AdminSupportPage() {
  // Modal control states
  const [showAddUser, setShowAddUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Form handlers
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy success logic
    alert('✅ User added successfully!');
    setShowAddUser(false);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy success logic
    alert('🔒 Password changed successfully!');
    setShowChangePassword(false);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center textColorless">🛠 Admin Support Dashboard</h2>

      {/* Section 1: FAQs */}
      <section className="mb-5">
        <div className="bg-light p-4 rounded">
          <h4 className="mb-3">📚 Frequently Asked Questions</h4>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do I reset my password?</Accordion.Header>
              <Accordion.Body>
                Navigate to &quot;Change Password&quot; at the bottom of this page and click &quot;Change&quot;.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Where can I add a new user?</Accordion.Header>
              <Accordion.Body>
                Navigate to &quot;Add User&quot; on this page and click &quot;Add&quot;.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How to approve a user?</Accordion.Header>
              <Accordion.Body>
                Click &quot;Pending&quot; on the side menu and then click the &quot;Approve&quot; button on the respective user in the pending users page.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>How to deactivate a user?</Accordion.Header>
              <Accordion.Body>
                Click &quot;Approved&quot; on the side menu and then click the &quot;Deactivate&quot; button on the respective user in the approved users page.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>How to reactivate a user?</Accordion.Header>
              <Accordion.Body>
                Click &quot;Inactive&quot; on the side menu and then click the &quot;Reactivate&quot; button on the respective user in the inactive users page.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>

      {/* Section 2: Contact Support */}
      <section className="mb-5">
        <div className="bg-light p-4 rounded">
          <h4 className="mb-3">📞 Contact Support</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <Card className="h-100 border-0">
                <Card.Body>
                  <Card.Title>Email & Phone</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> admin.support@aurumdomus.com<br />
                    <strong>Instagram:</strong> Aurum Domus<br />
                    <strong>Facebook:</strong> Aurum Domus<br />
                    <strong>Twitter:</strong> Aurum Domus<br />
                    <strong>Phone:</strong> +254 759 736 096<br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="h-100 border-0">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                  <Card.Title>Add User</Card.Title>
                  <Card.Text>
                    Click the button below to add a new user.
                  </Card.Text>
                  <Button variant="primary" className="mt-2" onClick={() => setShowAddUser(true)}>Add</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: System Status */}
      <section className="mb-5">
        <div className="bg-light p-4 rounded">
          <h4 className="mb-3">📊 System Health</h4>
          <div className="row g-3">
            <div className="col-sm-6 col-lg-3">
              <Card className="text-center border-0">
                <Card.Body>
                  <Card.Title>🟢 Uptime</Card.Title>
                  <Card.Text>99.98%</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-sm-6 col-lg-3">
              <Card className="text-center border-0">
                <Card.Body>
                  <Card.Title>🔧 API Status</Card.Title>
                  <Card.Text>All services operational</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-sm-6 col-lg-3">
              <Card className="text-center border-0">
                <Card.Body>
                  <Card.Title>📦 Backups</Card.Title>
                  <Card.Text>Last backup: 2 hrs ago</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-sm-6 col-lg-3">
              <Card className="text-center border-0">
                <Card.Body>
                  <Card.Title>🔍 Logs</Card.Title>
                  <Card.Text>12 new entries today</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Change Password */}
      <section className="d-flex flex-column justify-content-center align-items-center text-center">
        <div className="col-4 d-flex flex-column justify-content-center align-items-center bg-light p-4 rounded">
          <h5 className="mb-3">Change Password</h5>
          <Button
            variant="outline-secondary"
            className="bg-primary text-light"
            onClick={() => setShowChangePassword(true)}
          >
            Change
          </Button>
        </div>
      </section>

      {/* Modal: Add User */}
      <Modal show={showAddUser} onHide={() => setShowAddUser(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddUserSubmit}>
          <Modal.Body>
            <Row className="mb-2">
              <Col><Form.Control placeholder="First Name" required /></Col>
              <Col><Form.Control placeholder="Second Name" required /></Col>
            </Row>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Phone" type="tel" required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Email" type="email" required />
            </Form.Group>
            <Row className="mb-2">
              <Col><Form.Control placeholder="Password" type="password" required /></Col>
              <Col><Form.Control placeholder="Confirm Password" type="password" required /></Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Select required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select required>
                  <option value="">Select RegType</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Customer">Customer</option>
                </Form.Select>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal: Change Password */}
      <Modal show={showChangePassword} onHide={() => setShowChangePassword(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleChangePasswordSubmit}>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Current Password" type="password" required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control placeholder="New Password" type="password" required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Confirm New Password" type="password" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
