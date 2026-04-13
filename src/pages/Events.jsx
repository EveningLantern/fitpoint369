import Footer from '../components/Footer.jsx';
import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../utils.jsx';
import { supabase } from '../lib/supabase';
import EventDetailModal from '../components/EventDetailModal';

export default function Events() {
  useScrollReveal();
  
  const [liveEvent, setLiveEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (data && !error) {
        const spotlight = data.find(e => e.is_live);
        const others = data.filter(e => !e.is_live);
        setLiveEvent(spotlight || null);
        setOtherEvents(others);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Our <span className="accent">Events</span>
          </h1>
          <p>Join live transformation challenges and view past ones</p>
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
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '24px',
                padding: '0',
                marginBottom: '64px',
                boxShadow: '0 0 60px var(--accent-glow-xs)',
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
              
              <div style={{ position: 'relative', zIndex: 1, padding: '48px', background: 'linear-gradient(to right, var(--bg-card) 20%, transparent 100%)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                  <span className="tag tag-accent">⭐️ SPOTLIGHT EVENT</span>
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
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px', padding: '48px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
               <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '8px' }}>No Spotlight Event Currently</h2>
               <p style={{ color: 'var(--text-secondary)' }}>Check back later or explore our past challenges below.</p>
            </div>
          )}

          {/* Past Events */}
          {otherEvents.length > 0 && (
            <>
              <h2 className="section-heading reveal" style={{ marginBottom: '32px' }}>
                Other <span className="accent">Events</span>
              </h2>
              <div className="grid-3">
                {otherEvents.map((e, i) => (
                  <div key={i} className="reveal" style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '28px',
                    opacity: '0.85',
                  }}>
                    <span className="tag tag-muted" style={{ marginBottom: '16px', display: 'inline-block' }}>ENDED</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                      {e.title}
                    </h3>
                    <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '10px' }}>{e.start_date} – {e.end_date}</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{e.sub_heading}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer style={{ marginTop: 'auto' }} />

      {showEventModal && (
        <EventDetailModal
          eventData={liveEvent}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
}
