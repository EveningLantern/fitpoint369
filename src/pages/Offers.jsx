import React from 'react';
import { waLink, useScrollReveal } from '../utils.jsx';

const OFFERS = [
  {
    badge: 'LIMITED TIME',
    title: 'Ultimate Transformation Bundle',
    originalPrice: '₹9,999',
    price: '₹4,999',
    includes: [
      'Weight Loss + Weight Gain Program (choose one)',
      'Full Personalized Meal Plan (4 weeks)',
      'Daily WhatsApp Check-ins for 30 days',
    ],
    expiry: 'Only 7 days left',
    waMsg: 'Hi! I want to claim the Ultimate Transformation Bundle offer from FitPoint369.',
  },
  {
    badge: 'HOT DEAL',
    title: '30-Day Shred Package',
    originalPrice: '₹6,999',
    price: '₹2,999',
    includes: [
      'Full 30-Day Shred Workout Plan',
      'Custom Shred Meal Guide',
      'Live Weekly Group Check-ins',
    ],
    expiry: 'Offer ends in 3 days',
    waMsg: 'Hi! I want to claim the 30-Day Shred Package offer from FitPoint369.',
  },
  {
    badge: 'EXCLUSIVE',
    title: 'Skin & Lifestyle Combo',
    originalPrice: '₹5,499',
    price: '₹2,199',
    includes: [
      'Skin & Glow Nutrition Program',
      'Lifestyle Transformation Roadmap',
      'Hydration & Supplement Guide',
    ],
    expiry: 'Limited slots remaining',
    waMsg: 'Hi! I want to claim the Skin & Lifestyle Combo offer from FitPoint369.',
  },
];

export default function Offers() {
  useScrollReveal();
  return (
    <div style={{ paddingTop: '70px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow blobs */}
      <div style={{ position: 'fixed', top: '20%', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, #AAFF0015 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '-80px', width: '300px', height: '300px', background: 'radial-gradient(circle, #AAFF0010 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />

      <div className="page-hero" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal">
          <h1>
            🔥 Exclusive <span className="accent">Offers</span>
          </h1>
          <p>Grab these deals before they're gone — limited time only</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="grid-3">
            {OFFERS.map((offer, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: 'linear-gradient(#161616, #161616) padding-box, linear-gradient(135deg, #AAFF00, #444) border-box',
                  border: '2px solid transparent',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 0 40px #AAFF0033';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span className="tag tag-red" style={{ fontSize: '11px', alignSelf: 'flex-start' }}>
                  {offer.badge}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', lineHeight: 1.1 }}>
                  {offer.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '18px' }}>
                    {offer.originalPrice}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: 'var(--accent)', lineHeight: 1 }}>
                    {offer.price}
                  </span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  {offer.includes.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{
                  background: '#AAFF0010', border: '1px solid #AAFF0030',
                  borderRadius: '8px', padding: '10px 16px', textAlign: 'center',
                  color: 'var(--text-secondary)', fontSize: '13px',
                }}>
                  ⏳ {offer.expiry}
                </div>
                <a
                  href={waLink(offer.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block' }}
                  id={`offer-cta-${i}`}
                >
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Claim Offer on WhatsApp →
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer" style={{ position: 'relative', zIndex: 1 }}>
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
