'use client';

import { useEffect, useState } from 'react';
import { 
  Building, 
  Globe, 
  Home, 
  User, 
  Shield, 
  Briefcase, 
  TrendingUp, 
  Plus, 
  Loader2, 
  Inbox,
  Building2,
  Map,
  DollarSign
} from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  tenantId: string;
  vertical?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#121212] min-h-[80vh]">
        <Loader2 className="w-8 h-8 text-brand-blue animate-spin mb-3" />
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Syncing Environment...</p>
      </div>
    );
  }

  // Determine the workspace component based on user's vertical
  const userVertical = user?.vertical || '';

  switch (userVertical) {
    case 'Business Property':
      return <BusinessPropertyWorkspace user={user!} />;
    case 'Property Dealer':
      return <PropertyDealerWorkspace user={user!} />;
    case 'Society Owner':
      return <SocietyOwnerWorkspace user={user!} />;
    case 'Resident':
      return <ResidentWorkspace user={user!} />;
    case 'Security Company':
      return <SecurityWorkspace user={user!} />;
    case 'Construction':
      return <ConstructionWorkspace user={user!} />;
    case 'Buyer / Investor':
      return <InvestorWorkspace user={user!} />;
    default:
      return <DefaultDashboardOverview user={user} />;
  }
}

/* ==========================================================================
   1. BUSINESS PROPERTY WORKSPACE (Purple Theme)
   ========================================================================== */
function BusinessPropertyWorkspace({ user }: { user: UserData }) {
  return (
    <div className="p-8 bg-[#121212] text-white min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Business Property Cloud</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
          Welcome, {user.firstName || 'User'} &bull; Corporate Asset Management
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Empty State Panel */}
        <div className="bg-[#161616] border border-[#2A2A30] rounded-2xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)] mb-6">
            <Building size={28} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">No Registered Commercial Assets</h3>
          <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
            Deploy corporate portfolios and manage commercial office units or industrial warehouses. Add your first asset to track yields and occupancies.
          </p>

          <button className="flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(168,85,247,0.25)] hover:shadow-[0_4px_30px_rgba(168,85,247,0.4)]">
            <Plus size={16} /> Register Commercial Asset
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Lease Pipeline</p>
            <h4 className="text-sm font-bold text-white mb-4">Commercial Agreements</h4>
            <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold bg-purple-950/30 w-fit px-2.5 py-1 rounded-full border border-purple-500/10">
              0 Active Leases
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Yield Ratios</p>
            <h4 className="text-sm font-bold text-white mb-4">Financial Projections</h4>
            <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold bg-purple-950/30 w-fit px-2.5 py-1 rounded-full border border-purple-500/10">
              0% Portfolio ROI
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Accounts</p>
            <h4 className="text-sm font-bold text-white mb-4">Tenant Management</h4>
            <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold bg-purple-950/30 w-fit px-2.5 py-1 rounded-full border border-purple-500/10">
              0 Invoiced Tenants
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. PROPERTY DEALER CRM WORKSPACE (Blue Theme)
   ========================================================================== */
function PropertyDealerWorkspace({ user }: { user: UserData }) {
  return (
    <div className="p-8 bg-[#121212] text-white min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Property Dealer CRM</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
          Welcome, {user.firstName || 'User'} &bull; Broker Deal Flow & Listings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-[#161616] border border-[#2A2A30] rounded-2xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-blue-950/60 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)] mb-6">
            <Globe size={28} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">No Active Listings Configured</h3>
          <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
            Connect buyers and sellers, upload real estate inventory, and run automated marketing campaigns. Post your first listing to initialize.
          </p>

          <button className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_30px_rgba(59,130,246,0.4)]">
            <Plus size={16} /> Create Property Listing
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Active Pipeline</p>
            <h4 className="text-sm font-bold text-white mb-4">Leads & Opportunities</h4>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold bg-blue-950/30 w-fit px-2.5 py-1 rounded-full border border-blue-500/10">
              0 Active Inquiries
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Deals Tracker</p>
            <h4 className="text-sm font-bold text-white mb-4">Closed Transactions</h4>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold bg-blue-950/30 w-fit px-2.5 py-1 rounded-full border border-blue-500/10">
              $0.00 Volume
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Catalog</p>
            <h4 className="text-sm font-bold text-white mb-4">Listings Directory</h4>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold bg-blue-950/30 w-fit px-2.5 py-1 rounded-full border border-blue-500/10">
              0 Active Posts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. SOCIETY OWNER WORKSPACE (Green Theme)
   ========================================================================== */
function SocietyOwnerWorkspace({ user }: { user: UserData }) {
  return (
    <div className="p-8 bg-[#121212] text-white min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Society & Community OS</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
          Welcome, {user.firstName || 'User'} &bull; Gated Community Infrastructure
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-[#161616] border border-[#2A2A30] rounded-2xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] mb-6">
            <Home size={28} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">No Gated Communities Configured</h3>
          <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
            Model blocks, wings, and units. Invite committee members, generate monthly bills, and activate digital visitor gate control.
          </p>

          <button className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.4)]">
            <Plus size={16} /> Configure Community Blocks
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Community Wings</p>
            <h4 className="text-sm font-bold text-white mb-4">Structure Allocation</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/30 w-fit px-2.5 py-1 rounded-full border border-emerald-500/10">
              0 Wings Mapped
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Roster</p>
            <h4 className="text-sm font-bold text-white mb-4">Residents & Tenants</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/30 w-fit px-2.5 py-1 rounded-full border border-emerald-500/10">
              0 Active Profiles
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Financials</p>
            <h4 className="text-sm font-bold text-white mb-4">Maintenance Accounts</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/30 w-fit px-2.5 py-1 rounded-full border border-emerald-500/10">
              0% Invoiced
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. RESIDENT PORTAL WORKSPACE (Orange Theme)
   ========================================================================== */
function ResidentWorkspace({ user }: { user: UserData }) {
  return (
    <div className="p-8 bg-[#121212] text-white min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Resident Portal</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
          Welcome, {user.firstName || 'User'} &bull; Gated Community Resident
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-[#161616] border border-[#2A2A30] rounded-2xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-amber-950/60 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] mb-6">
            <User size={28} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">No Dues or Active Requests</h3>
          <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
            Pay maintenance fees, schedule visitor arrivals, book common amenities, or submit support tickets directly to society management.
          </p>

          <button className="flex items-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.4)]">
            <Plus size={16} /> Raise Service Request
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Bills</p>
            <h4 className="text-sm font-bold text-white mb-4">Outstanding Dues</h4>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-950/30 w-fit px-2.5 py-1 rounded-full border border-amber-500/10">
              $0.00 Due
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Gate Pass</p>
            <h4 className="text-sm font-bold text-white mb-4">Visitor Invitations</h4>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-950/30 w-fit px-2.5 py-1 rounded-full border border-amber-500/10">
              0 Active Invites
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Events</p>
            <h4 className="text-sm font-bold text-white mb-4">Amenity Bookings</h4>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-950/30 w-fit px-2.5 py-1 rounded-full border border-amber-500/10">
              0 Bookings Mapped
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. SECURITY OPERATIONS WORKSPACE (Red Theme)
   ========================================================================== */
function SecurityWorkspace({ user }: { user: UserData }) {
  return (
    <div className="p-8 bg-[#121212] text-white min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Security Operations</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
          Welcome, {user.firstName || 'User'} &bull; Entry Checks & Checkpoint Log
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-[#161616] border border-[#2A2A30] rounded-2xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.15)] mb-6">
            <Shield size={28} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">No Active Patrol Checkpoints</h3>
          <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
            Register gate entries, pre-authorize visitors, log vehicle licensing details, and report real-time incidents across community locations.
          </p>

          <button className="flex items-center gap-2 px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(244,63,94,0.25)] hover:shadow-[0_4px_30px_rgba(244,63,94,0.4)]">
            <Plus size={16} /> Register Gate Checkpoint
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Check-in Logs</p>
            <h4 className="text-sm font-bold text-white mb-4">Gate Visitor Entry</h4>
            <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold bg-rose-950/30 w-fit px-2.5 py-1 rounded-full border border-rose-500/10">
              0 Checked In
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Incidents</p>
            <h4 className="text-sm font-bold text-white mb-4">Emergency Alerts</h4>
            <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold bg-rose-950/30 w-fit px-2.5 py-1 rounded-full border border-rose-500/10">
              0 Active Flags
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Shift Log</p>
            <h4 className="text-sm font-bold text-white mb-4">Patrol Checklists</h4>
            <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold bg-rose-950/30 w-fit px-2.5 py-1 rounded-full border border-rose-500/10">
              0 Reports Filed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   6. CONSTRUCTION & INFRASTRUCTURE WORKSPACE (Indigo Theme)
   ========================================================================== */
function ConstructionWorkspace({ user }: { user: UserData }) {
  return (
    <div className="p-8 bg-[#121212] text-white min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Construction & Infrastructure</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
          Welcome, {user.firstName || 'User'} &bull; Project Shift Logs & Scope Tracking
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-[#161616] border border-[#2A2A30] rounded-2xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)] mb-6">
            <Briefcase size={28} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">No Construction Sites Configured</h3>
          <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
            Submit daily shift logs, verify contractor licenses, map project scopes, and organize material procurement requests.
          </p>

          <button className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.4)]">
            <Plus size={16} /> Initialize Construction Site
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Roster</p>
            <h4 className="text-sm font-bold text-white mb-4">Contractor Registrations</h4>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold bg-indigo-950/30 w-fit px-2.5 py-1 rounded-full border border-indigo-500/10">
              0 Licensed Profiles
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Inventory</p>
            <h4 className="text-sm font-bold text-white mb-4">Material Requisitions</h4>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold bg-indigo-950/30 w-fit px-2.5 py-1 rounded-full border border-indigo-500/10">
              0 Active PRs
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Shift Logs</p>
            <h4 className="text-sm font-bold text-white mb-4">Daily Logs Mapped</h4>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold bg-indigo-950/30 w-fit px-2.5 py-1 rounded-full border border-indigo-500/10">
              0 Records Entered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   7. BUYER / INVESTOR WORKSPACE (Emerald Theme)
   ========================================================================== */
function InvestorWorkspace({ user }: { user: UserData }) {
  return (
    <div className="p-8 bg-[#121212] text-white min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Buyer & Investor Hub</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
          Welcome, {user.firstName || 'User'} &bull; High-Yield ROI Tracking
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-[#161616] border border-[#2A2A30] rounded-2xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] mb-6">
            <TrendingUp size={28} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">No Active Investments Tracked</h3>
          <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
            Link dynamic capital funds, construct acquisition deal rooms, and compute target property cap rates and yields.
          </p>

          <button className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.4)]">
            <Plus size={16} /> Connect Investment Fund
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Deal Flow</p>
            <h4 className="text-sm font-bold text-white mb-4">Acquisition Targets</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/30 w-fit px-2.5 py-1 rounded-full border border-emerald-500/10">
              0 Targets Mapped
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Analytics</p>
            <h4 className="text-sm font-bold text-white mb-4">Cap Rate Estimations</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/30 w-fit px-2.5 py-1 rounded-full border border-emerald-500/10">
              0 Models Run
            </div>
          </div>
          <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Capital</p>
            <h4 className="text-sm font-bold text-white mb-4">Fund Allocations</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/30 w-fit px-2.5 py-1 rounded-full border border-emerald-500/10">
              $0.00 Committed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   8. DEFAULT PORTFOLIO DASHBOARD OVERVIEW (Fallback)
   ========================================================================== */
function DefaultDashboardOverview({ user }: { user: UserData | null }) {
  const stats = [
    { name: 'Total Properties', stat: '14', icon: Building2 },
    { name: 'Total Units', stat: '342', icon: Home },
    { name: 'Active Projects', stat: '3', icon: Map },
    { name: 'Monthly Revenue', stat: '$1.2M', icon: DollarSign },
  ];

  return (
    <div className="p-8 text-white min-h-screen bg-[#121212]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 text-xs font-bold uppercase mt-1">
          Welcome, {user?.firstName || 'Admin'} &bull; Core Platform Command Center
        </p>
      </div>
      
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-[#161616] border border-[#2A2A30] pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-[#1A2533] border border-brand-blue/30 rounded-md p-3">
                <item.icon className="h-6 w-6 text-brand-blue" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-semibold text-[#A1A1AA] truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-black text-white">{item.stat}</p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <h2 className="text-lg leading-6 font-semibold text-white">Recent Activity</h2>
        <div className="mt-4 bg-[#161616] border border-[#2A2A30] rounded-lg p-8 flex flex-col items-center justify-center text-center text-slate-500">
          <Inbox size={32} className="text-[#3F3F46] mb-2" />
          <p className="text-xs font-bold">No recent activities found</p>
          <p className="text-[10px] text-slate-600 mt-0.5">Activities within your platform will update here dynamically.</p>
        </div>
      </div>
    </div>
  );
}
