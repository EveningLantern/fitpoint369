import Footer from '../components/Footer.jsx';
import React, { useState, useEffect } from 'react';
import { useScrollReveal, waLink, useCountdown } from '../utils.jsx';
import { supabase } from '../lib/supabase';

// ── Helper: is an event still active (end date >= today)?
function isActive(endDate) {
  if (!endDate) return true; // no end date → always show
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return end >= today;
}

// ── Spotlight countdown: shows "STARTS IN" or "ENDS IN"
function SpotlightCountdown({ startDate, endDate }) {
  const now = new Date();
  const start = new Date(startDate);
  const hasStarted = now >= start;
  const targetDate = hasStarted ? new Date(endDate) : start;
  const { days, hours, minutes, seconds } = useCountdown(targetDate.toISOString());

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{
        fontSize: '11px', color: 'var(--text-muted)',
        textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', fontWeight: 600
      }}>
        {hasStarted ? 'Event Ends In' : 'Event Starts In'}
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        {[{ val: days, label: 'DAYS' }, { val: hours, label: 'HRS' }, { val: minutes, label: 'MIN' }, { val: seconds, label: 'SEC' }].map(({ val, label }) => (
          <div key={label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
            borderRadius: '10px', padding: '12px 14px', minWidth: '60px'
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--accent)', lineHeight: 1 }}>
              {String(val).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '1px' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Events() {
  useScrollReveal();

  const [liveEvent, setLiveEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        const spotlight = data.find(e => e.is_live && isActive(e.end_date));
        // Non-live events that haven't expired yet
        const others = data.filter(e => !e.is_live && isActive(e.end_date));
        setLiveEvent(spotlight || null);
        setOtherEvents(others);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Our <span className="accent">Events</span>
          </h1>
          <p>Join live transformation challenges and community events</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px', flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>

          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading events...</p>
          ) : liveEvent ? (
            /* ══════ SPOTLIGHT EVENT — Reference Design ══════ */
            <div
              className="reveal"
              style={{
                borderRadius: '24px',
                marginBottom: '64px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 0 80px var(--accent-glow-xs), 0 24px 60px rgba(0,0,0,0.7)',
                border: '1px solid var(--accent-glow-border)',
                background: 'var(--bg-card)',
              }}
            >
              {/* Banner background */}
              {liveEvent.banner_url && (
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${liveEvent.banner_url})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: 0.25, zIndex: 0
                }} />
              )}

              <div style={{
                position: 'relative', zIndex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '40px',
                padding: '48px',
                background: 'linear-gradient(to right, var(--bg-card) 35%, transparent 100%)',
                alignItems: 'start',
                flexWrap: 'wrap',
              }}>
                {/* LEFT CONTENT */}
                <div>
                  <span className="tag tag-accent" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    🔥 LIVE EVENT
                  </span>

                  <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)',
                    lineHeight: 1.05, marginBottom: '8px'
                  }}>
                    {liveEvent.title}
                  </h2>

                  {liveEvent.sub_heading && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                      {liveEvent.sub_heading}
                    </p>
                  )}

                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                    {formatDate(liveEvent.start_date)} – {formatDate(liveEvent.end_date)}
                  </p>

                  {/* Body as checklist */}
                  {liveEvent.body && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {liveEvent.body.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--text-secondary)' }}>
                          <span style={{
                            color: 'var(--accent)', fontWeight: 700, fontSize: '18px',
                            background: 'rgba(170,255,0,0.1)', borderRadius: '50%',
                            width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0
                          }}>✓</span>
                          {line.replace(/^[-•✓✔*]+\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Countdown */}
                  {liveEvent.start_date && liveEvent.end_date && (
                    <SpotlightCountdown startDate={liveEvent.start_date} endDate={liveEvent.end_date} />
                  )}

                  {/* CTA Button → WhatsApp */}
                  <a
                    href={waLink(liveEvent.join_whatsapp_message || `Hi! I want to join ${liveEvent.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', marginTop: '28px' }}
                  >
                    <button className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                      {liveEvent.join_button_label || 'Join This Event'} →
                    </button>
                  </a>
                </div>

                {/* RIGHT — decorative accent */}
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: '8px', alignSelf: 'center'
                }}>
                  <div style={{
                    width: '120px', height: '120px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #AAFF0030 0%, transparent 70%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '48px'
                  }}>
                    🏆
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px', padding: '48px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '8px' }}>No Spotlight Event Currently</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Check back later or explore upcoming challenges below.</p>
            </div>
          )}

          {/* ══════ OTHER ACTIVE EVENTS ══════ */}
          {otherEvents.length > 0 && (
            <>
              <h2 className="section-heading reveal" style={{ marginBottom: '32px' }}>
                Upcoming <span className="accent">Events</span>
              </h2>
              <div className="grid-3">
                {otherEvents.map((e, i) => (
                  <div key={i} className="reveal" style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.3s ease',
                  }}>
                    <span className="tag tag-muted" style={{ display: 'inline-block', alignSelf: 'flex-start' }}>
                      {new Date(e.start_date) > new Date() ? 'UPCOMING' : 'ONGOING'}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: 0 }}>
                      {e.title}
                    </h3>
                    {e.sub_heading && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                        {e.sub_heading}
                      </p>
                    )}
                    <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                      {formatDate(e.start_date)} – {formatDate(e.end_date)}
                    </div>
                    {e.body && (
                      <p style={{
                        color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.5,
                        display: '-webkit-box', WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0
                      }}>
                        {e.body.replace(/^[-•✓✔*]+\s*/gm, '').trim()}
                      </p>
                    )}
                    {e.join_whatsapp_message && (
                      <a
                        href={waLink(e.join_whatsapp_message || `Hi! I want to join ${e.title}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginTop: 'auto', display: 'block', paddingTop: '8px' }}
                      >
                        <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                          {e.join_button_label || 'Join Event'} →
                        </button>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer style={{ marginTop: 'auto' }} />
    </div>
  );
}
