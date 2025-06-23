import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !branch || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Add your email format regex if you want

    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, branch, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await res.json();
      console.log('Login success:', data);
      // TODO: Handle token, redirect, etc.

     } catch (err) {
        if (err instanceof Error) {
              setError(err.message);
        } else {
              setError(String(err)); 
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '1rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
        {error && (
          <div
            style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '4px',
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="selectBranch" className="form-label">
              Branch
            </label>
            <select
              id="selectBranch"
              name="selectBranch"
              className="form-select"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              disabled={loading}
              required
            >
              <option value="">-- Select a Unit --</option>
              {/* TODO: dynamically populate these options */}
              <option value="Unit1">Unit 1</option>
              <option value="Unit2">Unit 2</option>
              <option value="Unit3">Unit 3</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
