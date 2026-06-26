'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { useEnterpriseStore, SystemRole } from '@/store/enterpriseStore';
import { 
  Shield, CheckSquare, Square, Lock, Users, Plus, Key, 
  Layers, CheckCircle2, AlertCircle, Sparkles
} from 'lucide-react';

export default function EnterpriseRBACPage() {
  const { roles, updateRolePermissions } = useEnterpriseStore();
  const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[0]?.id || 'role-1');
  const selectedRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  const permKeys = [
    { key: 'view', label: 'View Records' },
    { key: 'create', label: 'Create Records' },
    { key: 'edit', label: 'Edit Records' },
    { key: 'delete', label: 'Delete Records' },
    { key: 'approve', label: 'Approve Workflows' },
    { key: 'reject', label: 'Reject Workflows' },
    { key: 'assign', label: 'Assign Records' },
    { key: 'export', label: 'Export Data' },
    { key: 'import', label: 'Bulk Import' },
    { key: 'manage', label: 'Manage Team' },
    { key: 'audit', label: 'View Audit Vault' },
    { key: 'configure', label: 'Platform Config' }
  ];

  const granKeys = [
    { key: 'property', label: 'Property Level Access' },
    { key: 'project', label: 'Project Level Access' },
    { key: 'tower', label: 'Tower Level Access' },
    { key: 'unit', label: 'Unit Inventory Lock' },
    { key: 'lead', label: 'Lead & Contact Scope' },
    { key: 'customer', label: 'Customer KYC Scope' },
    { key: 'booking', label: 'Booking Agreements' },
    { key: 'document', label: 'Document Vault' },
    { key: 'report', label: 'Executive Reports' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="ROLE BASED ACCESS CONTROL (RBAC)" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Shield className="text-brand-blue" /> IAM & Granular Security Matrix
            </h2>
            <p className="text-xs text-[#71717A]">Configure system-wide privileges, CRUD matrix, and record-level security boundaries.</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-brand-blue text-[#111111] rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-lg">
            <Plus size={14} /> Create Custom Role
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: Role List */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider block px-1">Enterprise Roles ({roles.length})</span>
            {roles.map((role) => (
              <div 
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  role.id === selectedRoleId 
                    ? 'bg-[#1A1A24] border-brand-blue shadow-lg shadow-brand-blue/10' 
                    : 'bg-[#111111] border-[#2A2A30] hover:border-[#3F3F46]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white">{role.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#A1A1AA] border border-white/10">
                    {role.userCount} users
                  </span>
                </div>
                <p className="text-xs text-[#71717A] line-clamp-2">{role.description}</p>
                {role.isSystem && (
                  <div className="mt-2 text-[10px] text-purple-400 flex items-center gap-1 font-mono font-semibold">
                    <Lock size={10} /> SYSTEM ROLE
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Permission Inspection Matrix */}
          <div className="lg:col-span-3 bg-[#111111] rounded-2xl border border-[#2A2A30] p-8">
            <div className="flex items-start justify-between border-b border-[#2A2A30] pb-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-extrabold text-white">{selectedRole.name} Matrix</h3>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-brand-blue/10 border border-brand-blue/30 text-brand-blue">
                    ID: {selectedRole.id.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-[#A1A1AA] max-w-xl">{selectedRole.description}</p>
              </div>

              <div className="text-right bg-[#16161C] p-3 rounded-xl border border-[#2A2A30]">
                <span className="text-xs text-[#71717A] block">Assigned Staff</span>
                <span className="text-lg font-bold text-white">{selectedRole.userCount} Enterprise Users</span>
              </div>
            </div>

            {/* Section 1: Core Action Permissions */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <Key size={16} className="text-amber-400" /> Platform Action Privileges
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {permKeys.map((item) => {
                  const isChecked = (selectedRole.permissions as any)[item.key];
                  return (
                    <label 
                      key={item.key}
                      onClick={() => updateRolePermissions(selectedRole.id, 'permissions', item.key, !isChecked)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                        isChecked 
                          ? 'bg-blue-500/10 border-blue-500/40 text-white' 
                          : 'bg-[#16161C] border-[#2A2A30] text-[#71717A] hover:border-[#3F3F46]'
                      }`}
                    >
                      <input type="checkbox" checked={isChecked} readOnly className="sr-only" />
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${isChecked ? 'bg-blue-500 border-blue-400 text-white' : 'border-[#3F3F46] bg-[#111111]'}`}>
                        {isChecked && <CheckCircle2 size={14} />}
                      </div>
                      <span className="text-xs font-semibold">{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Granular Level Controls */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} className="text-purple-400" /> Granular Record-Level Controls
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {granKeys.map((item) => {
                  const isChecked = (selectedRole.granular as any)[item.key];
                  return (
                    <label 
                      key={item.key}
                      onClick={() => updateRolePermissions(selectedRole.id, 'granular', item.key, !isChecked)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                        isChecked 
                          ? 'bg-purple-500/10 border-purple-500/40 text-white' 
                          : 'bg-[#16161C] border-[#2A2A30] text-[#71717A] hover:border-[#3F3F46]'
                      }`}
                    >
                      <input type="checkbox" checked={isChecked} readOnly className="sr-only" />
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${isChecked ? 'bg-purple-500 border-purple-400 text-white' : 'border-[#3F3F46] bg-[#111111]'}`}>
                        {isChecked && <CheckCircle2 size={14} />}
                      </div>
                      <span className="text-xs font-semibold">{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
