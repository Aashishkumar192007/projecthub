import React from 'react';
import { Building2, HardHat, Warehouse, Users, MapPin } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, color }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `4px solid ${color}` }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
      <Icon size={24} />
    </div>
    <div>
      <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{title}</h3>
      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</div>
    </div>
  </div>
);

const DummyMap = () => {
  const dummyLocations = [
    { id: 1, name: 'Downtown Tower', top: '30%', left: '40%', status: 'active' },
    { id: 2, name: 'Northside Warehouse', top: '20%', left: '70%', status: 'completed' },
    { id: 3, name: 'Westend Development', top: '60%', left: '25%', status: 'active' },
    { id: 4, name: 'East Plaza', top: '50%', left: '80%', status: 'planned' },
    { id: 5, name: 'Central Hub', top: '45%', left: '50%', status: 'active' },
  ];

  return (
    <div className="card" style={{ flex: 1, minHeight: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Asset Map Overview</h2>
      <div style={{ 
        flex: 1, 
        position: 'relative', 
        borderRadius: 'var(--radius-md)', 
        background: 'var(--bg-main)',
        backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        {dummyLocations.map(loc => (
          <div key={loc.id} style={{ 
            position: 'absolute', 
            top: loc.top, 
            left: loc.left, 
            transform: 'translate(-50%, -100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <div style={{ 
              background: 'var(--bg-card)', 
              padding: '0.25rem 0.5rem', 
              borderRadius: 'var(--radius-sm)', 
              fontSize: '0.75rem', 
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '4px',
              whiteSpace: 'nowrap',
              border: '1px solid var(--border-color)'
            }}>
              {loc.name}
            </div>
            <MapPin size={28} color={loc.status === 'active' ? 'var(--primary-color)' : loc.status === 'completed' ? 'var(--success-color)' : 'var(--text-tertiary)'} fill="var(--bg-card)" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Welcome to PropTrack Pro</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Here is what's happening across your assets today.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <DashboardCard title="Total Properties" value="142" icon={Building2} color="var(--primary-color)" />
        <DashboardCard title="Active Sites" value="18" icon={HardHat} color="var(--warning-color)" />
        <DashboardCard title="Warehouses" value="4" icon={Warehouse} color="var(--success-color)" />
        <DashboardCard title="On-Site Workforce" value="1,240" icon={Users} color="var(--danger-color)" />
      </div>
      <DummyMap />
    </div>
  );
};

export default Dashboard;
