import React from 'react';
import { CountdownTimer, waLink, useScrollReveal } from '../utils.jsx';

const EVENT_DATE = '2026-05-15T00:00:00';

const PAST_EVENTS = [
  { title: '21-Day Core Crusher', date: 'March 1 – March 21, 2025', desc: 'An intense core-focused challenge with daily ab circuits and nutrition tracking.' },
  { title: 'New Year Body Reset', date: 'Jan 1 – Jan 31, 2025', desc: 'Ring in the year strong with a full-body reset program designed for lasting change.' },
  { title: 'Winter Bulk Season', date: 'Dec 1 – Dec 31, 2024', desc: 'A 30-day muscle-building program timed with the holiday season surplus eating phase.' },
];

export default function Events() {
  useScrollReveal();
  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Current <span className="accent">Events</span>
          </h1>
          <p>Join live transformation challenges with real-time coaching and community</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Featured Event Card */}
          <div
            className="reveal"
            style={{
              background: 'linear-gradient(135deg, #161616, #1a1a1a)',
              border: '2px solid #AAFF0055',
              borderRadius: '24px',
              padding: '48px',
              marginBottom: '64px',
              boxShadow: '0 0 60px #AAFF0020',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <span className="tag tag-accent">🔥 LIVE EVENT</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '52px', lineHeight: 1.05, marginBottom: '8px' }}>
              30-Day Shred Challenge 2026
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
              May 15 – June 15, 2026
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, maxWidth: '700px', marginBottom: '32px' }}>
              The flagship FitPoint369 transformation challenge. 30 days of structured daily workouts, a custom shred meal guide,
              and live weekly group check-ins with your coach. This is where real transformations happen.
            </p>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
                Event Starts In
              </div>
              <CountdownTimer targetDate={EVENT_DATE} large />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '16px' }}>
                What's <span className="accent">Included</span>
              </h3>
              {[
                'Daily workout plans delivered every morning',
                'Custom shred meal guide (calorie & macro tracked)',
                'Weekly live group check-in sessions',
                'Private WhatsApp accountability group',
              ].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px', fontSize: '15px', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                  {f}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href={waLink('Hi! I want to register for the 30-Day Shred Challenge event at FitPoint369.')}
                target="_blank"
                rel="noopener noreferrer"
                id="event-register-cta"
              >
                <button className="btn-primary">Register via WhatsApp →</button>
              </a>
              <a
                href={waLink('Hi! I have a question about the 30-Day Shred Challenge at FitPoint369.')}
                target="_blank"
                rel="noopener noreferrer"
                id="event-ask-cta"
              >
                <button className="btn-ghost">Ask Questions →</button>
              </a>
            </div>
          </div>

          {/* Past Events */}
          <h2 className="section-heading reveal" style={{ marginBottom: '32px' }}>
            Past <span className="accent">Events</span>
          </h2>
          <div className="grid-3">
            {PAST_EVENTS.map((e, i) => (
              <div key={i} className="reveal" style={{
                background: 'var(--bg-card)',
                border: '1px solid #1e1e1e',
                borderRadius: '16px',
                padding: '28px',
                opacity: '0.65',
              }}>
                <span className="tag tag-muted" style={{ marginBottom: '16px', display: 'inline-block' }}>ENDED</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  {e.title}
                </h3>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '10px' }}>{e.date}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.5 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-text">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'white' }}>
            FitPoint<span className="accent">369</span>
          </span>
          <br />
          <span style={{ marginTop: '8px', display: 'inline-block' }}>© 2025 FitPoint369. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
