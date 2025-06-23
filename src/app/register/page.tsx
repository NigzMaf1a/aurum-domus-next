'use client';

import { useState } from 'react';
import Link from 'next/link';
import validateFields from '../utilscripts/validateFields';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    regType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = validateFields(
        formData.name1,
        formData.name2,
        formData.phone,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.gender,
        formData.regType
      );

      // If validation passes, do something with validated fields
      alert(`Validation Passed! 🚀\n\n${JSON.stringify(validated, null, 2)}`);

      // Optional: Proceed to send data to backend here

    } catch (error) {
      alert(`⚠️ Validation Error:\n${error}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '1rem' }}>
      <div
        className="card shadow p-4"
        id="register-form"
        style={{
          minWidth: '320px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name1 */}
          <div className="mb-3">
            <label htmlFor="name1" className="form-label">First Name</label>
            <input
              type="text"
              id="name1"
              name="name1"
              className="form-control"
              value={formData.name1}
              onChange={handleChange}
              required
            />
          </div>

          {/* Name2 */}
          <div className="mb-3">
            <label htmlFor="name2" className="form-label">Last Name</label>
            <input
              type="text"
              id="name2"
              name="name2"
              className="form-control"
              value={formData.name2}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender Dropdown */}
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              id="gender"
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* RegType Dropdown */}
          <div className="mb-4">
            <label htmlFor="regType" className="form-label">Registration Type</label>
            <select
              id="regType"
              name="regType"
              className="form-select"
              value={formData.regType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select role...</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">Register</button>
          <p className="mt-3 text-center">
            Already have an account? <Link href="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
