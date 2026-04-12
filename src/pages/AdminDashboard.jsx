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
        </div>

        {activeTab === 'stories' ? <StoriesManager /> : <EventManager />}
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
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  async function fetchEvent() {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').eq('id', 'current').single();
    if (data) {
      setEventData(data);
    } else {
      // Default fallback if row doesn't exist
      setEventData({
        is_live: false, title: '', sub_heading: '', body: '',
        start_date: '', end_date: '', join_button_label: 'Join Event', join_whatsapp_message: '', banner_url: ''
      });
    }
    setLoading(false);
  }

  async function handleSave(e) {
    if (e) e.preventDefault();
    setSaving(true);
    
    try {
      let finalBannerUrl = eventData.banner_url;

      // Handle custom banner upload if a new file is selected
      if (bannerFile) {
        const fileExt = bannerFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('events').upload(fileName, bannerFile);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('events').getPublicUrl(fileName);
        finalBannerUrl = data.publicUrl;
      }

      const payload = {
        id: 'current',
        is_live: eventData.is_live,
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

      const { error } = await supabase.from('events').upsert(payload);
      if (error) throw error;
      
      alert('Event details saved successfully!');
      setBannerFile(null); // Clear file input
      fetchEvent(); // Refresh data
    } catch (err) {
      alert('Error saving event: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleLiveStatus() {
    const newStatus = !eventData.is_live;
    if (newStatus) {
       // Want to make it live: Ask for confirmation 
       if(!window.confirm("Are you sure you want to make this event live immediately? It will appear on the Home page.")) {
         return;
       }
    } else {
       if(!window.confirm("Are you sure you want to take this event down? It will be removed from the Home page.")) {
         return;
       }
    }

    try {
       const { error } = await supabase.from('events').upsert({ id: 'current', is_live: newStatus });
       if (error) throw error;
       setEventData(prev => ({ ...prev, is_live: newStatus }));
    } catch(err) {
       alert('Error toggling status: ' + err.message);
    }
  }

  if (loading) return <p>Loading event data...</p>;
  if (!eventData) return <p>Could not load event data.</p>;

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', margin: 0 }}>Current Event Settings</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Status:</span>
          <div 
            style={{ 
              padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold',
              background: eventData.is_live ? '#AAFF0020' : '#FF444420',
              color: eventData.is_live ? 'var(--accent)' : '#FF4444'
            }}
          >
            {eventData.is_live ? 'LIVE' : 'OFFLINE'}
          </div>
          <button 
            onClick={toggleLiveStatus}
            className={eventData.is_live ? "btn-ghost" : "btn-primary"}
            style={{ padding: '8px 16px', fontSize: '12px' }}
          >
            {eventData.is_live ? 'Take Offline' : 'Publish Live'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Event Title</label>
            <input type="text" value={eventData.title || ''} onChange={e => setEventData({...eventData, title: e.target.value})} className="form-input" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Sub Heading</label>
            <input type="text" value={eventData.sub_heading || ''} onChange={e => setEventData({...eventData, sub_heading: e.target.value})} className="form-input" required />
          </div>
        </div>

        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Start Date</label>
            <input type="date" value={eventData.start_date || ''} onChange={e => setEventData({...eventData, start_date: e.target.value})} className="form-input" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>End Date</label>
            <input type="date" value={eventData.end_date || ''} onChange={e => setEventData({...eventData, end_date: e.target.value})} className="form-input" required />
          </div>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Body / Description</label>
          <textarea value={eventData.body || ''} onChange={e => setEventData({...eventData, body: e.target.value})} className="form-input" required style={{ height: '100px' }}></textarea>
        </div>

        <div style={{ marginBottom: '16px' }}>
           <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Static Background Banner Image</label>
           {eventData.banner_url && (
             <div style={{ marginBottom: '12px' }}>
               <img src={eventData.banner_url} alt="Current Banner" style={{ height: '100px', borderRadius: '8px', objectFit: 'cover' }} />
             </div>
           )}
           <input type="file" accept="image/*" onChange={e => setBannerFile(e.target.files[0])} className="form-input" style={{ padding: '8px' }} />
           <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Recommended size: 16:9 ratio (e.g. 1920x1080). Leave empty to keep current image.</p>
        </div>

        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Join Button Label</label>
            <input type="text" value={eventData.join_button_label || ''} onChange={e => setEventData({...eventData, join_button_label: e.target.value})} className="form-input" required />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>WhatsApp Message pre-fill</label>
            <input type="text" value={eventData.join_whatsapp_message || ''} onChange={e => setEventData({...eventData, join_whatsapp_message: e.target.value})} className="form-input" required placeholder="Hi! I want to join..." />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Draft Settings'}
        </button>
      </form>
    </div>
  );
}
