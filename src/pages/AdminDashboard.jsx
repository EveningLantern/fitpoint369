import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard({ adminUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('stories');

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', margin: 0 }}>
              Admin <span className="accent">Dashboard</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome, {adminUser.email}</p>
          </div>
          <button className="btn-ghost" onClick={onLogout} id="admin-logout-btn">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
          <button
            className={activeTab === 'stories' ? 'btn-primary' : 'btn-ghost'}
            onClick={() => setActiveTab('stories')}
            style={{ padding: '8px 24px' }}
          >
            Stories
          </button>
          <button
            className={activeTab === 'events' ? 'btn-primary' : 'btn-ghost'}
            onClick={() => setActiveTab('events')}
            style={{ padding: '8px 24px' }}
          >
            Events
          </button>
          <button
            className={activeTab === 'offers' ? 'btn-primary' : 'btn-ghost'}
            onClick={() => setActiveTab('offers')}
            style={{ padding: '8px 24px' }}
          >
            Offers
          </button>
        </div>

        {activeTab === 'stories' && <StoriesManager />}
        {activeTab === 'events' && <EventManager />}
        {activeTab === 'offers' && <OffersManager />}
      </div>
    </div>
  );
}

// ==========================================
// STORIES MANAGER
// ==========================================
function StoriesManager() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [storyText, setStoryText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  async function fetchStories() {
    setLoading(true);
    const { data, error } = await supabase.from('stories').select('*').order('created_at', { ascending: false });
    if (!error && data) setStories(data);
    setLoading(false);
  }

  async function handleAddStory(e) {
    e.preventDefault();
    if (!imageFile || !name || !tag || !storyText) return alert('Please fill all fields');
    
    setUploading(true);
    try {
      // 1. Upload Image
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('stories')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data } = supabase.storage.from('stories').getPublicUrl(filePath);
      const imageUrl = data.publicUrl;

      // 3. Insert into DB
      const { error: dbError } = await supabase.from('stories').insert({
        name,
        tag,
        story: storyText,
        image_url: imageUrl
      });

      if (dbError) throw dbError;

      // Success
      setName('');
      setTag('');
      setStoryText('');
      setImageFile(null);
      alert('Story added successfully!');
      fetchStories();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteStory(id, imageUrl) {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    
    try {
      // 1. Delete from DB
      await supabase.from('stories').delete().eq('id', id);

      // 2. Extract relative path and delete from Storage
      // URL format: .../storage/v1/object/public/stories/filename.ext
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      await supabase.storage.from('stories').remove([fileName]);
      
      fetchStories();
    } catch (err) {
      alert('Error deleting story: ' + err.message);
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '40px' }}>
      {/* ADD FORM */}
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '24px' }}>Add New Story</h3>
        <form onSubmit={handleAddStory}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files[0])} 
              className="form-input" 
              style={{ padding: '8px' }}
              required 
            />
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Recommended: 4:5 ratio (e.g. 1080x1350 px).</p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Tag (e.g. "Lost 18kg in 60 days")</label>
            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} className="form-input" required />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Story</label>
            <textarea value={storyText} onChange={(e) => setStoryText(e.target.value)} className="form-input" required style={{ height: '120px' }}></textarea>
          </div>
          <button type="submit" className="btn-primary" disabled={uploading} style={{ width: '100%', justifyContent: 'center' }}>
            {uploading ? 'Uploading...' : 'Add Story'}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '24px' }}>Existing Stories</h3>
        {loading ? <p>Loading...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stories.map(s => (
              <div key={s.id} className="card" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
                <img src={s.image_url} alt={s.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '18px' }}>{s.name}</div>
                  <div style={{ color: 'var(--accent)', fontSize: '14px', marginBottom: '8px' }}>{s.tag}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.story}</div>
                </div>
                <button onClick={() => handleDeleteStory(s.id, s.image_url)} style={{ background: '#FF444420', color: '#FF4444', border: 'none', borderRadius: '8px', padding: '0 16px', cursor: 'pointer', alignSelf: 'flex-start', height: '40px' }}>
                  Delete
                </button>
              </div>
            ))}
            {stories.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No stories found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// EVENT MANAGER
// ==========================================
function EventManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [eventData, setEventData] = useState({
    title: '', sub_heading: '', body: '',
    start_date: '', end_date: '', join_button_label: 'Join Event', join_whatsapp_message: '', banner_url: ''
  });
  const [saving, setSaving] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    if (data) {
      setEvents(data);
    }
    setLoading(false);
  }

  function handleEdit(evt) {
    setEditingId(evt.id);
    setEventData({
      title: evt.title || '',
      sub_heading: evt.sub_heading || '',
      body: evt.body || '',
      start_date: evt.start_date || '',
      end_date: evt.end_date || '',
      join_button_label: evt.join_button_label || 'Join Event',
      join_whatsapp_message: evt.join_whatsapp_message || '',
      banner_url: evt.banner_url || ''
    });
    setBannerFile(null);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEventData({
      title: '', sub_heading: '', body: '',
      start_date: '', end_date: '', join_button_label: 'Join Event', join_whatsapp_message: '', banner_url: ''
    });
    setBannerFile(null);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    
    try {
      let finalBannerUrl = eventData.banner_url;

      if (bannerFile) {
        const fileExt = bannerFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('events').upload(fileName, bannerFile);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('events').getPublicUrl(fileName);
        finalBannerUrl = data.publicUrl;
      }

      const isNew = !editingId;
      const payloadId = editingId || crypto.randomUUID();

      const payload = {
        id: payloadId,
        title: eventData.title,
        sub_heading: eventData.sub_heading,
        body: eventData.body,
        start_date: eventData.start_date,
        end_date: eventData.end_date,
        join_button_label: eventData.join_button_label || 'Join Event',
        join_whatsapp_message: eventData.join_whatsapp_message,
        banner_url: finalBannerUrl,
        updated_at: new Date().toISOString()
      };

      if (isNew) {
        payload.is_live = false; // default new events to not spotlight
      }

      const { error } = await supabase.from('events').upsert(payload);
      if (error) throw error;
      
      alert(isNew ? 'Event created successfully!' : 'Event updated successfully!');
      handleCancelEdit();
      fetchEvents();
    } catch (err) {
      alert('Error saving event: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleSpotlight(evt) {
    const newStatus = !evt.is_live;
    if (newStatus) {
       if(!window.confirm(`Are you sure you want to make "${evt.title}" the Spotlight event? This will replace any currently spotlit event.`)) {
         return;
       }
    } else {
       if(!window.confirm(`Remove "${evt.title}" from Spotlight? No event will be highlighted until you spotlight another.`)) {
         return;
       }
    }

    try {
       if (newStatus) {
         // Turn off all other events
         await supabase.from('events').update({ is_live: false }).neq('id', evt.id);
       }
       // Update this event
       const { error } = await supabase.from('events').update({ is_live: newStatus }).eq('id', evt.id);
       if (error) throw error;
       
       fetchEvents();
    } catch(err) {
       alert('Error toggling spotlight: ' + err.message);
    }
  }

  async function handleDeleteEvent(id) {
    if (!window.confirm('Are you sure you want to delete this event permanently?')) return;
    try {
      await supabase.from('events').delete().eq('id', id);
      if (editingId === id) handleCancelEdit();
      fetchEvents();
    } catch (err) {
      alert('Error deleting event: ' + err.message);
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '40px' }}>
      
      {/* FORM */}
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: '0 0 24px' }}>
          {editingId ? 'Edit Event' : 'Create New Event'}
        </h3>
        <form onSubmit={handleSave}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Event Title</label>
              <input type="text" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} className="form-input" required />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Sub Heading</label>
              <input type="text" value={eventData.sub_heading} onChange={e => setEventData({...eventData, sub_heading: e.target.value})} className="form-input" required />
            </div>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Start Date</label>
              <input type="date" value={eventData.start_date} onChange={e => setEventData({...eventData, start_date: e.target.value})} className="form-input" required />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>End Date</label>
              <input type="date" value={eventData.end_date} onChange={e => setEventData({...eventData, end_date: e.target.value})} className="form-input" required />
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Body / Description</label>
            <textarea value={eventData.body} onChange={e => setEventData({...eventData, body: e.target.value})} className="form-input" required style={{ height: '100px' }}></textarea>
          </div>

          <div style={{ marginBottom: '16px' }}>
             <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Banner Image</label>
             {eventData.banner_url && (
               <div style={{ marginBottom: '12px' }}>
                 <img src={eventData.banner_url} alt="Current Banner" style={{ height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
               </div>
             )}
             <input type="file" accept="image/*" onChange={e => setBannerFile(e.target.files[0])} className="form-input" style={{ padding: '8px' }} />
             <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Recommended: 16:9 ratio. Leave empty to keep current.</p>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Button Label</label>
              <input type="text" value={eventData.join_button_label} onChange={e => setEventData({...eventData, join_button_label: e.target.value})} className="form-input" required />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>WhatsApp Message</label>
              <input type="text" value={eventData.join_whatsapp_message} onChange={e => setEventData({...eventData, join_whatsapp_message: e.target.value})} className="form-input" required placeholder="Hi! I want to join..." />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn-primary" disabled={saving} style={{ flex: 1, justifyContent: 'center' }}>
              {saving ? 'Saving...' : (editingId ? 'Update Event' : 'Create Event')}
            </button>
            {editingId && (
              <button type="button" className="btn-ghost" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LIST */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '24px' }}>Existing Events</h3>
        {loading ? <p>Loading...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {events.map(evt => (
              <div key={evt.id} className="card" style={{ display: 'flex', gap: '20px', padding: '20px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '18px' }}>{evt.title}</div>
                    {evt.is_live && <span className="tag tag-accent" style={{ fontSize: '10px' }}>SPOTLIGHT</span>}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {evt.start_date} – {evt.end_date}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'end' }}>
                  <button 
                    onClick={() => toggleSpotlight(evt)}
                    style={{ background: evt.is_live ? '#FF444420' : '#AAFF0020', color: evt.is_live ? '#FF4444' : 'var(--accent)', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                  >
                    {evt.is_live ? 'Remove Spotlight' : 'Make Spotlight'}
                  </button>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(evt)} style={{ background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                    <button onClick={() => handleDeleteEvent(evt.id)} style={{ background: 'var(--bg-secondary)', color: '#FF4444', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {events.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No events found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// OFFERS MANAGER
// ==========================================
function OffersManager() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [offerData, setOfferData] = useState({
    badge: '',
    title: '',
    originalPrice: '',
    price: '',
    includes: '',
    expiry: '',
    waMsg: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    setLoading(true);
    const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
    if (data) {
      setOffers(data);
    } else {
      setOffers([]);
    }
    setLoading(false);
  }

  function handleEdit(off) {
    setEditingId(off.id);
    setOfferData({
      badge: off.badge || '',
      title: off.title || '',
      originalPrice: off.originalPrice || '',
      price: off.price || '',
      includes: Array.isArray(off.includes) ? off.includes.join('\n') : (off.includes || ''),
      expiry: off.expiry || '',
      waMsg: off.waMsg || ''
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setOfferData({
      badge: '', title: '', originalPrice: '', price: '', includes: '', expiry: '', waMsg: ''
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    
    try {
      const isNew = !editingId;
      const payloadId = editingId || crypto.randomUUID();

      // Convert includes textarea to array of non-empty strings
      const includesArray = offerData.includes.split('\n').map(i => i.trim()).filter(i => i.length > 0);

      const payload = {
        id: payloadId,
        badge: offerData.badge,
        title: offerData.title,
        originalPrice: offerData.originalPrice,
        price: offerData.price,
        includes: includesArray,
        expiry: offerData.expiry,
        waMsg: offerData.waMsg,
      };

      if (isNew) {
        payload.created_at = new Date().toISOString();
      }

      const { error } = await supabase.from('offers').upsert(payload);
      if (error) throw error;
      
      alert(isNew ? 'Offer created successfully!' : 'Offer updated successfully!');
      handleCancelEdit();
      fetchOffers();
    } catch (err) {
      alert('Error saving offer: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteOffer(id) {
    if (!window.confirm('Are you sure you want to delete this offer permanently?')) return;
    try {
      await supabase.from('offers').delete().eq('id', id);
      if (editingId === id) handleCancelEdit();
      fetchOffers();
    } catch (err) {
      alert('Error deleting offer: ' + err.message);
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '40px' }}>
      
      {/* FORM */}
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: '0 0 24px' }}>
          {editingId ? 'Edit Offer' : 'Create New Offer'}
        </h3>
        <form onSubmit={handleSave}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Badge (e.g. LIMITED TIME)</label>
              <input type="text" value={offerData.badge} onChange={e => setOfferData({...offerData, badge: e.target.value})} className="form-input" required />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Title</label>
              <input type="text" value={offerData.title} onChange={e => setOfferData({...offerData, title: e.target.value})} className="form-input" required />
            </div>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Original Price (₹)</label>
              <input type="number" min="0" value={offerData.originalPrice} onChange={e => setOfferData({...offerData, originalPrice: e.target.value})} className="form-input" required placeholder="e.g. 9999" />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Discounted Price (₹)</label>
              <input type="number" min="0" value={offerData.price} onChange={e => setOfferData({...offerData, price: e.target.value})} className="form-input" required placeholder="e.g. 4999" />
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Includes (One item per line)</label>
            <textarea value={offerData.includes} onChange={e => setOfferData({...offerData, includes: e.target.value})} className="form-input" required style={{ height: '100px' }} placeholder="Item 1&#10;Item 2"></textarea>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Expiry Text (e.g. Only 7 days left)</label>
              <input type="text" value={offerData.expiry} onChange={e => setOfferData({...offerData, expiry: e.target.value})} className="form-input" required />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>WhatsApp Message pre-fill</label>
              <input type="text" value={offerData.waMsg} onChange={e => setOfferData({...offerData, waMsg: e.target.value})} className="form-input" required placeholder="Hi! I want to claim..." />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn-primary" disabled={saving} style={{ flex: 1, justifyContent: 'center' }}>
              {saving ? 'Saving...' : (editingId ? 'Update Offer' : 'Create Offer')}
            </button>
            {editingId && (
              <button type="button" className="btn-ghost" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LIST */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '24px' }}>Existing Offers</h3>
        {loading ? <p>Loading...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {offers.map(off => (
              <div key={off.id} className="card" style={{ display: 'flex', gap: '20px', padding: '20px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '18px' }}>{off.title}</div>
                    <span className="tag tag-red" style={{ fontSize: '10px' }}>{off.badge}</span>
                  </div>
                  <div style={{ fontSize: '15px', color: 'var(--accent)', fontWeight: 'bold' }}>
                    ₹{Number(off.price).toLocaleString('en-IN')} <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '13px', marginLeft: '6px' }}>₹{Number(off.originalPrice).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'end' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(off)} style={{ background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                    <button onClick={() => handleDeleteOffer(off.id)} style={{ background: 'var(--bg-secondary)', color: '#FF4444', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {offers.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No offers found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
