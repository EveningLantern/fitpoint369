import React from 'react';
import { useScrollReveal } from '../utils.jsx';

const STORIES = [
  {
    name: 'Priya M.', tag: 'Lost 18kg in 60 days', color: '#AAFF00',
    review: 'FitPoint369 completely changed my perspective on fitness. The personalized plan and constant coach support made me feel like I was never alone in this journey. Absolutely life-changing!',
  },
  {
    name: 'Rahul S.', tag: 'Gained 8kg lean muscle', color: '#C8FF00',
    review: 'I was a hardgainer who had given up on building muscle. The weight gain program reset everything for me. I\'m now stronger, bigger, and more confident than ever before.',
  },
  {
    name: 'Anjali R.', tag: 'Complete lifestyle change', color: '#7DCC00',
    review: 'The lifestyle transformation program is genuinely holistic. It was never just about weight — it was about my energy, sleep, and mindset. I\'m a completely different person now.',
  },
  {
    name: 'Dev K.', tag: 'Dropped 12% body fat', color: '#AAFF00',
    review: 'I\'ve tried dozens of programs. FitPoint369 is the first that actually delivered visible abs in under 8 weeks. Transparent, accountable, and results-driven.',
  },
  {
    name: 'Sneha T.', tag: 'Glowing skin + 10kg loss', color: '#C8FF00',
    review: 'The skin & glow program surprised me! I not only lost weight but my complexion improved dramatically. The nutrition plan is so thoughtful and easy to follow.',
  },
  {
    name: 'Arjun P.', tag: 'Conquered the 30-Day Challenge', color: '#7DCC00',
    review: 'The 30-Day Shred was the hardest thing I\'ve ever done — and the most rewarding. The daily structure and check-ins kept me going even on rough days. Do it!',
  },
];

export default function Stories({ setPage }) {
  useScrollReveal();
  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Success <span className="accent">Stories</span>
          </h1>
          <p>Real people. Real transformations. Real results.</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="grid-3">
            {STORIES.map((s, i) => (
              <div key={i} className="card reveal" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '20px', color: '#0A0A0A', flexShrink: 0,
                    }}
                  >
                    {s.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '16px', color: 'white' }}>{s.name}</div>
                    <div style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600 }}>{s.tag}</div>
                  </div>
                </div>
                <div style={{ color: '#FFD700', letterSpacing: '2px', fontSize: '16px' }}>★★★★★</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{s.review}</p>
              </div>
            ))}
          </div>

          {/* CTA Strip */}
          <div
            className="reveal"
            style={{
              marginTop: '64px', textAlign: 'center',
              background: 'var(--bg-card)',
              border: '1px solid #AAFF0033',
              borderRadius: '20px',
              padding: '48px 32px',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', marginBottom: '12px' }}>
              Ready for your <span className="accent">transformation?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
              Join hundreds of others who have already changed their lives.
            </p>
            <button className="btn-primary" onClick={() => setPage('programs')} id="stories-cta">
              Start Now →
            </button>
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
