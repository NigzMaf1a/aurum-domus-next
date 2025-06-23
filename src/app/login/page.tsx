'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    alert(`Logging in with:\nEmail: ${email}\nBranch: ${branch}`);
  };

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center "
      style={{ padding: '1rem' }}
    >
      <div className="card p-4 shadow" style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Branch Dropdown */}
          <div className="mb-4">
            <label htmlFor="branch" className="form-label">
              Select Branch
            </label>
            <select
              id="branch"
              className="form-select"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose a branch...
              </option>
              <option value="north">North Branch</option>
              <option value="south">South Branch</option>
              <option value="east">East Branch</option>
              <option value="west">West Branch</option>
            </select>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <p className="mt-3 text-center">
            Don&apos;t have an account? <Link href="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
