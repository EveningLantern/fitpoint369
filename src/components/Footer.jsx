import React from 'react';

export default function Footer({ style = {} }) {
  return (
    <footer className="site-footer" style={{ ...style, borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', marginTop: 'auto', padding: '40px max(5vw, 40px)', textAlign: 'center' }}>
      <div className="footer-text">
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'white', letterSpacing: '1px' }}>
          FitPoint<span className="accent">369</span>
        </span>
        <br />
        <div style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8' }}>
          <div>Email: <a href="mailto:fitpoint369official@gmail.com" style={{ color: 'white' }}>fitpoint369official@gmail.com</a></div>
          <div>Phone: <a href="tel:8910053146" style={{ color: 'white' }}>8910053146</a></div>
        </div>

        {/* Social Icons */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="https://www.facebook.com/share/1H2w1YJFHi/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://www.instagram.com/suvodip_lifestyle_coach?utm_source=qr&igsh=bXNvdm9mdXhzYzl6" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
        <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>© 2025 FitPoint369. All rights reserved.</span>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-admin-login'))}
            style={{
              background: 'transparent',
              border: '1px solid var(--text-muted)',
              borderRadius: '4px',
              color: 'var(--text-muted)',
              fontSize: '10px',
              cursor: 'pointer',
              opacity: 0.6,
              transition: 'all 0.2s ease',
              padding: '4px 8px',
              textTransform: 'lowercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = 0.6;
              e.currentTarget.style.borderColor = 'var(--text-muted)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            admin login
          </button>
        </div>
      </div>
    </footer>
  );
}
