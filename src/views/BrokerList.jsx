import React, { useState } from 'react';
import { UserSquare2, Star, CheckCircle2, XCircle, Clock } from 'lucide-react';

const brokers = [
  { id: 1, name: 'Rahul Sharma', firm: 'Prime Realty', rating: 4.8, deals: 12 },
  { id: 2, name: 'Priya Patel', firm: 'Metro Properties', rating: 4.5, deals: 8 },
];

const BrokerList = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Broker List & Portfolios</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your broker network and property suggestions.</p>
        </div>
        <button className="btn btn-primary">Add Broker</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {brokers.map(b => (
          <div key={b.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserSquare2 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem' }}>{b.name}</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{b.firm}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>{b.rating} <Star size={14} fill="#f59e0b" color="#f59e0b" /></div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Rating</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{b.deals}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Deals Done</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrokerList;
