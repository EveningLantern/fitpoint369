import Footer from '../components/Footer.jsx';
import React from 'react';
import { useScrollReveal } from '../utils.jsx';
import personImg from '../assets/person1.jpeg';
import './About.css';

const DIFFERENTIATORS = [
  { icon: '🎯', title: 'Personalized Coaching & Support', desc: 'Every client gets a tailored plan that fits their unique body, lifestyle, and goals.' },
  { icon: '🧬', title: 'Scientific Nutrition Guidance', desc: 'Meal plans grounded in nutritional science — no guesswork, no fads.' },
  { icon: '🏋️', title: 'Customized Workout Plans', desc: 'Progressive, intelligent training designed around your schedule and fitness level.' },
  { icon: '🌱', title: 'Lifestyle-Based Transformation', desc: 'We build healthy habits that integrate seamlessly into your real daily life.' },
  { icon: '♾️', title: 'Sustainable Results', desc: 'No crash diets or extreme methods — only lasting change that sticks.' },
];

export default function About() {
  useScrollReveal();

  return (
    <div className="about-page" style={{ paddingTop: '70px' }}>

      {/* ===== HERO ===== */}
      <section className="about-hero">
        <div className="about-hero-glow-1" />
        <div className="about-hero-glow-2" />
        <div className="about-hero-inner reveal">
          <div className="about-hero-eyebrow">
            <span className="about-eyebrow-dot" />
            Our Story
          </div>
          <h1 className="about-hero-heading">
            About <span className="accent">FitPoint</span><span className="accent-number">369</span>
          </h1>
          <p className="about-hero-sub">
            We believe true transformation starts with lifestyle — not shortcuts.
          </p>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="about-mission section">
        <div className="about-container">

          {/* Mission Statement */}
          <div className="about-mission-top reveal">
            <div className="about-label">Our Mission</div>
            <h2 className="about-section-heading">
              MAKE THE <span className="accent">WORLD,</span><br />
              <span className="accent">HEALTHIER AND HAPPIER</span>
            </h2>
            <div className="about-mission-body">
              <p>
                At <strong>Fit Point 369</strong>, we believe true transformation starts with lifestyle—not shortcuts.
                Our mission is to help people achieve sustainable results through scientific nutrition, smart workout
                guidance, and personalized lifestyle coaching.
              </p>
              <p>
                Whether your goal is <span className="accent-text">Fat loss</span>, <span className="accent-text">Muscle gain</span>,{' '}
                <span className="accent-text">improved energy</span>, <span className="accent-text">glowing skin</span>, or complete{' '}
                <span className="accent-text">body transformation</span> — we provide systems designed to deliver real, lasting change.
              </p>
              <p>
                We don't believe in crash diets, unrealistic routines, or temporary fixes. Instead, we focus on
                building healthy habits that fit your real life.
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="about-divider-row reveal">
            <div className="about-divider-line" />
            <span className="about-divider-icon">✦</span>
            <div className="about-divider-line" />
          </div>

          {/* What Makes Us Different */}
          <div className="about-diff-section reveal">
            <div className="about-label">What Sets Us Apart</div>
            <h2 className="about-section-heading" style={{ marginBottom: '48px' }}>
              What Makes Us <span className="accent">Different?</span>
            </h2>
            <div className="about-diff-grid">
              {DIFFERENTIATORS.map((d, i) => (
                <div key={i} className="about-diff-card reveal">
                  <div className="about-diff-icon">{d.icon}</div>
                  <h3 className="about-diff-title">{d.title}</h3>
                  <p className="about-diff-desc">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Mission Statement */}
          <div className="about-closing reveal">
            <div className="about-closing-quote">
              "At Fit Point 369, we are committed to helping you become the healthiest, strongest, and most
              confident version of yourself."
            </div>
            <div className="about-closing-cta">
              <span className="accent about-cta-text">Your transformation starts here.</span>
            </div>
          </div>

        </div>
      </section>

      {/* ===== FOUNDER SECTION ===== */}
      <section className="about-founder-section">
        <div className="about-founder-glow" />
        <div className="about-container">
          <div className="about-founder-label reveal">
            <div className="about-label">Meet the Founder</div>
            <h2 className="about-section-heading">
              The Person <span className="accent">Behind the Mission</span>
            </h2>
          </div>

          <div className="about-founder-layout">

            {/* Photo — Left */}
            <div className="about-founder-photo-wrap reveal">
              <div className="about-photo-border-glow" />
              <div className="about-founder-photo-frame">
                <img
                  src={personImg}
                  alt="Suvodip Chakraborty — Founder, Fit Point 369"
                  className="about-founder-img"
                />
                <div className="about-photo-badge">
                  <span className="about-badge-icon">✦</span>
                  <span>Lifestyle Transformation Coach</span>
                </div>
              </div>
            </div>

            {/* Text — Right */}
            <div className="about-founder-text reveal">
              <div className="about-founder-greeting">Hi, I'm</div>
              <h2 className="about-founder-name">
                Suvodip <span className="accent">Chakraborty</span>
              </h2>
              <div className="about-founder-role">
                Founder of Fit Point 369 &amp; Dedicated Lifestyle Transformation Coach
              </div>

              <div className="about-divider" />

              <div className="about-founder-bio">
                <p>
                  My passion is helping people transform their health, body, and confidence through practical
                  lifestyle changes — not extreme diets or temporary fixes.
                </p>
                <p>
                  Through a <strong>science-based approach</strong> combining nutrition guidance, workout planning,
                  and habit-focused coaching, I help clients achieve sustainable results that fit into real life.
                </p>
                <p>
                  I believe true transformation is not just about losing weight or building muscle — it's about
                  creating a healthier lifestyle that improves your <span className="accent-text">energy</span>,{' '}
                  <span className="accent-text">confidence</span>, <span className="accent-text">discipline</span>, and overall{' '}
                  <span className="accent-text">quality of life</span>.
                </p>
              </div>

              {/* Mission Box */}
              <div className="about-founder-mission-box">
                <div className="about-founder-mission-label">My Mission</div>
                <p className="about-founder-mission-text">
                  To help you become the strongest, healthiest, and most confident version of yourself.
                </p>
              </div>

              <p className="about-founder-closing">
                At Fit Point 369, I'm committed to guiding you every step of the way with personalized
                support, proven systems, and accountability that drives real results.
              </p>

              <div className="about-founder-sign">
                <span className="about-sign-text">— Let's transform your lifestyle, together.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
