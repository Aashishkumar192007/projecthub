'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/useAuthStore'; // Adjust path if needed
import {
  Shield,
  ChevronRight,
  User,
  Mail,
  Lock,
  Building,
  Layers,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Home,
  TrendingUp,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

interface RoleTemplate {
  id: string;
  name: string;
  description: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { bypassLogin } = useAuthStore(); // Grab our bypass action
  const [step, setStep] = useState(1);

  // Step 1 State
  const [vertical, setVertical] = useState<string>('');
  const [roleTemplates, setRoleTemplates] = useState<RoleTemplate[]>([]);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState(false);

  // Step 2 State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roleId, setRoleId] = useState('');
  const [scopeReference, setScopeReference] = useState('HILLS-PHASE-II');
  const [tenantId, setTenantId] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic vertical icons mapping matching reference styling
  const verticalsList = [
    {
      id: 'Business Property',
      title: 'Business',
      description: 'Corporate portfolios and commercial assets.',
      icon: Building,
      iconBg: 'bg-[#EEF2F6] text-[#0038FF]',
      selectedBg: 'border-[#0038FF] ring-2 ring-[#0038FF]/10 bg-slate-50',
    },
    {
      id: 'Property Dealer',
      title: 'Dealer',
      description: 'Connect buyers, sellers, listings & CRM.',
      icon: Globe,
      iconBg: 'bg-[#EEF2F6] text-[#0038FF]',
      selectedBg: 'border-[#0038FF] ring-2 ring-[#0038FF]/10 bg-slate-50',
    },
    {
      id: 'Society Owner',
      title: 'Owner',
      description: 'Gated community & residential complex OS.',
      icon: Home,
      iconBg: 'bg-[#EEF2F6] text-[#0038FF]',
      selectedBg: 'border-[#0038FF] ring-2 ring-[#0038FF]/10 bg-slate-50',
    },
    {
      id: 'Resident',
      title: 'Resident',
      description: 'Payments, amenities and community portal.',
      icon: User,
      iconBg: 'bg-[#EEF2F6] text-[#0038FF]',
      selectedBg: 'border-[#0038FF] ring-2 ring-[#0038FF]/10 bg-slate-50',
    },
    {
      id: 'Security Company',
      title: 'Security',
      description: 'Monitor visitor logs & access checkpoints.',
      icon: Shield,
      iconBg: 'bg-[#EEF2F6] text-[#0038FF]',
      selectedBg: 'border-[#0038FF] ring-2 ring-[#0038FF]/10 bg-slate-50',
    },
    {
      id: 'Construction',
      title: 'Construction',
      description: 'Track materials, shift logs & workflows.',
      icon: Briefcase,
      iconBg: 'bg-[#EEF2F6] text-[#0038FF]',
      selectedBg: 'border-[#0038FF] ring-2 ring-[#0038FF]/10 bg-slate-50',
    },
    {
      id: 'Buyer / Investor',
      title: 'Investor / Buyer',
      description: 'ROI analytics and yield tracking.',
      icon: TrendingUp,
      iconBg: 'bg-[#EEF2F6] text-[#0038FF]',
      selectedBg: 'border-[#0038FF] ring-2 ring-[#0038FF]/10 bg-slate-50',
    }
  ];

  // Handle Step 1 card click (loads roles, doesn't auto-advance)
  const handleVerticalSelect = async (selectedVertical: string) => {
    setVertical(selectedVertical);
    setIsFetchingTemplates(true);
    setError('');

    try {
      const res = await fetch(`http://localhost:3001/api/auth/role-templates?vertical=${encodeURIComponent(selectedVertical)}`);
      if (!res.ok) {
        throw new Error('Failed to retrieve roles for the selected vertical');
      }
      const data = await res.json();
      setRoleTemplates(data);

      if (data.length > 0) {
        setRoleId(data[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching roles');
    } finally {
      setIsFetchingTemplates(false);
    }
  };

  const handleVerticalSelectBypass = (verticalName: string) => {
    // 1. Map the visual card click to its specific functional role string
    let roleName = 'Executive';
    let targetDashboardRoute = '/';

    switch (verticalName) {
      case 'Construction':
        roleName = 'FacilityManager';
        targetDashboardRoute = '/projects';
        break;
      case 'Business Property':
        roleName = 'PropertyManager';
        targetDashboardRoute = '/properties';
        break;
      case 'Property Dealer':
        roleName = 'LeasingAgent';
        targetDashboardRoute = '/listings';
        break;
      case 'Society Owner':
        roleName = 'PropertyManager';
        targetDashboardRoute = '/society';
        break;
      case 'Resident':
        roleName = 'Executive';
        targetDashboardRoute = '/resident';
        break;
      case 'Security Company':
        roleName = 'FacilityManager';
        targetDashboardRoute = '/facilities';
        break;
      case 'Buyer / Investor':
        roleName = 'Executive';
        targetDashboardRoute = '/portfolio';
        break;
    }

    // 2. Fake the login injection inside Zustand instantly
    bypassLogin(roleName, 'HILLS-PHASE-II');

    // 3. Teleport straight past the authentication gate to your webpage
    router.push(targetDashboardRoute);
  };

  // Continue to Step 2
  const handleContinueToCredentials = () => {
    if (vertical) {
      setStep(2);
    } else {
      setError('Please select a workspace category to continue.');
    }
  };

  // Check query parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const verticalParam = params.get('vertical');
      if (verticalParam) {
        const matched = verticalsList.find(v => v.id.toLowerCase() === verticalParam.toLowerCase() || v.id === verticalParam);
        if (matched) {
          handleVerticalSelectBypass(matched.id);
        }
      }
    }
  }, []);

  // Handle Step 2 Registration Submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          roleId,
          scopeReference,
          tenantId: tenantId || undefined
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
      }

      const data = await res.json();

      // Store session details
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Go to step 3
      setStep(3);
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

return (
  <div className="flex min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">

    {/* Left Column - Product Branding & Highlights */}
    <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-16 bg-[#EEF2F6] border-r border-slate-200/60">
      <div>
        <h1 className="text-[32px] font-black tracking-tight text-[#0038FF] cursor-pointer" onClick={() => router.push('/')}>
          PropertyHub360
        </h1>
        <p className="mt-3 text-base text-slate-600 font-medium leading-relaxed max-w-[340px]">
          The precision-engineered operating system for modern real estate professionals and residents.
        </p>
      </div>

      <div className="space-y-8 my-auto">
        {/* Highlight 1: Enterprise Ready */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0038FF] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(0,56,255,0.2)]">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Enterprise Ready</p>
            <p className="text-sm font-semibold text-slate-700 mt-1 leading-relaxed">
              Real-time data synchronization across all property assets.
            </p>
          </div>
        </div>

        {/* Highlight 2: Secure Access */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
            <Shield className="w-5 h-5 text-[#0038FF]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Secure Access</p>
            <p className="text-sm font-semibold text-slate-700 mt-1 leading-relaxed">
              Role-based permissions with military-grade encryption.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 font-mono">
          &copy; 2026 PropertyHub360. Professional Asset Management.
        </p>
      </div>
    </div>

    {/* Right Column - Multi-Step wizard */}
    <div className="flex-1 flex flex-col justify-center bg-white px-6 py-12 md:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-lg">

        {/* Stepper Navigation */}
        <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-10">
          <div className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${step > 1 ? 'bg-[#0038FF] text-white' : 'bg-[#0038FF] text-white ring-4 ring-blue-100'
              }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className={`text-[10px] md:text-xs font-semibold mt-1.5 transition-colors duration-300 ${step >= 1 ? 'text-[#0038FF]' : 'text-slate-400'}`}>Account Type</span>
          </div>
          <div className={`h-[2px] w-8 md:w-16 -mt-5 transition-all duration-500 ${step > 1 ? 'bg-[#0038FF]' : 'bg-slate-200'}`} />

          <div className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${step > 2 ? 'bg-[#0038FF] text-white' : step === 2 ? 'bg-[#0038FF] text-white ring-4 ring-blue-100' : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}>
              {step > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <span className={`text-[10px] md:text-xs font-semibold mt-1.5 transition-colors duration-300 ${step >= 2 ? 'text-[#0038FF]' : 'text-slate-400'}`}>Credentials</span>
          </div>
          <div className={`h-[2px] w-8 md:w-16 -mt-5 transition-all duration-500 ${step > 2 ? 'bg-[#0038FF]' : 'bg-slate-200'}`} />

          <div className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${step === 3 ? 'bg-[#0038FF] text-white ring-4 ring-blue-100' : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}>
              3
            </div>
            <span className={`text-[10px] md:text-xs font-semibold mt-1.5 transition-colors duration-300 ${step === 3 ? 'text-[#0038FF]' : 'text-slate-400'}`}>Verification</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* STEP 1: ACCOUNT TYPE SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Select your role</h2>
              <p className="text-slate-500 text-sm font-semibold mt-1">Tailoring your dashboard experience starts here.</p>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {verticalsList.map((v) => {
                const Icon = v.icon;
                const isSelected = vertical === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleVerticalSelectBypass(v.id)}
                    className={`group flex items-start gap-3.5 text-left p-4 rounded-xl border transition-all duration-300 ${isSelected
                        ? v.selectedBg
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                  >
                    <div className={`p-2.5 rounded-lg ${v.iconBg} transition-all duration-300 flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{v.title}</h4>
                      <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-snug">
                        {v.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-4">
              <button
                onClick={handleContinueToCredentials}
                disabled={!vertical || isFetchingTemplates}
                className="flex w-full justify-center items-center rounded-xl bg-[#0038FF] hover:bg-blue-700 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 disabled:opacity-50 disabled:hover:bg-[#0038FF] cursor-pointer"
              >
                {isFetchingTemplates ? 'Loading configuration...' : 'Continue to Credentials'}
              </button>

              <p className="text-center text-xs font-semibold text-slate-500">
                Already have an account?{' '}
                <button onClick={() => router.push('/login')} className="font-bold text-[#0038FF] hover:underline">
                  Log In
                </button>
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: CREDENTIALS INPUT */}
        {step === 2 && (
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Back breadcrumb bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center text-xs font-bold text-[#0038FF] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold bg-slate-100 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0038FF]"></span>
                {verticalsList.find(v => v.id === vertical)?.title || vertical}
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
              <p className="text-slate-500 text-xs font-semibold mt-1">Please enter your setup credentials below.</p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0038FF] focus:outline-none focus:ring-1 focus:ring-[#0038FF] transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0038FF] focus:outline-none focus:ring-1 focus:ring-[#0038FF] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0038FF] focus:outline-none focus:ring-1 focus:ring-[#0038FF] transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Tenant ID (Workspace) - Optional */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Tenant ID (Optional Workspace)
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0038FF] focus:outline-none focus:ring-1 focus:ring-[#0038FF] transition-all"
                    placeholder="e.g. acme-corp (auto-generated if empty)"
                  />
                </div>
              </div>

              {/* Role Selection Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Assign Structural Role
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <select
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white pl-10 pr-8 py-3 text-sm text-slate-900 focus:border-[#0038FF] focus:outline-none focus:ring-1 focus:ring-[#0038FF] transition-all cursor-pointer appearance-none"
                  >
                    {roleTemplates.length > 0 ? (
                      roleTemplates.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))
                    ) : (
                      <option>No roles available</option>
                    )}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Scope Reference */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  {vertical === 'Construction' ? 'Project Site Scope Reference' : 'Resource Scope Reference'}
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={scopeReference}
                    onChange={(e) => setScopeReference(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0038FF] focus:outline-none focus:ring-1 focus:ring-[#0038FF] transition-all"
                    placeholder="e.g. HILLS-PHASE-II"
                  />
                </div>
              </div>

              {/* Agree terms */}
              <div className="flex items-start pt-1">
                <div className="flex items-center h-5">
                  <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#0038FF] focus:ring-[#0038FF] cursor-pointer"
                  />
                </div>
                <div className="ml-2.5 text-xs text-slate-500 font-semibold leading-relaxed">
                  <label htmlFor="agree-terms" className="cursor-pointer select-none">
                    I agree to the <span className="text-[#0038FF] hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#0038FF] hover:underline cursor-pointer">Privacy Policy</span>.
                  </label>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center items-center rounded-xl bg-[#0038FF] hover:bg-blue-700 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'Assembling environment...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: EMAIL VERIFICATION */}
        {step === 3 && (
          <div className="space-y-6 flex flex-col items-center text-center">

            {/* Mail Icon Envelope Circle */}
            <div className="w-16 h-16 rounded-2xl bg-[#EEF2F6] flex items-center justify-center text-[#0038FF] shadow-[0_8px_20px_rgba(0,56,255,0.08)] mb-2 animate-bounce">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Check your email</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">
                We've sent a verification link to your email address. Click the link inside to activate your PropertyHub360 account.
              </p>
            </div>

            {/* Help box */}
            <div className="w-full bg-[#F8F9FA] rounded-xl p-5 border border-slate-100 text-left">
              <h5 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">Haven't received it?</h5>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#0038FF]"></div>
                  Check your spam folder
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#0038FF]"></div>
                  Wait up to 5 minutes
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="w-full pt-4 space-y-3.5">
              <button
                onClick={() => {
                  setError('');
                  alert('Simulated email resend completed successfully.');
                }}
                className="flex w-full justify-center items-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-700 transition-all cursor-pointer"
              >
                Resend Verification Email
              </button>

              <button
                onClick={() => router.push('/dashboard')}
                className="flex w-full justify-center items-center rounded-xl bg-[#0038FF] hover:bg-blue-700 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all cursor-pointer animate-pulse"
              >
                Proceed to Dashboard
              </button>

              <button
                onClick={() => router.push('/login')}
                className="text-xs font-bold text-[#0038FF] hover:underline block mx-auto pt-1"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

      </div>
    </div>

  </div>
);
}
