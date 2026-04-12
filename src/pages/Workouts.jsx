import Footer from '../components/Footer.jsx';
import React from 'react';
import { waLink, useScrollReveal } from '../utils.jsx';

const WORKOUTS = [
  {
    num: '01', icon: '🏠', name: 'Home Workout Plans',
    desc: 'Zero-equipment, full-body workout plans you can do right from your living room. Structured for all fitness levels with progressive difficulty.',
    features: ['No equipment needed', 'Progressive difficulty levels', 'Video walkthrough included'],
  },
  {
    num: '02', icon: '🏋️', name: 'Gym Workout Plans',
    desc: 'Optimized gym programs using free weights, machines, and cables — designed to maximize muscle growth and strength within your schedule.',
    features: ['4–6 day training splits', 'Exercise substitution guide', 'Periodization included'],
  },
  {
    num: '03', icon: '📈', name: 'Beginner to Advanced Training',
    desc: 'A complete training roadmap that grows with you — from your very first workout to competing-level performance, with seamless progressions.',
    features: ['Multi-phase progression system', 'Form coaching included', 'Plateau-breaking strategies'],
  },
  {
    num: '04', icon: '📹', name: 'Video / Zoom Sessions',
    desc: 'Live one-on-one or group coaching sessions via Zoom with real-time form correction, Q&A, and personalized feedback from expert coaches.',
    features: ['Live form correction', 'Flexible scheduling', 'Session recordings provided'],
  },
];

const INFO_STRIP = [
  { icon: '📋', title: 'Structured Plans', desc: 'Every workout is carefully sequenced for maximum results.' },
  { icon: '🎓', title: 'Expert Guidance', desc: 'Coaches with years of real-world experience supporting you.' },
  { icon: '📊', title: 'Track Progress', desc: 'Built-in milestones and tracking frameworks to measure gains.' },
];

export default function Workouts() {
  useScrollReveal();
  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Workout <span className="accent">Programs</span>
          </h1>
          <p>Expert-designed, results-driven training plans for every goal</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {WORKOUTS.map((w) => (
              <div
                key={w.num}
                className="card reveal"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <span
                    className="tag"
                    style={{ background: '#AAFF0020', border: '1px solid #AAFF0060', color: 'var(--accent)', fontSize: '13px', borderRadius: '6px' }}
                  >
                    {w.num}
                  </span>
                  <span style={{ fontSize: '48px' }}>{w.icon}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '12px' }}>
                  {w.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>
                  {w.desc}
                </p>
                <ul style={{ listStyle: 'none', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {w.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Hi! I'm interested in the ${w.name} from FitPoint369.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block' }}
                  id={`workout-cta-${w.num}`}
                >
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Get This Plan →
                  </button>
                </a>
              </div>
            ))}
          </div>

          {/* Info Strip */}
          <div
            className="reveal"
            style={{
              marginTop: '60px',
              display: 'flex',
              gap: '0',
              background: 'var(--bg-card)',
              border: '1px solid #222',
              borderRadius: '16px',
              overflow: 'hidden',
              flexWrap: 'wrap',
            }}
          >
            {INFO_STRIP.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                style={{
                  flex: '1',
                  minWidth: '200px',
                  padding: '32px 28px',
                  textAlign: 'center',
                  borderRight: i < INFO_STRIP.length - 1 ? '1px solid #222' : 'none',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '8px' }}>{title}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
