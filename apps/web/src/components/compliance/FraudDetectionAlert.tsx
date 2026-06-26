import React, { useState } from 'react';
import { AlertTriangle, X, ShieldAlert, Fingerprint } from 'lucide-react';

interface FraudDetectionAlertProps {
  type: 'Duplicate PAN' | 'Duplicate Aadhaar' | 'Identity Mismatch' | 'Suspicious Transaction' | 'Fake Document';
  customerName: string;
  riskScore: number;
}

export function FraudDetectionAlert({ type, customerName, riskScore }: FraudDetectionAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-[#161616] border-2 border-rose-500/50 rounded-xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-bottom-5">
      <div className="p-4 bg-rose-500/10 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0 text-rose-500">
          <ShieldAlert size={20} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="text-rose-500 font-bold text-sm uppercase tracking-wider mb-1">Fraud Alert</h4>
            <button onClick={() => setIsVisible(false)} className="text-[#A1A1AA] hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          <p className="text-white font-bold text-lg mb-1">{type}</p>
          <p className="text-[#A1A1AA] text-sm">Detected for <span className="text-white font-medium">{customerName}</span>.</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
              <Fingerprint size={14} />
              Risk Score: {riskScore}/100
            </div>
            <button className="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded hover:bg-rose-600 transition-colors">
              Investigate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
