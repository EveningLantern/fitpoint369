import React, { useEffect } from 'react';
import { waLink } from '../utils';

export default function EventDetailModal({ eventData, onClose }) {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!eventData) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="card" 
        style={{ 
          width: '100%', maxWidth: '600px', padding: '0', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', maxHeight: '90vh'
        }}
      >
        {/* Header / Banner area */}
        <div style={{ 
          height: '200px', position: 'relative', 
          backgroundImage: `url(${eventData.banner_url})`, 
          backgroundSize: 'cover', backgroundPosition: 'center' 
        }}>
           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.3) 100%)' }}></div>
           <button 
             onClick={onClose}
             style={{ 
               position: 'absolute', top: '16px', right: '16px', 
               background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', 
               width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
               display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
             }}
           >
             ✕
           </button>
           <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <span className="tag tag-accent" style={{ marginBottom: '8px' }}>🔥 LIVE EVENT</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', lineHeight: 1 }}>{eventData.title}</h2>
           </div>
        </div>

        {/* Content area */}
        <div style={{ padding: '32px 24px', overflowY: 'auto' }}>
          <h3 style={{ color: 'var(--accent)', fontSize: '18px', marginBottom: '8px' }}>{eventData.sub_heading}</h3>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <div><strong>Start:</strong> {eventData.start_date}</div>
            <div><strong>End:</strong> {eventData.end_date}</div>
          </div>

          <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px', whiteSpace: 'pre-wrap' }}>
            {eventData.body}
          </div>

          <a 
            href={waLink(eventData.join_whatsapp_message || `Hi! I want to join ${eventData.title}`)} 
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'block' }}
          >
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {eventData.join_button_label || 'Join Event'} →
            </button>
          </a>
        </div>

      </div>
    </div>
  );
}
