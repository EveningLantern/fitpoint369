import React, { useState } from 'react';
import AdminLoginModal from './AdminLoginModal';

export default function AdminLoginButton({ onLogin }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        id="admin-login-btn"
        onClick={() => setShowModal(true)}
        title="Admin Login"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 8000,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#1a1a1a',
          border: '1px solid #333',
          color: '#555',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#AAFF0066';
          e.currentTarget.style.color = '#AAFF00';
          e.currentTarget.style.boxShadow = '0 0 16px #AAFF0030';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#333';
          e.currentTarget.style.color = '#555';
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.4)';
        }}
      >
        🔐
      </button>

      {showModal && (
        <AdminLoginModal
          onClose={() => setShowModal(false)}
          onLogin={(user) => {
            setShowModal(false);
            onLogin(user);
          }}
        />
      )}
    </>
  );
}
