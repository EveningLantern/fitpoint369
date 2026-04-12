import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../utils.jsx';
import { supabase } from '../lib/supabase';
import EventDetailModal from '../components/EventDetailModal';

const PAST_EVENTS = [
  { title: '21-Day Core Crusher', date: 'March 1 – March 21, 2025', desc: 'An intense core-focused challenge with daily ab circuits and nutrition tracking.' },
  { title: 'New Year Body Reset', date: 'Jan 1 – Jan 31, 2025', desc: 'Ring in the year strong with a full-body reset program designed for lasting change.' },
  { title: 'Winter Bulk Season', date: 'Dec 1 – Dec 31, 2024', desc: 'A 30-day muscle-building program timed with the holiday season surplus eating phase.' },
];

export default function Events() {
  useScrollReveal();
  
  const [liveEvent, setLiveEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      const { data } = await supabase.from('events').select('*').eq('id', 'current').single();
      if (data && data.is_live) {
        setLiveEvent(data);
      }
      setLoading(false);
    }
    fetchEvent();
  }, []);

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Current <span className="accent">Events</span>
          </h1>
          <p>Join live transformation challenges with real-time coaching and community</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading event details...</p>
          ) : liveEvent ? (
            /* Featured Event Card */
            <div
              className="reveal"
              style={{
                background: 'linear-gradient(135deg, #161616, #1a1a1a)',
                border: '1px solid #1e1e1e',
                borderRadius: '24px',
                padding: '0',
                marginBottom: '64px',
                boxShadow: '0 0 60px #AAFF0015',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Custom Banner Background */}
              {liveEvent.banner_url && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${liveEvent.banner_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.3,
                  zIndex: 0
                }} />
              )}
              
              <div style={{ position: 'relative', zIndex: 1, padding: '48px', background: 'linear-gradient(to right, rgba(22,22,22,1) 0%, rgba(22,22,22,0.6) 100%)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                  <span className="tag tag-accent">🔥 LIVE EVENT</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '52px', lineHeight: 1.05, marginBottom: '8px' }}>
                  {liveEvent.title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 600, marginBottom: '24px' }}>
                  {liveEvent.sub_heading}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>
                  {liveEvent.start_date} – {liveEvent.end_date}
                </p>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button 
                    className="btn-primary" 
                    onClick={() => setShowEventModal(true)}
                  >
                    {liveEvent.join_button_label || 'Preview Event Details'} →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px', padding: '48px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid #222' }}>
               <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '8px' }}>No Live Events Currently</h2>
               <p style={{ color: 'var(--text-secondary)' }}>Check back later or explore our ongoing programs.</p>
            </div>
          )}

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

      <footer className="site-footer" style={{ marginTop: 'auto' }}>
        <div className="footer-text">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'white' }}>
            FitPoint<span className="accent">369</span>
          </span>
          <br />
          <span style={{ marginTop: '8px', display: 'inline-block' }}>© 2025 FitPoint369. All rights reserved.</span>
        </div>
      </footer>

      {showEventModal && (
        <EventDetailModal
          eventData={liveEvent}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
}
