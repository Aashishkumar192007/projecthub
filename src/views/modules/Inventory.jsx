import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { Plus, Trash2, Search, X } from 'lucide-react';

const Inventory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/inventory');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
    setLoading(false);
  };

  const handleInputChange = (e, key) => {
    let val = e.target.value;
    if (e.target.type === 'number') {
      val = parseInt(val) || 0;
    }
    setFormData({ ...formData, [key]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/inventory', formData);
      setShowModal(false);
      setFormData({});
      fetchData();
    } catch (err) {
      console.error('Failed to create record', err);
      alert('Failed to save record.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await apiClient.delete('/inventory/' + id);
      fetchData();
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Inventory</h1>
          <p>Material register.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input type="text" placeholder="Search..." style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-main)' }} />
          </div>
        </div>
        
        <div style={{ overflowX: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>Loading data...</div>
          ) : data.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No records found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-main)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Item</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Quantity</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Location</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600, width: '80px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={row.id} style={{ borderTop: idx > 0 ? '1px solid var(--border-color)' : 'none' }}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>{row.item || '-'}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>{row.quantity || '-'}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>{row.location || '-'}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <button onClick={() => handleDelete(row.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger-color)' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setShowModal(false)}></div>
          <div className="card animate-fade-in" style={{ position: 'relative', width: '400px', maxWidth: '90%', zIndex: 101, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem' }}>Add New</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Item</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.item || ''}
                    onChange={(e) => handleInputChange(e, 'item')}
                    style={{ padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Quantity</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.quantity || ''}
                    onChange={(e) => handleInputChange(e, 'quantity')}
                    style={{ padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Location</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.location || ''}
                    onChange={(e) => handleInputChange(e, 'location')}
                    style={{ padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
