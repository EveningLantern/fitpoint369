import React from 'react';
import { waLink, useScrollReveal } from '../utils.jsx';

const PROGRAMS = [
  {
    num: '01', icon: '🔥', name: 'Weight Loss Program',
    desc: 'A structured, science-backed fat-burning program featuring progressive workouts, calorie-deficit meal plans, and weekly check-ins to ensure consistent results.',
    features: ['Custom meal plan included', 'Weekly check-ins with coach', 'Lifetime access to resources'],
  },
  {
    num: '02', icon: '💪', name: 'Weight Gain Program',
    desc: 'Designed for hardgainers and those looking to build lean mass with calorie-surplus nutrition and progressive overload training protocols.',
    features: ['Personalized calorie targets', 'Progressive strength training', 'Supplement guidance included'],
  },
  {
    num: '03', icon: '✨', name: 'Lifestyle Transformation',
    desc: 'A holistic 90-day journey that combines fitness, nutrition, sleep optimization, and stress management for a complete life upgrade.',
    features: ['Full lifestyle audit', 'Mindset coaching included', 'Habit-building framework'],
  },
  {
    num: '04', icon: '🌿', name: 'Skin & Glow Program',
    desc: 'Unlock radiant skin through targeted nutrition protocols, hydration strategies, and anti-inflammatory dietary habits.',
    features: ['Glow nutrition plan', 'Supplement & skincare guide', 'Daily hydration tracking'],
  },
  {
    num: '05', icon: '🏆', name: 'Special Challenges',
    desc: 'Intense 15–30 day transformation challenges designed to push your limits, break plateaus, and achieve rapid results.',
    features: ['Daily challenge workouts', 'Active community support', 'Prize for top performers'],
  },
];

export default function Programs() {
  useScrollReveal();
  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Transformation <span className="accent">Programs</span>
          </h1>
          <p>Choose your path. Click to start instantly.</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="grid-3">
            {PROGRAMS.map((p) => (
              <div
                key={p.num}
                className="card reveal"
                style={{ minHeight: '360px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <span
                    className="tag"
                    style={{ background: '#AAFF0020', border: '1px solid #AAFF0060', color: 'var(--accent)', fontSize: '13px', borderRadius: '6px' }}
                  >
                    {p.num}
                  </span>
                  <span style={{ fontSize: '48px' }}>{p.icon}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', marginBottom: '12px' }}>
                  {p.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>
                  {p.desc}
                </p>
                <ul style={{ listStyle: 'none', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ borderTop: '1px solid #222', marginBottom: '16px' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--accent)', marginBottom: '16px' }}>
                  Contact for Price
                </div>
                <a
                  href={waLink(`Hi! I want to buy the ${p.name} package. Please share details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block' }}
                  id={`prog-cta-${p.num}`}
                >
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Buy Now on WhatsApp →
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
