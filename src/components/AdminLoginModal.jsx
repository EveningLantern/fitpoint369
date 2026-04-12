import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminLoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      onLogin(data.user);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#161616', border: '1px solid #AAFF0033',
        borderRadius: '20px', padding: '48px 40px', width: '100%', maxWidth: '420px',
        boxShadow: '0 0 60px #AAFF0020',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔐</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'white' }}>
            Admin <span style={{ color: 'var(--accent)' }}>Login</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px' }}>
            FitPoint369 Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              id="admin-email-input"
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              id="admin-password-input"
              style={{ marginBottom: 0 }}
            />
          </div>

          {error && (
            <div style={{
              background: '#FF444420', border: '1px solid #FF4444',
              color: '#FF6666', borderRadius: '8px', padding: '12px 16px',
              fontSize: '13px', marginBottom: '20px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            id="admin-login-submit"
            style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <button
          onClick={onClose}
          id="admin-login-close"
          style={{
            display: 'block', width: '100%', marginTop: '16px',
            background: 'none', border: 'none',
            color: 'var(--text-muted)', fontSize: '13px',
            cursor: 'pointer', textAlign: 'center',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
