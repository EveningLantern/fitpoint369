import React, { useState, useEffect, useRef } from 'react';
import { StatCounter, useScrollReveal, waLink } from '../utils.jsx';
import './Home.css';
import { supabase } from '../lib/supabase';
import EventDetailModal from '../components/EventDetailModal';
import Footer from '../components/Footer.jsx';

const PROGRAMS = [
  { id: 'weight-loss', icon: '🔥', name: 'Weight Loss Program', desc: 'Structured fat-burning workouts and calorie-deficit meal plans tailored to your body type.' },
  { id: 'weight-gain', icon: '💪', name: 'Weight Gain Program', desc: 'Calorie-surplus plans and progressive overload training to build lean mass efficiently.' },
  { id: 'lifestyle', icon: '✨', name: 'Lifestyle Transformation', desc: 'A holistic approach to health — sleep, stress, nutrition, and movement combined.' },
  { id: 'skin-glow', icon: '🌿', name: 'Skin & Glow Program', desc: 'Nutrition protocols and habits designed to give you radiant skin from the inside out.' },
  { id: 'challenge', icon: '🏆', name: 'Special Challenges', desc: 'Intense 15–30 day challenges to push your limits and accelerate transformation.' },
];

const AVATAR_COLORS = ['#AAFF00', '#C8FF00', '#7DCC00', '#5FA800', '#3D7A00'];

export default function Home({ setPage }) {
  useScrollReveal();
  const cardRef = useRef(null);

  const [liveEvent, setLiveEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

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
                {AVATAR_COLORS.map((color, i) => (
                  <div
                    key={i}
                    className="avatar-circle"
                    style={{ background: color, zIndex: 5 - i }}
                  >
                    {String.fromCharCode(65 + i)}
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
                minHeight: '300px'
              }}
            >
              {/* Overlay to ensure text readability */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(22,22,22,0.95), rgba(22,22,22,0.6))' }}></div>
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <span className="tag tag-accent" style={{ alignSelf: 'flex-start' }}>⭐️ SPOTLIGHT EVENT</span>
                
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '16px' }}>
                    {liveEvent.title}
                  </h3>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => setShowEventModal(true)}
                    id="cta-event"
                  >
                    {liveEvent.join_button_label || 'Join Event'} →
                  </button>
                </div>
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
            { num: 3, suffix: '', label: 'Expert Coaches' },
            { num: 4.9, suffix: '★', label: 'Avg Rating' },
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
            <div className="rating-big">4.9</div>
            <div className="rating-slash">/ 5</div>
            <div className="rating-stars">★★★★★</div>
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
            <div className="stars" style={{ margin: '8px 0' }}>★★★★★</div>
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

      {showEventModal && (
        <EventDetailModal
          eventData={liveEvent}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
}
