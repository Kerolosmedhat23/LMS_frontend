import { useState } from 'react';
import { register, login, me, logout } from '../../src/api/auth';

function AuthDemo() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('Idle');

  const handleRegister = async () => {
    setStatus('Registering...');
    try {
      const u = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password,
      });
      setUser(u);
      setStatus('Registered');
    } catch (err) {
      setStatus(err?.response?.data?.message || 'Register failed');
    }
  };

  const handleLogin = async () => {
    setStatus('Logging in...');
    try {
      const u = await login({ email: form.email, password: form.password });
      setUser(u);
      setStatus('Logged in');
    } catch (err) {
      setStatus(err?.response?.data?.message || 'Login failed');
    }
  };

  const handleMe = async () => {
    setStatus('Loading user...');
    try {
      const u = await me();
      setUser(u);
      setStatus('Loaded current user');
    } catch (err) {
      setStatus(err?.response?.data?.message || 'Failed to load user');
    }
  };

  const handleLogout = async () => {
    setStatus('Logging out...');
    try {
      await logout();
      setUser(null);
      setStatus('Logged out');
    } catch (err) {
      setStatus(err?.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '2rem auto', display: 'grid', gap: '0.75rem' }}>
      <h2>Auth Demo</h2>
      <input
        placeholder="Name (register)"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleMe}>Me</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <strong>Status:</strong> {status}
      </div>
      <pre style={{ background: '#f7f7f7', padding: '0.75rem' }}>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default AuthDemo;
