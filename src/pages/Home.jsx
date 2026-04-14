import React, { useState, useEffect, useRef } from 'react';
import { StatCounter, useScrollReveal, waLink, useCountdown } from '../utils.jsx';
import './Home.css';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer.jsx';
import p1 from '../assets/p1.jpeg';
import p2 from '../assets/p2.jpeg';
import p3 from '../assets/p3.jpeg';
import p4 from '../assets/p4.jpeg';
import p5 from '../assets/p5.jpeg';

const PROGRAMS = [
  { id: 'weight-loss', icon: '🔥', name: 'Fat Loss Program', desc: 'Structured fat-burning workouts and calorie-deficit meal plans tailored to your body type.' },
  { id: 'weight-gain', icon: '💪', name: 'Muscle Gain Program', desc: 'Calorie-surplus plans and progressive overload training to build lean mass efficiently.' },
  { id: 'lifestyle', icon: '✨', name: 'Lifestyle Transformation', desc: 'A holistic approach to health — sleep, stress, nutrition, and movement combined.' },
  { id: 'skin-glow', icon: '🌿', name: 'Skin & Glow Program', desc: 'Nutrition protocols and habits designed to give you radiant skin from the inside out.' },
  { id: 'challenge', icon: '🏆', name: 'Special Challenges', desc: 'Intense 15–30 day challenges to push your limits and accelerate transformation.' },
];

const PERSON_IMAGES = [p1, p2, p3, p4, p5];

export default function Home({ setPage }) {
  useScrollReveal();
  const cardRef = useRef(null);

  const [liveEvent, setLiveEvent] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      const { data } = await supabase.from('events').select('*').eq('is_live', true).limit(1).maybeSingle();
      if (data) {
        setLiveEvent(data);
      }
    }
    fetchEvent();
  }, []);

  // 3D tilt effect
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotateX = (-dy * 8).toFixed(2);
    const rotateY = (dx * 8).toFixed(2);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value.trim();
    const msg = document.getElementById('contact-msg')?.value.trim();
    if (!name || !msg) {
      alert('Please fill in both fields.');
      return;
    }
    const url = waLink(`Name: ${name}\nMessage: ${msg}`);
    window.open(url, '_blank');
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-inner">
          {/* Left */}
          <div className="hero-left">
            <div className="hero-tag">🚀 Transform Your Body</div>
            <h1 className="hero-heading">
              Your Best<br />
              <span>Fitness </span>
              <span className="line-accent">Transformation</span>
              <br />Starts Here.
            </h1>
            <p className="hero-subtext">
              FitPoint369 is your all-in-one platform for fitness, diet, and lifestyle transformation.{' '}
              <span className="accent">Real programs. Real results.</span>
            </p>

            {/* Social Proof */}
            <div className="social-proof">
              <div className="avatar-stack">
                {PERSON_IMAGES.map((src, i) => (
                  <div
                    key={i}
                    className="avatar-circle"
                    style={{ zIndex: 5 - i, padding: 0, overflow: 'hidden' }}
                  >
                    <img src={src} alt={`person ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  </div>
                ))}
              </div>
              <div className="social-proof-text">
                <div className="proof-count">1000+ Lives Transformed</div>
                <div className="proof-label">and growing daily</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => setPage('programs')} id="cta-programs">
                Explore Programs →
              </button>
              <button className="btn-ghost" onClick={() => setPage('stories')} id="cta-stories">
                See Success Stories
              </button>
            </div>
          </div>

          {/* Right — Event Card */}
          {liveEvent && (
            <div
              className="hero-right"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="hero-card-glow" />
              <div
                className="event-card"
                ref={cardRef}
                style={{
                  backgroundImage: liveEvent.banner_url ? `url(${liveEvent.banner_url})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Overlay to ensure text readability */}
                <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-overlay)' }}></div>
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span className="tag tag-accent" style={{ alignSelf: 'flex-start' }}>🔥 LIVE EVENT</span>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', lineHeight: 1.1, margin: 0 }}>
                    {liveEvent.title}
                  </h3>

                  {/* Date Range */}
                  {liveEvent.start_date && liveEvent.end_date && (
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                      {new Date(liveEvent.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(liveEvent.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}

                  {/* Body as checklist items */}
                  {liveEvent.body && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {liveEvent.body.split('\n').filter(l => l.trim()).slice(0, 4).map((line, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '16px' }}>✓</span>
                          {line.replace(/^[-•✓✔*]+\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Countdown */}
                  <HeroEventCountdown startDate={liveEvent.start_date} endDate={liveEvent.end_date} />

                  {/* CTA → WhatsApp directly */}
                  <a
                    href={waLink(liveEvent.join_whatsapp_message || `Hi! I want to join ${liveEvent.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block' }}
                    id="cta-event"
                  >
                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      {liveEvent.join_button_label || 'Join This Event'} →
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats-bar" id="stats">
        <div className="stats-inner">
          {[
            { num: 1000, suffix: '+', label: 'Transformations' },
            { num: 10, suffix: '+', label: 'Programs' },
            { num: 4, suffix: '', label: 'Expert Coaches' },
            { num: 4.5, suffix: '★', label: 'Avg Rating' },
          ].map(({ num, suffix, label }) => (
            <div key={label} className="stat-item reveal">
              <span className="stat-number">
                <StatCounter end={num} suffix={suffix} />
              </span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRUSTED PARTNER ===== */}
      <section className="trusted-section section" id="trusted">
        <div className="trusted-inner">
          <div className="trusted-left reveal">
            <h2 className="section-heading">
              Your <span className="accent">Trusted</span><br />
              Fitness Partner.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
              Built for every body. Designed for results.
            </p>
          </div>
          <div className="trusted-right reveal">
            <p className="trusted-description">
              At FitPoint369, we believe transformation is a journey, not a destination. Our science-backed
              programs, personal coaching, and community support are designed to help you achieve lasting
              change — at your pace, on your terms.
            </p>
            <div className="feature-cards-row">
              {[
                { num: '01.', title: 'For Every Level', desc: 'From beginner to advanced, our programs adapt to where you are right now.', highlighted: false },
                { num: '02.', title: 'Science-Backed Methods', desc: 'Every plan is rooted in proven nutrition and exercise science.', highlighted: true },
                { num: '03.', title: '24/7 Support', desc: 'Questions? Our coaches are always just a message away on WhatsApp.', highlighted: false },
              ].map(({ num, title, desc, highlighted }) => (
                <div key={num} className={`feature-card ${highlighted ? 'highlighted' : ''}`}>
                  <span className="feature-card-num">{num}</span>
                  <div className="feature-card-title">{title}</div>
                  <p className="feature-card-desc">{desc}</p>
                  <a
                    href={waLink(`Hi! I want to learn more about "${title}" at FitPoint369.`)}
                    className="feature-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS PREVIEW ===== */}
      <section className="programs-section" id="programs-preview">
        <div className="programs-inner">
          <div className="reveal">
            <h2 className="section-heading">
              Our <span className="accent">Programs</span>
            </h2>
            <p className="section-subtext">Click any program to get started</p>
          </div>
          <div className="grid-3">
            {PROGRAMS.map((p) => (
              <div key={p.id} className="program-card reveal">
                <div className="program-icon">{p.icon}</div>
                <div className="program-name">{p.name}</div>
                <p className="program-desc">{p.desc}</p>
                <a
                  href={waLink(`Hi! I want to buy the ${p.name} package.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`prog-${p.id}`}
                >
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Join this program Now →
                  </button>
                </a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }} className="reveal">
            <button className="btn-ghost" onClick={() => setPage('programs')} id="view-all-programs">
              View All Programs →
            </button>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED PLATFORM / TESTIMONIAL TEASER ===== */}
      <section className="testimonial-section" id="testimonial-teaser">
        <div className="testimonial-stripe" />
        <div className="testimonial-inner">
          <div className="rating-card reveal">
            <div className="rating-big">4.5</div>
            <div className="rating-slash">/ 5</div>
            <div className="rating-stars">★★★★½</div>
            <div className="rating-based">Based on 200+ reviews</div>
          </div>
          <div className="testimonial-right reveal">
            <h2 className="section-heading">
              Trusted Platform,<br />
              <span className="accent">Anytime &amp; Anywhere.</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', margin: '20px 0 8px', lineHeight: 1.7 }}>
              Thousands of people across India have transformed their bodies and lives with FitPoint369.
              Our clients see real results — not just on the scale, but in their energy, confidence, and daily life.
            </p>
            <div className="stars" style={{ margin: '8px 0' }}>★★★★½</div>
            <p className="review-text">
              "FitPoint369 completely changed my life. I lost 18kg in 60 days following their plan. The coach
              was always available and the meal guide was so easy to follow."
            </p>
            <p className="review-text">
              "The 30-day challenge was intense but worth every drop of sweat. Highly recommend to anyone
              who's serious about transformation!"
            </p>
            <div className="testimonial-links">
              <button className="btn-primary" onClick={() => setPage('stories')} id="cta-see-stories">
                See Success Stories →
              </button>
              <a
                href={waLink('Hi! I have a question about FitPoint369.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-ghost" id="cta-ask">Ask a Question?</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="contact-section" id="contact-section">
        <div className="contact-inner">
          <div className="reveal">
            <h2 className="section-heading">
              Contact the <span className="accent">Owner</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
              Got questions? Drop a message and I'll get back to you on WhatsApp.
            </p>
          </div>

          <div className="contact-form-card reveal">
            <form onSubmit={handleContactSubmit} id="contact-form">
              <div className="form-group">
                <input
                  id="contact-name"
                  className="form-input"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  id="contact-msg"
                  className="form-input"
                  placeholder="Your Message..."
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} id="contact-submit">
                Send on WhatsApp 💬
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}

// ──────────────────────────────────────────────
// HeroEventCountdown sub-component
// Shows "EVENT STARTS IN" countdown before start date,
// then "EVENT ENDS IN" countdown after start date.
// ──────────────────────────────────────────────
function HeroEventCountdown({ startDate, endDate }) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const hasStarted = now >= start;
  const targetDate = hasStarted ? end : start;
  const { days, hours, minutes, seconds } = useCountdown(targetDate.toISOString());

  return (
    <div>
      <div className="countdown-label-text">
        {hasStarted ? 'EVENT ENDS IN' : 'EVENT STARTS IN'}
      </div>
      <div className="countdown-row">
        {[
          { val: days, label: 'DAYS' },
          { val: hours, label: 'HRS' },
          { val: minutes, label: 'MIN' },
          { val: seconds, label: 'SEC' },
        ].map(({ val, label }) => (
          <div key={label} className="countdown-box">
            <span className="countdown-num">{String(val).padStart(2, '0')}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
