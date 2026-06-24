import React from 'react';
import { Home, Building2, HardHat, Warehouse, Users, Calendar, Key, Truck, Box, MapPin, DollarSign, Percent, FileText, UserSquare2, UserCheck } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: Home, section: 'Core' },
  { id: 'registry', label: 'Property Registry', icon: Building2, section: 'Core' },
  { id: 'construction', label: 'Construction Projects', icon: HardHat, section: 'Core' },
  { id: 'warehouses', label: 'Warehouses', icon: Warehouse, section: 'Core' },
  { id: 'employees', label: 'Employees & HR', icon: Users, section: 'Workforce' },
  { id: 'attendance', label: 'Attendance & Leave', icon: Calendar, section: 'Workforce' },
  { id: 'visitors', label: 'Visitor Access', icon: Key, section: 'Workforce' },
  { id: 'vendors', label: 'Vendors', icon: Truck, section: 'Procurement' },
  { id: 'inventory', label: 'Inventory & POs', icon: Box, section: 'Procurement' },
  { id: 'guarantors', label: 'Vendor Guarantors', icon: UserCheck, section: 'Procurement', isNew: true },
  { id: 'equipment', label: 'Equipment & GPS', icon: MapPin, section: 'Procurement' },
  { id: 'budget', label: 'Budget & Costing', icon: DollarSign, section: 'Finance' },
  { id: 'commissions', label: 'Commissions Dashboard', icon: Percent, section: 'Finance', isNew: true },
  { id: 'documents', label: 'Documents & Contracts', icon: FileText, section: 'Finance' },
  { id: 'brokers', label: 'Broker List', icon: UserSquare2, section: 'Sales & Network', isNew: true },
];

const Sidebar = ({ activeView, setActiveView }) => {
  const sections = [...new Set(menuItems.map(i => i.section))];

  return (
    <div className="sidebar">
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '32px', height: '32px', background: 'var(--primary-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
          P
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px' }}>PropTrack Pro</h2>
      </div>
      
      <div style={{ padding: '1rem' }}>
        {sections.map(section => (
          <div key={section} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>
              {section}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {menuItems.filter(item => item.section === section).map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: 'none', background: isActive ? 'var(--primary-light)' : 'transparent', color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: isActive ? 600 : 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', position: 'relative'
                    }}
                  >
                    <Icon size={18} />
                    {item.label}
                    {item.isNew && (
                      <span style={{ position: 'absolute', right: '10px', background: 'var(--danger-color)', color: 'white', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>NEW</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
