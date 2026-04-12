import Footer from '../components/Footer.jsx';
import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../utils.jsx';
import { supabase } from '../lib/supabase';

export default function Stories({ setPage }) {
  useScrollReveal();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setStories(data);
      }
      setLoading(false);
    }
    fetchStories();
  }, []);

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Success <span className="accent">Stories</span>
          </h1>
          <p>Real people. Real transformations. Real results.</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px', flex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading stories...</p>
          ) : stories.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No stories yet. Check back soon!</p>
          ) : (
            <div className="grid-3">
              {stories.map((s) => (
                <div key={s.id} className="card reveal" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                  <img 
                    src={s.image_url} 
                    alt={s.name} 
                    style={{ width: '100%', height: '240px', objectFit: 'cover' }} 
                  />
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '20px', color: 'white', marginBottom: '4px' }}>{s.name}</div>
                      <div style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 600 }}>{s.tag}</div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7 }}>
                      {s.story}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', margin: '0 0 12px 0' }}>
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

      <Footer style={{ marginTop: 'auto' }} />
    </div>
  );
}
