'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { useEnterpriseStore, EnterpriseUser } from '@/store/enterpriseStore';
import { 
  Users, UserPlus, Search, Filter, MoreVertical, CheckCircle2, 
  XCircle, AlertTriangle, KeyRound, ShieldAlert, Sparkles, Phone, Mail, Clock
} from 'lucide-react';

export default function EnterpriseUserManagementPage() {
  const { users, roles, orgNodes, addUser, updateUserStatus } = useEnterpriseStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<EnterpriseUser | null>(null);

  // Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Sales Executive');
  const [newTeam, setNewTeam] = useState('Syndicate Alpha');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    const newUser: EnterpriseUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: newName,
      email: newEmail,
      role: newRole,
      team: newTeam,
      region: 'EMEA',
      status: 'Active',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=2563EB&color=fff`,
      lastLogin: 'Never',
      performanceScore: 85,
      phone: '+1 (555) 019-9921'
    };
    addUser(newUser);
    setIsCreateOpen(false);
    setNewName('');
    setNewEmail('');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="ENTERPRISE USER DIRECTORY & IAM" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Users className="text-brand-blue" /> User Management & Staff Allocations
            </h2>
            <p className="text-xs text-[#71717A]">Provision enterprise accounts, assign roles & regional projects, and monitor audit login histories.</p>
          </div>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-blue text-[#111111] rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-lg whitespace-nowrap"
          >
            <UserPlus size={14} /> Provision New User
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#111111] p-4 rounded-xl border border-[#2A2A30] flex flex-col sm:flex-row gap-4 justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search staff by name, email, or team ID..."
              className="w-full bg-[#16161C] border border-[#2A2A30] rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Filter size={14} className="text-[#71717A]" />
            <span className="text-[#71717A]">Filter by Role:</span>
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#16161C] border border-[#2A2A30] rounded-lg px-3 py-1.5 text-xs text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="All">All Roles ({users.length})</option>
              {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#16161C] border-b border-[#2A2A30] text-[#A1A1AA]">
                  <th className="py-3.5 pl-6 pr-3 font-bold">STAFF MEMBER</th>
                  <th className="py-3.5 px-3 font-bold">SYSTEM ROLE</th>
                  <th className="py-3.5 px-3 font-bold">ASSIGNED TEAM</th>
                  <th className="py-3.5 px-3 font-bold">STATUS</th>
                  <th className="py-3.5 px-3 font-bold">LAST LOGIN</th>
                  <th className="py-3.5 px-3 font-bold">PERFORMANCE</th>
                  <th className="py-3.5 pr-6 text-right font-bold">ADMIN ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A30]">
                {filteredUsers.map((usr) => (
                  <tr key={usr.id} className="hover:bg-[#16161C]/50 transition-colors group">
                    <td className="py-4 pl-6 pr-3">
                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedUser(usr)}>
                        <img src={usr.avatar} alt="" className="w-9 h-9 rounded-full border border-[#3F3F46]" />
                        <div>
                          <div className="font-bold text-white text-sm group-hover:text-brand-blue transition-colors">{usr.name}</div>
                          <div className="text-[#71717A] text-[11px]">{usr.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 rounded font-semibold bg-white/5 border border-white/10 text-neutral-300">
                        {usr.role}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-[#A1A1AA]">{usr.team} ({usr.region})</td>
                    <td className="py-4 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        usr.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        usr.status === 'Suspended' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {usr.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-[#71717A] flex items-center gap-1 mt-3"><Clock size={12} /> {usr.lastLogin}</td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#2A2A30] h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${usr.performanceScore >= 90 ? 'bg-emerald-400' : usr.performanceScore >= 75 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${usr.performanceScore}%` }} />
                        </div>
                        <span className="font-mono font-bold text-white">{usr.performanceScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-right space-x-1.5">
                      {usr.status === 'Active' ? (
                        <button 
                          onClick={() => updateUserStatus(usr.id, 'Suspended')}
                          className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[10px] font-bold transition-colors"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button 
                          onClick={() => updateUserStatus(usr.id, 'Active')}
                          className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold transition-colors"
                        >
                          Activate
                        </button>
                      )}
                      <button 
                        onClick={() => alert(`Password reset link dispatched securely to ${usr.email} via KMS Hash Vault.`)}
                        title="Reset Password"
                        className="p-1.5 rounded bg-[#1E1E24] hover:bg-[#2A2A30] text-[#A1A1AA] hover:text-white transition-colors"
                      >
                        <KeyRound size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create User Modal */}
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111111] border border-[#2A2A30] rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-[#2A2A30] pb-4 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><UserPlus className="text-brand-blue" /> Provision Enterprise Account</h3>
                <button onClick={() => setIsCreateOpen(false)} className="text-[#71717A] hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-semibold">Full Staff Name *</label>
                  <input required type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Liam Cunningham" className="w-full bg-[#16161C] border border-[#2A2A30] rounded-lg p-2.5 text-white focus:border-brand-blue focus:outline-none" />
                </div>

                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-semibold">Corporate Email *</label>
                  <input required type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="e.g. liam@propertyhub360.com" className="w-full bg-[#16161C] border border-[#2A2A30] rounded-lg p-2.5 text-white focus:border-brand-blue focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A1A1AA] mb-1 font-semibold">Assigned IAM Role</label>
                    <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="w-full bg-[#16161C] border border-[#2A2A30] rounded-lg p-2.5 text-white focus:border-brand-blue focus:outline-none">
                      {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#A1A1AA] mb-1 font-semibold">Assigned Team</label>
                    <input type="text" value={newTeam} onChange={(e) => setNewTeam(e.target.value)} className="w-full bg-[#16161C] border border-[#2A2A30] rounded-lg p-2.5 text-white focus:border-brand-blue focus:outline-none" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-[#2A2A30]">
                  <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 rounded-lg bg-[#1E1E24] text-[#A1A1AA] hover:text-white font-bold">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-lg bg-brand-blue text-[#111111] font-bold shadow-lg shadow-brand-blue/20">Provision Account</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* User Profile Slideover */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
            <div className="bg-[#111111] border-l border-[#2A2A30] w-full max-w-xl h-full overflow-y-auto p-8 shadow-2xl animate-in slide-in-from-right">
              <div className="flex items-center justify-between pb-6 border-b border-[#2A2A30] mb-6">
                <span className="text-xs font-mono text-brand-blue uppercase font-bold tracking-wider">STAFF PROFILE 360</span>
                <button onClick={() => setSelectedUser(null)} className="text-[#71717A] hover:text-white text-base">✕</button>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <img src={selectedUser.avatar} alt="" className="w-16 h-16 rounded-2xl border border-[#3F3F46]" />
                <div>
                  <h3 className="text-xl font-extrabold text-white">{selectedUser.name}</h3>
                  <p className="text-xs text-[#71717A]">{selectedUser.email}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold">
                    {selectedUser.role}
                  </span>
                </div>
              </div>

              <div className="space-y-6 text-xs">
                <div className="bg-[#16161C] p-4 rounded-xl border border-[#2A2A30] space-y-3">
                  <span className="text-[#A1A1AA] font-bold uppercase block text-[10px]">Employment & Contact Details</span>
                  <div className="flex justify-between"><span>Assigned Branch:</span> <span className="text-white font-semibold">{selectedUser.team}</span></div>
                  <div className="flex justify-between"><span>Region:</span> <span className="text-white font-semibold">{selectedUser.region}</span></div>
                  <div className="flex justify-between"><span>Direct Line:</span> <span className="text-white font-mono">{selectedUser.phone}</span></div>
                  <div className="flex justify-between"><span>Account Status:</span> <span className="text-emerald-400 font-bold">{selectedUser.status}</span></div>
                </div>

                <div className="bg-[#16161C] p-4 rounded-xl border border-[#2A2A30] space-y-2">
                  <span className="text-[#A1A1AA] font-bold uppercase block text-[10px]">Activity & Audit Telemetry</span>
                  <div className="flex justify-between"><span>Last Vault Login:</span> <span className="text-white">{selectedUser.lastLogin}</span></div>
                  <div className="flex justify-between"><span>Sales Quota Attainment:</span> <span className="text-amber-400 font-mono font-bold">{selectedUser.performanceScore}%</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
