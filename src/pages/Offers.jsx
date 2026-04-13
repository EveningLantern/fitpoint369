import Footer from '../components/Footer.jsx';
import React, { useState, useEffect } from 'react';
import { waLink, useScrollReveal } from '../utils.jsx';
import { supabase } from '../lib/supabase';

export default function Offers() {
  useScrollReveal();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
      if (data && !error) {
        setOffers(data);
      }
      setLoading(false);
    }
    fetchOffers();
  }, []);

  return (
    <div style={{ paddingTop: '70px', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px', position: 'relative', zIndex: 1, flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {loading ? (
             <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading offers...</p>
          ) : offers.length === 0 ? (
             <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No active offers at the moment. Check back soon!</p>
          ) : (
            <div className="grid-3">
              {offers.map((offer, i) => (
                <div
                  key={offer.id || i}
                  className="reveal"
                  style={{
                    background: 'linear-gradient(var(--bg-card), var(--bg-card)) padding-box, linear-gradient(135deg, var(--accent), var(--border-subtle)) border-box',
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
                      ₹{Number(offer.originalPrice).toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: 'var(--accent)', lineHeight: 1 }}>
                      ₹{Number(offer.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    {Array.isArray(offer.includes) && offer.includes.map((item) => (
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
          )}
        </div>
      </section>

      <Footer style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }} />
    </div>
  );
}
