import React from 'react';
import { waLink, useScrollReveal } from '../utils.jsx';

const PLANS = [
  {
    num: '01', icon: '🥗', name: 'Personalized Meal Plans',
    desc: 'Fully customized meal plans built around your body type, goals, lifestyle, and food preferences — making healthy eating actually enjoyable.',
    features: ['Tailored macro targets', 'Weekly meal rotation', 'Grocery list included'],
  },
  {
    num: '02', icon: '💊', name: 'Nutrition Guidance',
    desc: 'Cut through the confusion of the supplement industry. Get a personalized, budget-friendly supplement stack to support your goals without wasting money.',
    features: ['Goal-based supplement stack', 'Dosage & timing guide', 'Budget-friendly options'],
  },
  {
    num: '03', icon: '📚', name: 'Health Education',
    desc: 'Learn the fundamentals of nutrition science so you can make smart food choices for life — not just while on a program.',
    features: ['Macronutrient deep-dive', 'Label reading crash course', 'Mindful eating practices'],
  },
  {
    num: '04', icon: '💧', name: 'Hydration Strategy',
    desc: 'Optimize your water intake, electrolyte balance, and hydration habits to boost energy, recovery, and skin health.',
    features: ['Daily hydration targets', 'Electrolyte guide', 'Performance hydration tips'],
  },
];

export default function Diet() {
  useScrollReveal();
  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Diet &amp; <span className="accent">Nutrition</span>
          </h1>
          <p>Science-backed nutrition plans for every goal</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {PLANS.map((p) => (
              <div
                key={p.num}
                className="card reveal"
                style={{ display: 'flex', flexDirection: 'column' }}
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
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '12px' }}>
                  {p.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>
                  {p.desc}
                </p>
                <ul style={{ listStyle: 'none', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Hi! I'm interested in the ${p.name} from FitPoint369.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block' }}
                  id={`diet-cta-${p.num}`}
                >
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Get This Plan →
                  </button>
                </a>
              </div>
            ))}
          </div>

          {/* Expert Banner */}
          <div
            className="reveal"
            style={{
              marginTop: '60px',
              background: 'var(--bg-card)',
              border: '1px solid #222',
              borderRadius: '16px',
              padding: '32px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '4px' }}>
                Not sure which plan is right for you?
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Our nutrition expert will guide you to the perfect plan in minutes.
              </p>
            </div>
            <a
              href={waLink('Hi! I need help choosing the right nutrition plan from FitPoint369.')}
              target="_blank"
              rel="noopener noreferrer"
              id="diet-expert-cta"
            >
              <button className="btn-primary">Ask the Expert →</button>
            </a>
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
