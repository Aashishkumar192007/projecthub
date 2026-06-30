'use client';

import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Home, 
  Shield, 
  User, 
  Briefcase, 
  TrendingUp, 
  Play, 
  ArrowRight,
  Globe,
  MapPin,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  // Navigation handlers
  const handleRegisterClick = () => {
    router.push('/signup');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handlePathClick = (verticalName: string) => {
    router.push(`/signup?vertical=${encodeURIComponent(verticalName)}`);
  };

  // 7 paths data from the reference image
  const paths = [
    {
      id: 'Business Property',
      title: 'Business Property',
      description: 'Manage corporate portfolios and commercial assets with institutional precision.',
      linkText: 'Join as Entity',
      icon: Building2,
      colorClass: 'text-blue-600',
      bgClass: 'bg-blue-50/50',
    },
    {
      id: 'Property Dealer',
      title: 'Property Dealer',
      description: 'Connect buyers and sellers with a centralized listing and CRM platform.',
      linkText: 'Register Agency',
      icon: Globe,
      colorClass: 'text-indigo-600',
      bgClass: 'bg-indigo-50/50',
    },
    {
      id: 'Society Owner',
      title: 'Society Owner',
      description: 'The operating system for gated communities and residential complexes.',
      linkText: 'Manage Community',
      icon: Building2,
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50/50',
    },
    {
      id: 'Resident',
      title: 'Resident',
      description: 'Your personal dashboard for payments, amenities, and community updates.',
      linkText: 'Access Home',
      icon: Home,
      colorClass: 'text-orange-600',
      bgClass: 'bg-orange-50/50',
    },
    {
      id: 'Security Company',
      title: 'Security Company',
      description: 'Monitor access, logs, and personnel across multiple client sites.',
      linkText: 'Deploy Systems',
      icon: Shield,
      colorClass: 'text-red-600',
      bgClass: 'bg-red-50/50',
    },
    {
      id: 'Construction',
      title: 'Construction',
      description: 'Track projects, certifications, and shift logs in a unified work portal.',
      linkText: 'Get Certified',
      icon: Briefcase,
      colorClass: 'text-amber-600',
      bgClass: 'bg-amber-50/50',
    },
    {
      id: 'Buyer / Investor',
      title: 'Buyer / Investor',
      description: 'Advanced data-driven insights for global property acquisitions and ROI tracking.',
      linkText: 'Start Investing',
      icon: TrendingUp,
      colorClass: 'text-teal-600',
      bgClass: 'bg-teal-50/50',
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60" style={{
        backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px'
      }} />

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-2xl font-black text-blue-600 tracking-tight">PropertyHub360</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLoginClick}
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-3 py-2"
          >
            Sign In
          </button>
          <button 
            onClick={handleRegisterClick}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-all shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
          >
            Register
          </button>
          
          <div 
            onClick={handleLoginClick}
            className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 cursor-pointer shadow hover:ring-2 hover:ring-blue-400 transition-all"
          >
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Ecosystem Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-bold text-blue-600 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
            ECOSYSTEM V2.0 LIVE
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
            One Place for <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Real Estate</span> Everything.
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl mb-8">
            The operating system for the entire real estate lifecycle. Connect, manage, and grow your presence in the global property market.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => router.push('/signup')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-base transition-all shadow-[0_6px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 text-center"
            >
              Start Exploring
            </button>
            
            <button 
              onClick={() => router.push('/signup')}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-xl text-base transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <Play size={10} fill="currentColor" />
              </span>
              View Platform Tour
            </button>
          </div>

        </div>

        {/* Right Visual Column */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          
          {/* Main Visual Frame */}
          <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/40">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" 
              alt="Modern Real Estate Infrastructure" 
              className="w-full h-full object-cover select-none"
            />
            {/* Soft gradient overlay to blend image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

            {/* Top-Right Floating Card: Secure Protocol */}
            <div className="absolute top-6 right-6 p-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-md shadow-xl flex items-center gap-3 animate-fade-in max-w-[220px]">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Shield size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-tight">Secure Protocol</p>
                <p className="text-[10px] font-bold text-slate-500 mt-0.5">256-bit Encryption</p>
              </div>
            </div>

            {/* Bottom Floating Card: Live Portfolio Performance */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Live Portfolio Performance</span>
                <span className="text-xs font-black text-blue-600">+12.4%</span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="w-full h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[72%] shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Path Selection Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-200/80">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-slate-400 uppercase">Choose Your Path</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-4">
            Select the role that best defines your position
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Select the role that best defines your position in the ecosystem to unlock tailored tools and data views.
          </p>
        </div>

        {/* 4x2 Grid of Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <div 
                key={path.id}
                onClick={() => handlePathClick(path.id)}
                className="group relative bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-6 flex flex-col justify-between items-start cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-full">
                  {/* Card Icon */}
                  <div className={`w-12 h-12 rounded-xl ${path.bgClass} ${path.colorClass} flex items-center justify-center mb-6 border border-transparent group-hover:border-blue-100 transition-all`}>
                    <Icon size={22} className="stroke-[2.2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {path.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                    {path.description}
                  </p>
                </div>

                {/* Arrow Link */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors mt-auto">
                  <span>{path.linkText}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}

          {/* Staircase Graphics Card */}
          <div className="relative group bg-slate-950 rounded-2xl overflow-hidden shadow-md flex items-center justify-center min-h-[220px]">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" 
              alt="Tailored Paths" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 select-none group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/85 to-blue-950/30" />
            
            <div className="relative z-10 text-center p-6 flex flex-col items-center">
              {/* Icon / Design */}
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white mb-4">
                <Lock size={16} />
              </div>
              <p className="text-sm font-black text-white tracking-wide">Unlock Tailored Views</p>
              <p className="text-xs font-semibold text-slate-400 mt-1 max-w-[180px] leading-relaxed">
                Connect and manage your entire portfolio dynamically.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* Stats Footer Section */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-200/80">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="text-center flex flex-col items-center">
            <span className="text-4xl font-black tracking-tight text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">$4.2B+</span>
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-2">Assets Managed</span>
          </div>

          <div className="text-center flex flex-col items-center">
            <span className="text-4xl font-black tracking-tight text-slate-900">150k</span>
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-2">Active Residents</span>
          </div>

          <div className="text-center flex flex-col items-center">
            <span className="text-4xl font-black tracking-tight text-slate-900">12</span>
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-2">Global Hubs</span>
          </div>

          <div className="text-center flex flex-col items-center">
            <span className="text-4xl font-black tracking-tight text-slate-900">99.9%</span>
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-2">Uptime SLA</span>
          </div>

        </div>

        <div className="text-center mt-16 pt-8 border-t border-slate-200/50">
          <p className="text-xs text-slate-400 font-bold tracking-wide">
            &copy; {new Date().getFullYear()} PropertyHub360 Systems Inc. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
