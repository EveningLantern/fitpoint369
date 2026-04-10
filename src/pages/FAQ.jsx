import React, { useState } from 'react';
import { useScrollReveal } from '../utils.jsx';

const FAQS = [
  {
    q: 'What programs does FitPoint369 offer?',
    a: "FitPoint369 offers 5 core programs: Weight Loss, Weight Gain, Lifestyle Transformation, Skin & Glow, and Special Challenges. Each is fully customized to your body type, goals, and lifestyle. We also offer Diet & Nutrition plans and structured Workout Programs separately.",
  },
  {
    q: 'How do I purchase a program?',
    a: "All purchases are made directly via WhatsApp for a personal, friction-free experience. Simply click the 'Buy Now' button on any program card, and you'll be connected with the FitPoint369 team who will guide you through the onboarding and payment process.",
  },
  {
    q: 'Are the programs suitable for beginners?',
    a: "Absolutely! All FitPoint369 programs are designed with multiple difficulty levels and are 100% beginner-friendly. Our coaches provide step-by-step guidance so you always know exactly what to do, no matter your starting point.",
  },
  {
    q: 'Do I need gym equipment?',
    a: "Not necessarily. We offer dedicated Home Workout Plans that require zero equipment, as well as Gym Workout Plans for those with gym access. When purchasing, simply let us know your preference and we'll customize accordingly.",
  },
  {
    q: 'How are meal plans delivered?',
    a: "All meal plans are delivered digitally via WhatsApp or email as a PDF document. Plans include a full week's rotation, a grocery list, macro breakdown, and easy-to-follow recipes. Plans are updated weekly based on your progress.",
  },
  {
    q: 'Is there a refund policy?',
    a: "Due to the personalized and digital nature of our programs, refunds are assessed on a case-by-case basis. We stand by the quality of our programs and will work with you to resolve any issues. Please contact us directly on WhatsApp to discuss.",
  },
  {
    q: 'How do I contact my coach?',
    a: "All coach communication happens directly on WhatsApp for maximum convenience. Once enrolled, you'll receive your dedicated coach's contact and can reach out anytime — we aim to respond within 2–4 hours.",
  },
  {
    q: 'How long before I see results?',
    a: "Most clients begin noticing positive changes within the first 2 weeks — improved energy, better sleep, and early body compositional shifts. Significant physical transformation is typically visible within 30–60 days when following the program consistently.",
  },
];

export default function FAQ() {
  useScrollReveal();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-hero">
        <div className="reveal">
          <h1>
            Frequently Asked <span className="accent">Questions</span>
          </h1>
          <p>Everything you need to know about FitPoint369</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: '40px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                borderBottom: '1px solid #222',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '24px 0', background: 'none', border: 'none', color: 'white',
                  fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-body)',
                  cursor: 'pointer', textAlign: 'left', gap: '16px',
                }}
                id={`faq-${i}`}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <span
                  style={{
                    color: 'var(--accent)', fontSize: '22px', fontWeight: 400, flexShrink: 0,
                    transition: 'transform 0.3s ease',
                    transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: openIndex === i ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}
              >
                <p
                  style={{
                    color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.8,
                    padding: '0 0 24px',
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
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
