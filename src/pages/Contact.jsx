import Footer from '../components/Footer.jsx';
import React from 'react';
import { waLink, useScrollReveal } from '../utils.jsx';

export default function Contact() {
  useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name')?.value.trim();
    const msg = document.getElementById('c-msg')?.value.trim();
    if (!name || !msg) {
      alert('Please fill in both fields.');
      return;
    }
    window.open(waLink(`Name: ${name}\nMessage: ${msg}`), '_blank');
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Contact the <span className="accent">Owner</span>
          </h1>
          <p>Got questions? Drop a message and I'll get back to you on WhatsApp.</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div
            className="reveal"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid #222',
              borderRadius: '20px',
              padding: '48px',
            }}
          >
            <form onSubmit={handleSubmit} id="contact-page-form">
              <div style={{ marginBottom: '20px' }}>
                <input
                  id="c-name"
                  className="form-input"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <textarea
                  id="c-msg"
                  className="form-input"
                  placeholder="Your Message..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '15px' }}
                id="contact-page-submit"
              >
                Send on WhatsApp 💬
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
